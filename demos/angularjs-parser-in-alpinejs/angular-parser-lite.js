/**
* This code has been taken from Angular.js parse provider. It is able to parse and
* evaluate JavaScript expressions without having to use eval() or Function(). This is part
* of an experiment.
* 
* https://github.com/angular/angular.js/blob/47bf11ee94664367a26ed8c91b9b586d3dd420f5/src/ng/parse.js
* 
* There's a lot of code in here that is broken; or makes references to functions that
* don't exist. But, as long as there is the happy-path, we are OK.
*/
var NgParser = (function() {
	"use strict";

	function createMap() {
		return Object.create(null);
	}

	function isFunction(value) {
		return typeof value === 'function';
	}

	function isArray(arr) {
		return Array.isArray(arr) || arr instanceof Array;
	}

	var lowercase = function(string) {
		return isString(string) ? string.toLowerCase() : string;
	};
	var uppercase = function(string) {
		return isString(string) ? string.toUpperCase() : string;
	};

	function isString(value) {
		return typeof value === 'string';
	}

	function forEach(obj, iterator, context) {
		var key, length;
		if (obj) {
			if (isFunction(obj)) {
				for (key in obj) {
					if (key !== 'prototype' && key !== 'length' && key !== 'name' && obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			} else if (isArray(obj)) {
				var isPrimitive = typeof obj !== 'object';
				for (key = 0, length = obj.length; key < length; key++) {
					if (isPrimitive || key in obj) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			} else if (obj.forEach && obj.forEach !== forEach) {
					obj.forEach(iterator, context, obj);
			} else if (isBlankObject(obj)) {
				// createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
				for (key in obj) {
					iterator.call(context, obj[key], key, obj);
				}
			} else if (typeof obj.hasOwnProperty === 'function') {
				// Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			} else {
				// Slow path for objects which do not have a method `hasOwnProperty`
				for (key in obj) {
					if (hasOwnProperty.call(obj, key)) {
						iterator.call(context, obj[key], key, obj);
					}
				}
			}
		}
		return obj;
	}

	function isBlankObject(value) {
	  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
	}

	var getPrototypeOf   = Object.getPrototypeOf;


	var OPERATORS = createMap();
	forEach('+ - * / % === !== == != < > <= >= && || ! = |'.split(' '), function(operator) { OPERATORS[operator] = true; });
	var ESCAPE = {'n':'\n', 'f':'\f', 'r':'\r', 't':'\t', 'v':'\v', '\'':'\'', '"':'"'};




	/**
	 * @constructor
	 */
	var Lexer = function Lexer() {

	};

	Lexer.prototype = {
		constructor: Lexer,

		lex: function(text) {
			this.text = text;
			this.index = 0;
			this.tokens = [];

			while (this.index < this.text.length) {
				var ch = this.text.charAt(this.index);
				if (ch === '"' || ch === '\'') {
					this.readString(ch);
				} else if (this.isNumber(ch) || ch === '.' && this.isNumber(this.peek())) {
					this.readNumber();
				} else if (this.isIdentifierStart(this.peekMultichar())) {
					this.readIdent();
				} else if (this.is(ch, '(){}[].,;:?')) {
					this.tokens.push({index: this.index, text: ch});
					this.index++;
				} else if (this.isWhitespace(ch)) {
					this.index++;
				} else {
					var ch2 = ch + this.peek();
					var ch3 = ch2 + this.peek(2);
					var op1 = OPERATORS[ch];
					var op2 = OPERATORS[ch2];
					var op3 = OPERATORS[ch3];
					if (op1 || op2 || op3) {
						var token = op3 ? ch3 : (op2 ? ch2 : ch);
						this.tokens.push({index: this.index, text: token, operator: true});
						this.index += token.length;
					} else {
						this.throwError('Unexpected next character ', this.index, this.index + 1);
					}
				}
			}
			return this.tokens;
		},

		is: function(ch, chars) {
			return chars.indexOf(ch) !== -1;
		},

		peek: function(i) {
			var num = i || 1;
			return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
		},

		isNumber: function(ch) {
			return ('0' <= ch && ch <= '9') && typeof ch === 'string';
		},

		isWhitespace: function(ch) {
			// IE treats non-breaking space as \u00A0
			return (ch === ' ' || ch === '\r' || ch === '\t' ||
							ch === '\n' || ch === '\v' || ch === '\u00A0');
		},

		isIdentifierStart: function(ch) {
			return this.isValidIdentifierStart(ch);
		},

		isValidIdentifierStart: function(ch) {
			return ('a' <= ch && ch <= 'z' ||
							'A' <= ch && ch <= 'Z' ||
							'_' === ch || ch === '$');
		},

		isIdentifierContinue: function(ch) {
			return this.isValidIdentifierContinue(ch);
		},

		isValidIdentifierContinue: function(ch, cp) {
			return this.isValidIdentifierStart(ch, cp) || this.isNumber(ch);
		},

		codePointAt: function(ch) {
			if (ch.length === 1) return ch.charCodeAt(0);
			// eslint-disable-next-line no-bitwise
			return (ch.charCodeAt(0) << 10) + ch.charCodeAt(1) - 0x35FDC00;
		},

		peekMultichar: function() {
			var ch = this.text.charAt(this.index);
			var peek = this.peek();
			if (!peek) {
				return ch;
			}
			var cp1 = ch.charCodeAt(0);
			var cp2 = peek.charCodeAt(0);
			if (cp1 >= 0xD800 && cp1 <= 0xDBFF && cp2 >= 0xDC00 && cp2 <= 0xDFFF) {
				return ch + peek;
			}
			return ch;
		},

		isExpOperator: function(ch) {
			return (ch === '-' || ch === '+' || this.isNumber(ch));
		},

		throwError: function(error, start, end) {
			end = end || this.index;
			var colStr = (isDefined(start)
							? 's ' + start +  '-' + this.index + ' [' + this.text.substring(start, end) + ']'
							: ' ' + end);
			throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].',
					error, colStr, this.text);
		},

		readNumber: function() {
			var number = '';
			var start = this.index;
			while (this.index < this.text.length) {
				var ch = lowercase(this.text.charAt(this.index));
				if (ch === '.' || this.isNumber(ch)) {
					number += ch;
				} else {
					var peekCh = this.peek();
					if (ch === 'e' && this.isExpOperator(peekCh)) {
						number += ch;
					} else if (this.isExpOperator(ch) &&
							peekCh && this.isNumber(peekCh) &&
							number.charAt(number.length - 1) === 'e') {
						number += ch;
					} else if (this.isExpOperator(ch) &&
							(!peekCh || !this.isNumber(peekCh)) &&
							number.charAt(number.length - 1) === 'e') {
						this.throwError('Invalid exponent');
					} else {
						break;
					}
				}
				this.index++;
			}
			this.tokens.push({
				index: start,
				text: number,
				constant: true,
				value: Number(number)
			});
		},

		readIdent: function() {
			var start = this.index;
			this.index += this.peekMultichar().length;
			while (this.index < this.text.length) {
				var ch = this.peekMultichar();
				if (!this.isIdentifierContinue(ch)) {
					break;
				}
				this.index += ch.length;
			}
			this.tokens.push({
				index: start,
				text: this.text.slice(start, this.index),
				identifier: true
			});
		},

		readString: function(quote) {
			var start = this.index;
			this.index++;
			var string = '';
			var rawString = quote;
			var escape = false;
			while (this.index < this.text.length) {
				var ch = this.text.charAt(this.index);
				rawString += ch;
				if (escape) {
					if (ch === 'u') {
						var hex = this.text.substring(this.index + 1, this.index + 5);
						if (!hex.match(/[\da-f]{4}/i)) {
							this.throwError('Invalid unicode escape [\\u' + hex + ']');
						}
						this.index += 4;
						string += String.fromCharCode(parseInt(hex, 16));
					} else {
						var rep = ESCAPE[ch];
						string = string + (rep || ch);
					}
					escape = false;
				} else if (ch === '\\') {
					escape = true;
				} else if (ch === quote) {
					this.index++;
					this.tokens.push({
						index: start,
						text: rawString,
						constant: true,
						value: string
					});
					return;
				} else {
					string += ch;
				}
				this.index++;
			}
			this.throwError('Unterminated quote', start);
		}
	};
















	var AST = function AST(lexer) {
		this.lexer = lexer;
		this.options = {
			literals: {
				'true': true,
				'false': false,
				'null': null,
				'undefined': undefined
			}
		};
	};

	AST.Program = 'Program';
	AST.ExpressionStatement = 'ExpressionStatement';
	AST.AssignmentExpression = 'AssignmentExpression';
	AST.ConditionalExpression = 'ConditionalExpression';
	AST.LogicalExpression = 'LogicalExpression';
	AST.BinaryExpression = 'BinaryExpression';
	AST.UnaryExpression = 'UnaryExpression';
	AST.CallExpression = 'CallExpression';
	AST.MemberExpression = 'MemberExpression';
	AST.Identifier = 'Identifier';
	AST.Literal = 'Literal';
	AST.ArrayExpression = 'ArrayExpression';
	AST.Property = 'Property';
	AST.ObjectExpression = 'ObjectExpression';
	AST.ThisExpression = 'ThisExpression';
	AST.LocalsExpression = 'LocalsExpression';

	// Internal use only
	AST.NGValueParameter = 'NGValueParameter';

	AST.prototype = {
		ast: function(text) {
			this.text = text;
			this.tokens = this.lexer.lex(text);

			var value = this.program();

			if (this.tokens.length !== 0) {
				this.throwError('is an unexpected token', this.tokens[0]);
			}

			return value;
		},

		program: function() {
			var body = [];
			while (true) {
				if (this.tokens.length > 0 && !this.peek('}', ')', ';', ']'))
					body.push(this.expressionStatement());
				if (!this.expect(';')) {
					return { type: AST.Program, body: body};
				}
			}
		},

		expressionStatement: function() {
			return { type: AST.ExpressionStatement, expression: this.filterChain() };
		},

		filterChain: function() {
			var left = this.expression();
			while (this.expect('|')) {
				left = this.filter(left);
			}
			return left;
		},

		expression: function() {
			return this.assignment();
		},

		assignment: function() {
			var result = this.ternary();
			if (this.expect('=')) {
				if (!isAssignable(result)) {
					throw $parseMinErr('lval', 'Trying to assign a value to a non l-value');
				}

				result = { type: AST.AssignmentExpression, left: result, right: this.assignment(), operator: '='};
			}
			return result;
		},

		ternary: function() {
			var test = this.logicalOR();
			var alternate;
			var consequent;
			if (this.expect('?')) {
				alternate = this.expression();
				if (this.consume(':')) {
					consequent = this.expression();
					return { type: AST.ConditionalExpression, test: test, alternate: alternate, consequent: consequent};
				}
			}
			return test;
		},

		logicalOR: function() {
			var left = this.logicalAND();
			while (this.expect('||')) {
				left = { type: AST.LogicalExpression, operator: '||', left: left, right: this.logicalAND() };
			}
			return left;
		},

		logicalAND: function() {
			var left = this.equality();
			while (this.expect('&&')) {
				left = { type: AST.LogicalExpression, operator: '&&', left: left, right: this.equality()};
			}
			return left;
		},

		equality: function() {
			var left = this.relational();
			var token;
			while ((token = this.expect('==','!=','===','!=='))) {
				left = { type: AST.BinaryExpression, operator: token.text, left: left, right: this.relational() };
			}
			return left;
		},

		relational: function() {
			var left = this.additive();
			var token;
			while ((token = this.expect('<', '>', '<=', '>='))) {
				left = { type: AST.BinaryExpression, operator: token.text, left: left, right: this.additive() };
			}
			return left;
		},

		additive: function() {
			var left = this.multiplicative();
			var token;
			while ((token = this.expect('+','-'))) {
				left = { type: AST.BinaryExpression, operator: token.text, left: left, right: this.multiplicative() };
			}
			return left;
		},

		multiplicative: function() {
			var left = this.unary();
			var token;
			while ((token = this.expect('*','/','%'))) {
				left = { type: AST.BinaryExpression, operator: token.text, left: left, right: this.unary() };
			}
			return left;
		},

		unary: function() {
			var token;
			if ((token = this.expect('+', '-', '!'))) {
				return { type: AST.UnaryExpression, operator: token.text, prefix: true, argument: this.unary() };
			} else {
				return this.primary();
			}
		},

		primary: function() {
			var primary;
			if (this.expect('(')) {
				primary = this.filterChain();
				this.consume(')');
			} else if (this.expect('[')) {
				primary = this.arrayDeclaration();
			} else if (this.expect('{')) {
				primary = this.object();
			} else if (this.selfReferential.hasOwnProperty(this.peek().text)) {
				primary = copy(this.selfReferential[this.consume().text]);
			} else if (this.options.literals.hasOwnProperty(this.peek().text)) {
				primary = { type: AST.Literal, value: this.options.literals[this.consume().text]};
			} else if (this.peek().identifier) {
				primary = this.identifier();
			} else if (this.peek().constant) {
				primary = this.constant();
			} else {
				this.throwError('not a primary expression', this.peek());
			}

			var next;
			while ((next = this.expect('(', '[', '.'))) {
				if (next.text === '(') {
					primary = {type: AST.CallExpression, callee: primary, arguments: this.parseArguments() };
					this.consume(')');
				} else if (next.text === '[') {
					primary = { type: AST.MemberExpression, object: primary, property: this.expression(), computed: true };
					this.consume(']');
				} else if (next.text === '.') {
					primary = { type: AST.MemberExpression, object: primary, property: this.identifier(), computed: false };
				} else {
					this.throwError('IMPOSSIBLE');
				}
			}
			return primary;
		},

		filter: function(baseExpression) {
			var args = [baseExpression];
			var result = {type: AST.CallExpression, callee: this.identifier(), arguments: args, filter: true};

			while (this.expect(':')) {
				args.push(this.expression());
			}

			return result;
		},

		parseArguments: function() {
			var args = [];
			if (this.peekToken().text !== ')') {
				do {
					args.push(this.filterChain());
				} while (this.expect(','));
			}
			return args;
		},

		identifier: function() {
			var token = this.consume();
			if (!token.identifier) {
				this.throwError('is not a valid identifier', token);
			}
			return { type: AST.Identifier, name: token.text };
		},

		constant: function() {
			// TODO check that it is a constant
			return { type: AST.Literal, value: this.consume().value };
		},

		arrayDeclaration: function() {
			var elements = [];
			if (this.peekToken().text !== ']') {
				do {
					if (this.peek(']')) {
						// Support trailing commas per ES5.1.
						break;
					}
					elements.push(this.expression());
				} while (this.expect(','));
			}
			this.consume(']');

			return { type: AST.ArrayExpression, elements: elements };
		},

		object: function() {
			var properties = [], property;
			if (this.peekToken().text !== '}') {
				do {
					if (this.peek('}')) {
						// Support trailing commas per ES5.1.
						break;
					}
					property = {type: AST.Property, kind: 'init'};
					if (this.peek().constant) {
						property.key = this.constant();
						property.computed = false;
						this.consume(':');
						property.value = this.expression();
					} else if (this.peek().identifier) {
						property.key = this.identifier();
						property.computed = false;
						if (this.peek(':')) {
							this.consume(':');
							property.value = this.expression();
						} else {
							property.value = property.key;
						}
					} else if (this.peek('[')) {
						this.consume('[');
						property.key = this.expression();
						this.consume(']');
						property.computed = true;
						this.consume(':');
						property.value = this.expression();
					} else {
						this.throwError('invalid key', this.peek());
					}
					properties.push(property);
				} while (this.expect(','));
			}
			this.consume('}');

			return {type: AST.ObjectExpression, properties: properties };
		},

		throwError: function(msg, token) {
			throw $parseMinErr('syntax',
					'Syntax Error: Token \'{0}\' {1} at column {2} of the expression [{3}] starting at [{4}].',
						token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
		},

		consume: function(e1) {
			if (this.tokens.length === 0) {
				throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
			}

			var token = this.expect(e1);
			if (!token) {
				this.throwError('is unexpected, expecting [' + e1 + ']', this.peek());
			}
			return token;
		},

		peekToken: function() {
			if (this.tokens.length === 0) {
				throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
			}
			return this.tokens[0];
		},

		peek: function(e1, e2, e3, e4) {
			return this.peekAhead(0, e1, e2, e3, e4);
		},

		peekAhead: function(i, e1, e2, e3, e4) {
			if (this.tokens.length > i) {
				var token = this.tokens[i];
				var t = token.text;
				if (t === e1 || t === e2 || t === e3 || t === e4 ||
						(!e1 && !e2 && !e3 && !e4)) {
					return token;
				}
			}
			return false;
		},

		expect: function(e1, e2, e3, e4) {
			var token = this.peek(e1, e2, e3, e4);
			if (token) {
				this.tokens.shift();
				return token;
			}
			return false;
		},

		selfReferential: {
			'this': {type: AST.ThisExpression },
			'$locals': {type: AST.LocalsExpression }
		}
	};


















	function ASTInterpreter() {

	}

	ASTInterpreter.prototype = {
		compile: function(ast) {
			var self = this;
			// findConstantAndWatchExpressions(ast);
			var assignable;
			var assign;
			if ((assignable = assignableAST(ast))) {
				assign = this.recurse(assignable);
			}
			// var toWatch = getInputs(ast.body);
			// var inputs;
			// if (toWatch) {
			//   inputs = [];
			//   forEach(toWatch, function(watch, key) {
			//     var input = self.recurse(watch);
			//     input.isPure = watch.isPure;
			//     watch.input = input;
			//     inputs.push(input);
			//     watch.watchId = key;
			//   });
			// }
			var expressions = [];
			forEach(ast.body, function(expression) {
				expressions.push(self.recurse(expression.expression));
			});
			var fn = ast.body.length === 0 ? noop :
							 ast.body.length === 1 ? expressions[0] :
							 function(scope, locals) {
								 var lastValue;
								 forEach(expressions, function(exp) {
									 lastValue = exp(scope, locals);
								 });
								 return lastValue;
							 };
			if (assign) {
				fn.assign = function(scope, value, locals) {
					return assign(scope, locals, value);
				};
			}
			// if (inputs) {
			//   fn.inputs = inputs;
			// }
			return fn;
		},

		recurse: function(ast, context, create) {
			var left, right, self = this, args;
			// if (ast.input) {
			// 	return this.inputs(ast.input, ast.watchId);
			// }
			switch (ast.type) {
			case AST.Literal:
				return this.value(ast.value, context);
			case AST.UnaryExpression:
				right = this.recurse(ast.argument);
				return this['unary' + ast.operator](right, context);
			case AST.BinaryExpression:
				left = this.recurse(ast.left);
				right = this.recurse(ast.right);
				return this['binary' + ast.operator](left, right, context);
			case AST.LogicalExpression:
				left = this.recurse(ast.left);
				right = this.recurse(ast.right);
				return this['binary' + ast.operator](left, right, context);
			case AST.ConditionalExpression:
				return this['ternary?:'](
					this.recurse(ast.test),
					this.recurse(ast.alternate),
					this.recurse(ast.consequent),
					context
				);
			case AST.Identifier:
				return self.identifier(ast.name, context, create);
			case AST.MemberExpression:
				left = this.recurse(ast.object, false, !!create);
				if (!ast.computed) {
					right = ast.property.name;
				}
				if (ast.computed) right = this.recurse(ast.property);
				return ast.computed ?
					this.computedMember(left, right, context, create) :
					this.nonComputedMember(left, right, context, create);
			case AST.CallExpression:
				args = [];
				forEach(ast.arguments, function(expr) {
					args.push(self.recurse(expr));
				});
				right = this.recurse(ast.callee, true);
				return function(scope, locals, assign, inputs) {
						var rhs = right(scope, locals, assign, inputs);
						var value;
						if (rhs.value != null) {
							var values = [];
							for (var i = 0; i < args.length; ++i) {
								values.push(args[i](scope, locals, assign, inputs));
							}
							value = rhs.value.apply(rhs.context, values);
						}
						return context ? {value: value} : value;
					};
			case AST.AssignmentExpression:
				left = this.recurse(ast.left, true, 1);
				right = this.recurse(ast.right);
				return function(scope, locals, assign, inputs) {
					var lhs = left(scope, locals, assign, inputs);
					var rhs = right(scope, locals, assign, inputs);
					lhs.context[lhs.name] = rhs;
					return context ? {value: rhs} : rhs;
				};
			case AST.ArrayExpression:
				args = [];
				forEach(ast.elements, function(expr) {
					args.push(self.recurse(expr));
				});
				return function(scope, locals, assign, inputs) {
					var value = [];
					for (var i = 0; i < args.length; ++i) {
						value.push(args[i](scope, locals, assign, inputs));
					}
					return context ? {value: value} : value;
				};
			case AST.ObjectExpression:
				args = [];
				forEach(ast.properties, function(property) {
					if (property.computed) {
						args.push({key: self.recurse(property.key),
											 computed: true,
											 value: self.recurse(property.value)
						});
					} else {
						args.push({key: property.key.type === AST.Identifier ?
														property.key.name :
														('' + property.key.value),
											 computed: false,
											 value: self.recurse(property.value)
						});
					}
				});
				return function(scope, locals, assign, inputs) {
					var value = {};
					for (var i = 0; i < args.length; ++i) {
						if (args[i].computed) {
							value[args[i].key(scope, locals, assign, inputs)] = args[i].value(scope, locals, assign, inputs);
						} else {
							value[args[i].key] = args[i].value(scope, locals, assign, inputs);
						}
					}
					return context ? {value: value} : value;
				};
			case AST.ThisExpression:
				return function(scope) {
					return context ? {value: scope} : scope;
				};
			case AST.LocalsExpression:
				return function(scope, locals) {
					return context ? {value: locals} : locals;
				};
			case AST.NGValueParameter:
				return function(scope, locals, assign) {
					return context ? {value: assign} : assign;
				};
			}
		},

		'unary+': function(argument, context) {
			return function(scope, locals, assign, inputs) {
				var arg = argument(scope, locals, assign, inputs);
				if (isDefined(arg)) {
					arg = +arg;
				} else {
					arg = 0;
				}
				return context ? {value: arg} : arg;
			};
		},
		'unary-': function(argument, context) {
			return function(scope, locals, assign, inputs) {
				var arg = argument(scope, locals, assign, inputs);
				if (isDefined(arg)) {
					arg = -arg;
				} else {
					arg = -0;
				}
				return context ? {value: arg} : arg;
			};
		},
		'unary!': function(argument, context) {
			return function(scope, locals, assign, inputs) {
				var arg = !argument(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary+': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var lhs = left(scope, locals, assign, inputs);
				var rhs = right(scope, locals, assign, inputs);
				var arg = plusFn(lhs, rhs);
				return context ? {value: arg} : arg;
			};
		},
		'binary-': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var lhs = left(scope, locals, assign, inputs);
				var rhs = right(scope, locals, assign, inputs);
				var arg = (isDefined(lhs) ? lhs : 0) - (isDefined(rhs) ? rhs : 0);
				return context ? {value: arg} : arg;
			};
		},
		'binary*': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) * right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary/': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) / right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary%': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) % right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary===': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) === right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary!==': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) !== right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary==': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				// eslint-disable-next-line eqeqeq
				var arg = left(scope, locals, assign, inputs) == right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary!=': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				// eslint-disable-next-line eqeqeq
				var arg = left(scope, locals, assign, inputs) != right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary<': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) < right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary>': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) > right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary<=': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) <= right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary>=': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) >= right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary&&': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) && right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'binary||': function(left, right, context) {
			return function(scope, locals, assign, inputs) {
				var arg = left(scope, locals, assign, inputs) || right(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		'ternary?:': function(test, alternate, consequent, context) {
			return function(scope, locals, assign, inputs) {
				var arg = test(scope, locals, assign, inputs) ? alternate(scope, locals, assign, inputs) : consequent(scope, locals, assign, inputs);
				return context ? {value: arg} : arg;
			};
		},
		value: function(value, context) {
			return function() { return context ? {context: undefined, name: undefined, value: value} : value; };
		},
		identifier: function(name, context, create) {
			return function(scope, locals, assign, inputs) {
				var base = locals && (name in locals) ? locals : scope;
				if (create && create !== 1 && base && base[name] == null) {
					base[name] = {};
				}
				var value = base ? base[name] : undefined;
				if (context) {
					return {context: base, name: name, value: value};
				} else {
					return value;
				}
			};
		},
		computedMember: function(left, right, context, create) {
			return function(scope, locals, assign, inputs) {
				var lhs = left(scope, locals, assign, inputs);
				var rhs;
				var value;
				if (lhs != null) {
					rhs = right(scope, locals, assign, inputs);
					rhs = getStringValue(rhs);
					if (create && create !== 1) {
						if (lhs && !(lhs[rhs])) {
							lhs[rhs] = {};
						}
					}
					value = lhs[rhs];
				}
				if (context) {
					return {context: lhs, name: rhs, value: value};
				} else {
					return value;
				}
			};
		},
		nonComputedMember: function(left, right, context, create) {
			return function(scope, locals, assign, inputs) {
				var lhs = left(scope, locals, assign, inputs);
				if (create && create !== 1) {
					if (lhs && lhs[right] == null) {
						lhs[right] = {};
					}
				}
				var value = lhs != null ? lhs[right] : undefined;
				if (context) {
					return {context: lhs, name: right, value: value};
				} else {
					return value;
				}
			};
		}
		// ,
		// inputs: function(input, watchId) {
		// 	return function(scope, value, locals, inputs) {
		// 		if (inputs) return inputs[watchId];
		// 		return input(scope, value, locals);
		// 	};
		// }
	};



	// function getInputs(body) {
	// 	if (body.length !== 1) return;
	// 	var lastExpression = body[0].expression;
	// 	var candidate = lastExpression.toWatch;
	// 	if (candidate.length !== 1) return candidate;
	// 	return candidate[0] !== lastExpression ? candidate : undefined;
	// }

	function isAssignable(ast) {
		return ast.type === AST.Identifier || ast.type === AST.MemberExpression;
	}

	function assignableAST(ast) {
		if (ast.body.length === 1 && isAssignable(ast.body[0].expression)) {
			return {type: AST.AssignmentExpression, left: ast.body[0].expression, right: {type: AST.NGValueParameter}, operator: '='};
		}
	}

	function isLiteral(ast) {
		return ast.body.length === 0 ||
				ast.body.length === 1 && (
				ast.body[0].expression.type === AST.Literal ||
				ast.body[0].expression.type === AST.ArrayExpression ||
				ast.body[0].expression.type === AST.ObjectExpression);
	}

	function isConstant(ast) {
		return ast.constant;
	}

	function plusFn(l, r) {
		if (typeof l === 'undefined') return r;
		if (typeof r === 'undefined') return l;
		return l + r;
	}


	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	var lexer = null;
	var astCreator = null;
	var astCompiler = null;

	/**
	* I parse the given expression into an evaluator function.
	*/
	function parse( expression ) {

		lexer = ( lexer || new Lexer() );
		astCreator = ( astCreator || new AST( lexer ) );
		astCompiler = ( astCompiler || new ASTInterpreter() );

		return astCompiler.compile( astCreator.ast( expression ) );

	}

	return {
		Lexer: Lexer,
		AST: AST,
		ASTInterpreter: ASTInterpreter,
		parse: parse
	};

})();
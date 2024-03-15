(function() {
	"use strict";

	document.addEventListener(
		"alpine:init",
		function setupAlpineBindings() {

			// EXPERIMENT: This is INCOMPLETE. But, this evaluator attempts to use
			// implement a CSP (Content Security Policy) compatible expression evaluator
			// using the Angular.js 1.8.2 parser / lexer / AST interpreter.
			Alpine.setEvaluator( ExperimentalEvaluator );

		}
	);

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	// Parsing expressions on-the-fly is expensive. In order to minimize the work, we want
	// to cache the resultant function based on the string input.
	var cache = createMap();

	/**
	* I parse the given expression attached to the given element.
	*/
	function ExperimentalEvaluator( element, expression ) {

		return generateEvaluatorFn( expression, Alpine.closestDataStack( element ) );

	}


	/**
	* I generate the evaluator function to be run anytime the given expression needs to be
	* evaluated (such as during the initial rendering or after an interaction).
	*/
	function generateEvaluatorFn( expression, dataStack ) {

		return evaluatorFn;

		/**
		* I evaluate the expression using the given locals (scope + params); and pass the
		* expression result to the given receiver.
		*/
		function evaluatorFn( receiver, locals ) {

			receiver = ( receiver || noop );
			locals = ( locals || createMap() );

			var scope = ( locals.scope || createMap() );
			var params = ( locals.params || [] );
			var completeScope = Alpine.mergeProxies([
				scope,
				...dataStack,
				// I'm including the WINDOW object at the top of the datastack so that
				// things like console.log() can be called from within expressions. This
				// is probably pretty dangerous! Yarrrrr!
				window
			]);

			// NOTE: If the expression is already a function reference, we're going to use
			// that instead of trying to parse it. I'm not sure what use-case this covers;
			// but, that seems to be what the core evaluator does.
			var expressionFn = ( typeof expression === "function" )
				? expression
				: parseExpressionUsingNgParser( expression )
			;

			var result = expressionFn( completeScope, locals );

			// If the expression evaluation resulted in a Function reference, we're going
			// to execute the reference in the context of the scope.
			if ( typeof result === "function" ) {

				receiver( result.apply( completeScope, params ) );

			} else {

				receiver( result );

			}

		};

	}


	/**
	* I parse the given expression using the Angular.js Lexer / AST / AST Interpreter. The
	* results are cached; and any subsequent call for the same expression will return the
	* cached result.
	*/
	function parseExpressionUsingNgParser( expression ) {

		if ( cache[ expression ] ) {

			return cache[ expression ];

		}

		return ( cache[ expression ] = NgParser.parse( expression ) );

	}


	/**
	* I do nothing and can be used anytime a generic function fallback is required.
	*/
	function noop() {
		// ...
	}


	/**
	* I create an empty object with no prototype chain (for simple look-ups).
	*/
	function createMap() {

		return Object.create( null );

	}

})();

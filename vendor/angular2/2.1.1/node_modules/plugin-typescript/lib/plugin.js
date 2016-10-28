System.register(["typescript"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isAbsolute(filename) {
        return (filename[0] === '/');
    }
    function isRelative(filename) {
        return (filename[0] === '.');
    }
    function isAmbient(filename) {
        return (!isRelative(filename) && !isAbsolute(filename));
    }
    function isTypescript(filename) {
        return typescriptRegex.test(filename);
    }
    function isJavaScript(filename) {
        return javascriptRegex.test(filename);
    }
    function isSourceMap(filename) {
        return mapRegex.test(filename);
    }
    function isTypescriptDeclaration(filename) {
        return declarationRegex.test(filename);
    }
    function isHtml(filename) {
        return htmlRegex.test(filename);
    }
    function convertToDts(anyFile) {
        return anyFile.replace(convertRegex, '.d.ts');
    }
    function stripDoubleExtension(normalized) {
        var parts = normalized.split('.');
        if (parts.length > 1) {
            var extensions = ["js", "jsx", "ts", "tsx", "json"];
            if (extensions.indexOf(parts[parts.length - 2]) >= 0) {
                return parts.slice(0, -1).join('.');
            }
        }
        return normalized;
    }
    function hasError(diags) {
        return diags.some(function (diag) { return (diag.category === typescript_1.DiagnosticCategory.Error); });
    }
    function formatErrors(diags, logger) {
        diags.slice(0, 10)
            .forEach(function (diag) {
            if (diag.file) {
                var position = diag.file.getLineAndCharacterOfPosition(diag.start);
                var filename = diag.file.fileName;
                var locationText = filename + ":" + (position.line + 1) + ":" + (position.character + 1);
                if (diag.category === typescript_1.DiagnosticCategory.Error)
                    logger.error(locationText);
                else
                    logger.warn(locationText);
            }
            var messageText = typescript_1.flattenDiagnosticMessageText(diag.messageText, "\n");
            messageText = messageText + " (TS" + diag.code + ")";
            if (diag.category === typescript_1.DiagnosticCategory.Error)
                logger.error(messageText);
            else
                logger.warn(messageText);
        });
    }
    function createFactory(sjsconfig, builder, _resolve, _fetch, _lookup) {
        if (sjsconfig === void 0) {
            sjsconfig = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            var tsconfigFiles, typingsFiles, options, services, resolvedFiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tsconfigFiles = [];
                        typingsFiles = [];
                        return [4, loadOptions(sjsconfig, _resolve, _fetch)];
                    case 1:
                        options = _a.sent();
                        return [4, createServices(options, builder, _resolve, _lookup)];
                    case 2:
                        services = _a.sent();
                        if (!services.options.typeCheck)
                            return [3, 4];
                        return [4, resolveDeclarationFiles(services.options, _resolve)];
                    case 3:
                        resolvedFiles = _a.sent();
                        resolvedFiles.forEach(function (resolvedFile) {
                            services.resolver.registerDeclarationFile(resolvedFile);
                        });
                        _a.label = 4;
                    case 4: return [2, services];
                }
            });
        });
    }
    function loadOptions(sjsconfig, _resolve, _fetch) {
        return __awaiter(this, void 0, void 0, function () {
            var tsconfig, tsconfigAddress, tsconfigText, result, files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sjsconfig.tsconfig)
                            return [3, 3];
                        tsconfig = (sjsconfig.tsconfig === true) ? "tsconfig.json" : sjsconfig.tsconfig;
                        return [4, _resolve(tsconfig)];
                    case 1:
                        tsconfigAddress = _a.sent();
                        return [4, _fetch(tsconfigAddress)];
                    case 2:
                        tsconfigText = _a.sent();
                        result = typescript_1.parseConfigFileTextToJson(tsconfigAddress, tsconfigText);
                        if (result.error) {
                            formatErrors([result.error], logger$1);
                            throw new Error("failed to load tsconfig from " + tsconfigAddress);
                        }
                        files = result.config.files;
                        return [2, typescript_1.extend(typescript_1.extend({ tsconfigAddress: tsconfigAddress, files: files }, sjsconfig), result.config.compilerOptions)];
                    case 3: return [2, sjsconfig];
                }
            });
        });
    }
    function resolveDeclarationFiles(options, _resolve) {
        var files = options.files || [];
        var declarationFiles = files
            .filter(function (filename) { return isTypescriptDeclaration(filename); })
            .map(function (filename) { return _resolve(filename, options.tsconfigAddress); });
        return Promise.all(declarationFiles);
    }
    function createServices(options, builder, _resolve, _lookup) {
        return __awaiter(this, void 0, void 0, function () {
            var host, transpiler, resolver, typeChecker, defaultLibResolutions, defaultLibAddresses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        host = new CompilerHost(options, builder);
                        transpiler = new Transpiler(host);
                        resolver = undefined;
                        typeChecker = undefined;
                        if (!options.typeCheck)
                            return [3, 2];
                        resolver = new Resolver(host, _resolve, _lookup);
                        typeChecker = new TypeChecker(host);
                        if (!!host.options.noLib)
                            return [3, 2];
                        defaultLibResolutions = host.getDefaultLibFilePaths().map(function (libPath) { return _resolve(libPath); });
                        return [4, Promise.all(defaultLibResolutions)];
                    case 1:
                        defaultLibAddresses = _a.sent();
                        defaultLibAddresses.forEach(function (defaultLibAddress) {
                            resolver.registerDeclarationFile(defaultLibAddress);
                        });
                        _a.label = 2;
                    case 2: return [2, { host: host, transpiler: transpiler, resolver: resolver, typeChecker: typeChecker, options: options }];
                }
            });
        });
    }
    function getFactory() {
        var __global = typeof (window) !== 'undefined' ? window : global;
        __global.tsfactory = __global.tsfactory || createFactory(System.typescriptOptions, false, _resolve, _fetch, _lookup)
            .then(function (output) {
            validateOptions(output.host.options);
            return output;
        });
        return __global.tsfactory;
    }
    function translate(load) {
        var loader = this;
        logger.debug("systemjs translating " + load.address);
        factory = factory || getFactory();
        return factory.then(function (_a) {
            var transpiler = _a.transpiler, resolver = _a.resolver, typeChecker = _a.typeChecker, host = _a.host;
            host.addFile(load.address, load.source);
            if (isTypescriptDeclaration(load.address)) {
                if (loader.builder && (host.options.module == typescript_1.ModuleKind.ES6)) {
                    load.source = null;
                    load.metadata.format = 'esm';
                }
                else {
                    load.source = '';
                    load.metadata.format = 'cjs';
                }
            }
            else {
                var result = transpiler.transpile(load.address);
                formatErrors(result.errors, logger);
                if (result.failure)
                    throw new Error('TypeScript transpilation failed');
                load.source = result.js;
                if (result.sourceMap)
                    load.metadata.sourceMap = JSON.parse(result.sourceMap);
                if (host.options.module === typescript_1.ModuleKind.System)
                    load.metadata.format = 'register';
                else if (host.options.module === typescript_1.ModuleKind.ES6)
                    load.metadata.format = 'esm';
                else if (host.options.module === typescript_1.ModuleKind.CommonJS)
                    load.metadata.format = 'cjs';
            }
            if (loader.builder)
                return typeCheck(load).then(function () { return load.source; });
            else
                return Promise.resolve(load.source);
        });
    }
    function instantiate(load, systemInstantiate) {
        return factory.then(function (_a) {
            var typeChecker = _a.typeChecker, resolver = _a.resolver, host = _a.host;
            return systemInstantiate(load)
                .then(function (entry) {
                return typeCheck(load).then(function (errors) {
                    if ((host.options.typeCheck === "strict") && hasError(errors))
                        throw new Error("Typescript compilation failed");
                    entry.deps = entry.deps.concat(load.metadata.deps);
                    return entry;
                });
            });
        });
    }
    function typeCheck(load) {
        return factory.then(function (_a) {
            var typeChecker = _a.typeChecker, resolver = _a.resolver, host = _a.host;
            if (host.options.typeCheck && isTypescript(load.address)) {
                return resolver.resolve(load.address)
                    .then(function (deps) {
                    var errors = typeChecker.check();
                    formatErrors(errors, logger);
                    var depslist = deps.list
                        .filter(function (d) { return isTypescript(d); })
                        .map(function (d) { return isTypescriptDeclaration(d) ? d + '!' + __moduleName : d; });
                    load.metadata.deps = depslist;
                    return errors;
                });
            }
            else {
                return [];
            }
        });
    }
    function bundle() {
        if (!factory)
            return [];
        return factory.then(function (_a) {
            var typeChecker = _a.typeChecker, host = _a.host;
            if (host.options.typeCheck) {
                var errors = typeChecker.forceCheck();
                formatErrors(errors, logger);
                if ((host.options.typeCheck === "strict") && typeChecker.hasErrors())
                    throw new Error("Typescript compilation failed");
            }
            return [];
        });
    }
    function validateOptions(options) {
        if ((options.module != typescript_1.ModuleKind.System) && (options.module != typescript_1.ModuleKind.ES6)) {
            logger.warn("transpiling to " + typescript_1.ModuleKind[options.module] + ", consider setting module: \"system\" in typescriptOptions to transpile directly to System.register format");
        }
    }
    function _resolve(dep, parent) {
        if (!parent)
            parent = __moduleName;
        return System.normalize(dep, parent)
            .then(function (normalized) {
            normalized = normalized.split('!')[0];
            normalized = stripDoubleExtension(normalized);
            logger.debug("resolved " + normalized + " (" + parent + " -> " + dep + ")");
            return typescript_1.normalizePath(normalized);
        });
    }
    function _fetch(address) {
        return System.fetch({ name: address, address: address, metadata: {} })
            .then(function (text) {
            logger.debug("fetched " + address);
            return text;
        });
    }
    function _lookup(address) {
        var metadata = {};
        return System.locate({ name: address, address: address, metadata: metadata })
            .then(function () {
            logger.debug("located " + address);
            return metadata;
        });
    }
    var typescript_1, Logger, __awaiter, __generator, typescriptRegex, javascriptRegex, mapRegex, declarationRegex, htmlRegex, convertRegex, logger$2, HTML_MODULE, CompilerHost, logger$3, Transpiler, logger$4, Resolver, logger$5, TypeChecker, logger$1, logger, factory;
    return {
        setters: [
            function (typescript_1_1) {
                typescript_1 = typescript_1_1;
            }
        ],
        execute: function () {
            Logger = (function () {
                function Logger(options) {
                    this.options = options;
                    this.options = options || {};
                }
                Logger.prototype.log = function (msg) {
                    console.log("TypeScript", "[Info]", msg);
                };
                Logger.prototype.error = function (msg) {
                    console.error("TypeScript", "[Error]", msg);
                };
                Logger.prototype.warn = function (msg) {
                    console.warn("TypeScript", "[Warning]", msg);
                };
                Logger.prototype.debug = function (msg) {
                    if (this.options.debug) {
                        console.log("TypeScript", msg);
                    }
                };
                return Logger;
            }());
            __awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try {
                        step(generator.next(value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function rejected(value) { try {
                        step(generator.throw(value));
                    }
                    catch (e) {
                        reject(e);
                    } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments)).next());
                });
            };
            __generator = function (thisArg, body) {
                var _ = { label: 0, sent: function () { if (t[0] & 1)
                        throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
                return { next: verb(0), "throw": verb(1), "return": verb(2) };
                function verb(n) { return function (v) { return step([n, v]); }; }
                function step(op) {
                    if (f)
                        throw new TypeError("Generator is already executing.");
                    while (_)
                        try {
                            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                                return t;
                            if (y = 0, t)
                                op = [0, t.value];
                            switch (op[0]) {
                                case 0:
                                case 1:
                                    t = op;
                                    break;
                                case 4:
                                    _.label++;
                                    return { value: op[1], done: false };
                                case 5:
                                    _.label++;
                                    y = op[1];
                                    op = [0];
                                    continue;
                                case 7:
                                    op = _.ops.pop();
                                    _.trys.pop();
                                    continue;
                                default:
                                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                        _ = 0;
                                        continue;
                                    }
                                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                        _.label = op[1];
                                        break;
                                    }
                                    if (op[0] === 6 && _.label < t[1]) {
                                        _.label = t[1];
                                        t = op;
                                        break;
                                    }
                                    if (t && _.label < t[2]) {
                                        _.label = t[2];
                                        _.ops.push(op);
                                        break;
                                    }
                                    if (t[2])
                                        _.ops.pop();
                                    _.trys.pop();
                                    continue;
                            }
                            op = body.call(thisArg, _);
                        }
                        catch (e) {
                            op = [6, e];
                            y = 0;
                        }
                        finally {
                            f = t = 0;
                        }
                    if (op[0] & 5)
                        throw op[1];
                    return { value: op[0] ? op[1] : void 0, done: true };
                }
            };
            typescriptRegex = /\.tsx?$/i;
            javascriptRegex = /\.js$/i;
            mapRegex = /\.map$/i;
            declarationRegex = /\.d\.tsx?$/i;
            htmlRegex = /\.html$/i;
            convertRegex = /\.[^\.]+$/;
            logger$2 = new Logger({ debug: false });
            HTML_MODULE = "__html_module__";
            CompilerHost = (function () {
                function CompilerHost(options, builder) {
                    if (builder === void 0) {
                        builder = false;
                    }
                    this._reportedFiles = [];
                    this._options = options || {};
                    this._options.module = this.getEnum(this._options.module, typescript_1.ModuleKind, typescript_1.ModuleKind.System);
                    this._options.target = this.getEnum(this._options.target, typescript_1.ScriptTarget, typescript_1.ScriptTarget.ES5);
                    this._options.jsx = this.getEnum(this._options.jsx, typescript_1.JsxEmit, typescript_1.JsxEmit.None);
                    this._options.allowNonTsExtensions = (this._options.allowNonTsExtensions !== false);
                    this._options.skipDefaultLibCheck = (this._options.skipDefaultLibCheck !== false);
                    this._options.supportHtmlImports = (options.supportHtmlImports === true);
                    this._options.resolveAmbientRefs = (options.resolveAmbientRefs === true);
                    this._options.noResolve = true;
                    this._options.allowSyntheticDefaultImports = (this._options.allowSyntheticDefaultImports !== false);
                    this._options.moduleResolution = typescript_1.ModuleResolutionKind.Classic;
                    this._options.types = this._options.types || [];
                    this._options.typings = this._options.typings || {};
                    this._files = {};
                    var source = "var __html__: string = ''; export default __html__;";
                    if ((this._options.target !== typescript_1.ScriptTarget.ES6) && (this._options.module !== typescript_1.ModuleKind.ES6))
                        source = source + "export = __html__;";
                    var file = this.addFile(HTML_MODULE, source);
                    file.dependencies = { list: [], mappings: {} };
                    file.checked = true;
                    file.errors = [];
                    if (this._options.supportHtmlImports) {
                        logger$2.warn("The 'supportHtmlImports' option is deprecated and will shortly be removed");
                        logger$2.warn("Please use TypeScript's new 'wildcard declarations' feature instead");
                    }
                    if (this._options.resolveAmbientRefs) {
                        logger$2.warn("The 'resolveAmbientRefs' option is deprecated and will shortly be removed");
                        logger$2.warn("Please use External Typings support instead");
                    }
                    if (this._options.targetLib) {
                        logger$2.warn("The 'targetLib' option is deprecated and will shortly be removed");
                        logger$2.warn("Please use the 'lib' option instead");
                        this.options.targetLib = this.getEnum(this._options.targetLib, typescript_1.ScriptTarget, typescript_1.ScriptTarget.ES6);
                    }
                    else if (!this._options.lib) {
                        this._options.lib = ['es6'];
                    }
                }
                CompilerHost.prototype.getEnum = function (enumValue, enumType, defaultValue) {
                    if (enumValue == undefined)
                        return defaultValue;
                    for (var enumProp in enumType) {
                        if (enumProp.toLowerCase() === enumValue.toString().toLowerCase()) {
                            if (typeof enumType[enumProp] === "string")
                                return enumType[enumType[enumProp]];
                            else
                                return enumType[enumProp];
                        }
                    }
                    throw new Error("Unrecognised value [" + enumValue + "]");
                };
                Object.defineProperty(CompilerHost.prototype, "options", {
                    get: function () {
                        return this._options;
                    },
                    enumerable: true,
                    configurable: true
                });
                CompilerHost.prototype.getDefaultLibFileName = function () {
                    return this.getDefaultLibFilePaths()[0];
                };
                CompilerHost.prototype.getDefaultLibFilePaths = function () {
                    if (this._options.targetLib === typescript_1.ScriptTarget.ES5)
                        return ['typescript/lib/lib.d.ts'];
                    else if (this._options.targetLib === typescript_1.ScriptTarget.ES6)
                        return ['typescript/lib/lib.es6.d.ts'];
                    else
                        return this._options.lib.map(function (libName) { return "typescript/lib/lib." + libName + ".d.ts"; });
                };
                CompilerHost.prototype.useCaseSensitiveFileNames = function () {
                    return false;
                };
                CompilerHost.prototype.getCanonicalFileName = function (fileName) {
                    return typescript_1.normalizePath(fileName);
                };
                CompilerHost.prototype.getCurrentDirectory = function () {
                    return "";
                };
                CompilerHost.prototype.getNewLine = function () {
                    return "\n";
                };
                CompilerHost.prototype.readFile = function (fileName) {
                    throw new Error("Not implemented");
                };
                CompilerHost.prototype.writeFile = function (name, text, writeByteOrderMark) {
                    throw new Error("Not implemented");
                };
                CompilerHost.prototype.getSourceFile = function (fileName) {
                    fileName = this.getCanonicalFileName(fileName);
                    return this._files[fileName];
                };
                CompilerHost.prototype.getAllFiles = function () {
                    var _this = this;
                    return Object.keys(this._files).map(function (key) { return _this._files[key]; });
                };
                CompilerHost.prototype.fileExists = function (fileName) {
                    return !!this.getSourceFile(fileName);
                };
                CompilerHost.prototype.getDirectories = function () {
                    throw new Error("Not implemented");
                };
                CompilerHost.prototype.addFile = function (fileName, text) {
                    fileName = this.getCanonicalFileName(fileName);
                    var file = this._files[fileName];
                    if (!file) {
                        this._files[fileName] = typescript_1.createSourceFile(fileName, text, this._options.target);
                        logger$2.debug("added " + fileName);
                    }
                    else if (file.text != text) {
                        this._files[fileName] = typescript_1.createSourceFile(fileName, text, this._options.target);
                        this.invalidate(fileName);
                        logger$2.debug("updated " + fileName);
                    }
                    return this._files[fileName];
                };
                CompilerHost.prototype.invalidate = function (fileName, seen) {
                    var _this = this;
                    seen = seen || [];
                    if (seen.indexOf(fileName) < 0) {
                        seen.push(fileName);
                        var file = this._files[fileName];
                        if (file) {
                            file.checked = false;
                            file.errors = [];
                        }
                        Object.keys(this._files)
                            .map(function (key) { return _this._files[key]; })
                            .forEach(function (file) {
                            if (file.dependencies && file.dependencies.list.indexOf(fileName) >= 0) {
                                _this.invalidate(file.fileName, seen);
                            }
                        });
                    }
                };
                CompilerHost.prototype.resolveModuleNames = function (moduleNames, containingFile) {
                    var _this = this;
                    return moduleNames.map(function (modName) {
                        var dependencies = _this._files[containingFile].dependencies;
                        if (isHtml(modName) && _this._options.supportHtmlImports) {
                            return { resolvedFileName: HTML_MODULE };
                        }
                        else if (dependencies) {
                            var resolvedFileName = dependencies.mappings[modName];
                            if (!resolvedFileName) {
                                if (_this._reportedFiles.indexOf(resolvedFileName) < 0) {
                                    logger$2.warn(containingFile + ' -> ' + modName + ' could not be resolved');
                                    _this._reportedFiles.push(resolvedFileName);
                                }
                                return undefined;
                            }
                            else {
                                var isExternalLibraryImport = isTypescriptDeclaration(resolvedFileName);
                                return { resolvedFileName: resolvedFileName, isExternalLibraryImport: isExternalLibraryImport };
                            }
                        }
                        else {
                            return typescript_1.resolveModuleName(modName, containingFile, _this._options, _this).resolvedModule;
                        }
                    });
                };
                return CompilerHost;
            }());
            logger$3 = new Logger({ debug: false });
            Transpiler = (function () {
                function Transpiler(host) {
                    this._host = host;
                    this._options = typescript_1.clone(this._host.options);
                    this._options.isolatedModules = true;
                    if (this._options.sourceMap === undefined)
                        this._options.sourceMap = this._options.inlineSourceMap;
                    if (this._options.sourceMap === undefined)
                        this._options.sourceMap = true;
                    this._options.inlineSourceMap = false;
                    this._options.declaration = false;
                    this._options.noEmitOnError = false;
                    this._options.out = undefined;
                    this._options.outFile = undefined;
                    this._options.noLib = true;
                    this._options.lib = undefined;
                    this._options.types = [];
                    this._options.suppressOutputPathCheck = true;
                    this._options.noEmit = false;
                }
                Transpiler.prototype.transpile = function (sourceName) {
                    logger$3.debug("transpiling " + sourceName);
                    var file = this._host.getSourceFile(sourceName);
                    if (!file)
                        throw new Error("file [" + sourceName + "] has not been added");
                    if (!file.output) {
                        var program = typescript_1.createProgram([sourceName], this._options, this._host);
                        var jstext_1 = undefined;
                        var maptext_1 = undefined;
                        var emitResult = program.emit(undefined, function (outputName, output) {
                            if (isJavaScript(outputName))
                                jstext_1 = output.slice(0, output.lastIndexOf("//#"));
                            else if (isSourceMap(outputName))
                                maptext_1 = output;
                            else
                                throw new Error("unexpected ouput file " + outputName);
                        });
                        var diagnostics = emitResult.diagnostics
                            .concat(program.getOptionsDiagnostics())
                            .concat(program.getSyntacticDiagnostics());
                        file.output = {
                            failure: hasError(diagnostics),
                            errors: diagnostics,
                            js: jstext_1,
                            sourceMap: maptext_1
                        };
                    }
                    return file.output;
                };
                return Transpiler;
            }());
            logger$4 = new Logger({ debug: false });
            Resolver = (function () {
                function Resolver(host, resolve, lookup) {
                    this._host = host;
                    this._resolve = resolve;
                    this._lookup = lookup;
                    this._declarationFiles = [];
                }
                Resolver.prototype.resolve = function (sourceName) {
                    var _this = this;
                    var file = this._host.getSourceFile(sourceName);
                    if (!file)
                        throw new Error("file [" + sourceName + "] has not been added");
                    if (!file.pendingDependencies) {
                        var info = typescript_1.preProcessFile(file.text, true);
                        file.isLibFile = info.isLibFile;
                        file.pendingDependencies = this.resolveDependencies(sourceName, info)
                            .then(function (mappings) {
                            var deps = Object.keys(mappings)
                                .map(function (key) { return mappings[key]; })
                                .filter(function (res) { return isTypescript(res); });
                            var refs = _this._declarationFiles.filter(function (decl) {
                                return (decl != sourceName) && (deps.indexOf(decl) < 0);
                            });
                            var list = deps.concat(refs);
                            file.dependencies = { mappings: mappings, list: list };
                            return file.dependencies;
                        });
                    }
                    return file.pendingDependencies;
                };
                Resolver.prototype.registerDeclarationFile = function (sourceName) {
                    this._declarationFiles.push(sourceName);
                };
                Resolver.prototype.resolveDependencies = function (sourceName, info) {
                    var _this = this;
                    var resolvedReferences = info.referencedFiles
                        .map(function (ref) { return _this.resolveReference(ref.fileName, sourceName); });
                    var resolvedTypes = info.typeReferenceDirectives
                        .map(function (typ) { return _this.resolveTypeReference(typ.fileName, sourceName); });
                    var resolvedImports = info.importedFiles
                        .map(function (imp) { return _this.resolveImport(imp.fileName, sourceName); });
                    var resolvedExternals = info.ambientExternalModules && info.ambientExternalModules
                        .map(function (ext) { return _this.resolveImport(ext, sourceName); });
                    var refs = []
                        .concat(info.referencedFiles)
                        .concat(info.typeReferenceDirectives)
                        .concat(info.importedFiles)
                        .map(function (pre) { return pre.fileName; })
                        .concat(info.ambientExternalModules);
                    var deps = []
                        .concat(resolvedReferences)
                        .concat(resolvedTypes)
                        .concat(resolvedImports)
                        .concat(resolvedExternals);
                    return Promise.all(deps)
                        .then(function (resolved) {
                        return refs.reduce(function (result, ref, idx) {
                            result[ref] = resolved[idx];
                            return result;
                        }, {});
                    });
                };
                Resolver.prototype.resolveReference = function (referenceName, sourceName) {
                    if ((isAmbient(referenceName) && !this._host.options.resolveAmbientRefs) || (referenceName.indexOf("/") === -1))
                        referenceName = "./" + referenceName;
                    return this._resolve(referenceName, sourceName);
                };
                Resolver.prototype.resolveTypeReference = function (referenceName, sourceName) {
                    return this.lookupAtType(referenceName, sourceName);
                };
                Resolver.prototype.resolveImport = function (importName, sourceName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var address, atTypeAddress, typingAddress;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (isRelative(importName) && isTypescriptDeclaration(sourceName) && !isTypescriptDeclaration(importName))
                                        importName = importName + ".d.ts";
                                    return [4, this._resolve(importName, sourceName)];
                                case 1:
                                    address = _a.sent();
                                    if (!!isTypescript(address))
                                        return [3, 4];
                                    return [4, this.lookupAtType(importName, sourceName)];
                                case 2:
                                    atTypeAddress = _a.sent();
                                    if (atTypeAddress)
                                        return [2, atTypeAddress];
                                    return [4, this.lookupTyping(importName, sourceName, address)];
                                case 3:
                                    typingAddress = _a.sent();
                                    if (typingAddress)
                                        return [2, typingAddress];
                                    _a.label = 4;
                                case 4: return [2, address];
                            }
                        });
                    });
                };
                Resolver.prototype.lookupTyping = function (importName, sourceName, address) {
                    return __awaiter(this, void 0, void 0, function () {
                        var packageName, packageTypings, importTypings, metadata;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    packageName = this.getPackageName(importName);
                                    packageTypings = this._host.options.typings[packageName];
                                    importTypings = this._host.options.typings[importName];
                                    if (!importTypings)
                                        return [3, 1];
                                    return [2, this.resolveTyping(importTypings, packageName, sourceName, address)];
                                case 1:
                                    if (!packageTypings)
                                        return [3, 2];
                                    return [2, this.resolveTyping(true, packageName, sourceName, address)];
                                case 2: return [4, this._lookup(address)];
                                case 3:
                                    metadata = _a.sent();
                                    return [2, this.resolveTyping(metadata.typings, packageName, sourceName, address)];
                            }
                        });
                    });
                };
                Resolver.prototype.getPackageName = function (importName) {
                    var packageParts = importName.split('/');
                    if ((packageParts[0].indexOf('@') === 0) && (packageParts.length > 1)) {
                        return packageParts[0] + '/' + packageParts[1];
                    }
                    else {
                        return packageParts[0];
                    }
                };
                Resolver.prototype.resolveTyping = function (typings, packageName, sourceName, address) {
                    return __awaiter(this, void 0, void 0, function () {
                        var typingsName;
                        return __generator(this, function (_a) {
                            if (typings === true) {
                                return [2, convertToDts(address)];
                            }
                            else if (typeof (typings) === 'string') {
                                typingsName = isRelative(typings) ? typings.slice(2) : typings;
                                return [2, this._resolve(packageName + '/' + typingsName, sourceName)];
                            }
                            else if (typings) {
                                throw new Error("invalid 'typings' value [" + typings + "] [" + address + "]");
                            }
                            else {
                                return [2, undefined];
                            }
                            return [2];
                        });
                    });
                };
                Resolver.prototype.lookupAtType = function (importName, sourceName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var packageName, resolved;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    packageName = this.getPackageName(importName);
                                    if (this._host.options.types.indexOf(packageName) < 0)
                                        return [2, undefined];
                                    return [4, this._resolve('@types/' + packageName, sourceName)];
                                case 1:
                                    resolved = _a.sent();
                                    if (isJavaScript(resolved))
                                        resolved = resolved.slice(0, -3);
                                    if (!isTypescriptDeclaration(resolved))
                                        resolved = resolved + '/index.d.ts';
                                    return [2, resolved];
                            }
                        });
                    });
                };
                return Resolver;
            }());
            logger$5 = new Logger({ debug: false });
            TypeChecker = (function () {
                function TypeChecker(host) {
                    this._host = host;
                    this._options = typescript_1.clone(this._host.options);
                    this._options.inlineSourceMap = false;
                    this._options.sourceMap = false;
                    this._options.declaration = false;
                    this._options.isolatedModules = false;
                    this._options.skipDefaultLibCheck = true;
                }
                TypeChecker.prototype.check = function () {
                    var candidates = this.getCandidates(false);
                    if (candidates.some(function (candidate) { return !candidate.file.checked && candidate.checkable && !isTypescriptDeclaration(candidate.name); }))
                        return this.getAllDiagnostics(candidates);
                    else
                        return [];
                };
                TypeChecker.prototype.forceCheck = function () {
                    var candidates = this.getCandidates(true);
                    if (candidates.some(function (candidate) { return !candidate.file.checked; }))
                        return this.getAllDiagnostics(candidates);
                    else
                        return [];
                };
                TypeChecker.prototype.hasErrors = function () {
                    return this._host.getAllFiles()
                        .filter(function (file) { return file.fileName != HTML_MODULE; })
                        .some(function (file) { return file.checked && hasError(file.errors); });
                };
                TypeChecker.prototype.getCandidates = function (force) {
                    var _this = this;
                    var candidates = this._host
                        .getAllFiles()
                        .filter(function (file) { return file.fileName != HTML_MODULE; })
                        .map(function (file) {
                        return ({
                            name: file.fileName,
                            file: file,
                            seen: false,
                            resolved: !!file.dependencies,
                            checkable: force || undefined,
                            deps: file.dependencies && file.dependencies.list
                        });
                    });
                    if (!force) {
                        var candidatesMap_1 = candidates.reduce(function (result, candidate) {
                            result[candidate.name] = candidate;
                            return result;
                        }, {});
                        candidates.forEach(function (candidate) { return candidate.checkable = _this.isCheckable(candidate, candidatesMap_1); });
                    }
                    return candidates;
                };
                TypeChecker.prototype.isCheckable = function (candidate, candidatesMap) {
                    var _this = this;
                    if (!candidate)
                        return false;
                    else {
                        if (!candidate.seen) {
                            candidate.seen = true;
                            candidate.checkable = candidate.resolved && candidate.deps.every(function (dep) { return _this.isCheckable(candidatesMap[dep], candidatesMap); });
                        }
                        return (candidate.checkable !== false);
                    }
                };
                TypeChecker.prototype.getAllDiagnostics = function (candidates) {
                    var filelist = candidates.map(function (dep) { return dep.name; }).concat([HTML_MODULE]);
                    var program = typescript_1.createProgram(filelist, this._options, this._host);
                    return candidates.reduce(function (errors, candidate) {
                        if (candidate.checkable && !candidate.file.checked) {
                            candidate.file.errors = [];
                            if (!candidate.file.isLibFile) {
                                candidate.file.errors = program.getSyntacticDiagnostics(candidate.file)
                                    .concat(program.getSemanticDiagnostics(candidate.file));
                            }
                            candidate.file.checked = true;
                            return errors.concat(candidate.file.errors);
                        }
                        else {
                            return errors;
                        }
                    }, program.getGlobalDiagnostics());
                };
                return TypeChecker;
            }());
            logger$1 = new Logger({ debug: false });
            logger = new Logger({ debug: false });
            factory = null;
            exports_1("translate", translate);
            exports_1("instantiate", instantiate);
            exports_1("bundle", bundle);
        }
    };
});

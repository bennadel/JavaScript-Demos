import * as tslib_1 from "tslib";
import * as ts from 'typescript';
import Logger from './logger';
import { CompilerHost } from './compiler-host';
import { Transpiler } from './transpiler';
import { Resolver } from './resolver';
import { TypeChecker } from './type-checker';
import { formatErrors } from './format-errors';
import { isTypescriptDeclaration } from './utils';
var logger = new Logger({ debug: false });
export function createFactory(sjsconfig, builder, _resolve, _fetch, _lookup) {
    if (sjsconfig === void 0) { sjsconfig = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tsconfigFiles, typingsFiles, options, services, resolvedFiles;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tsconfigFiles = [];
                    typingsFiles = [];
                    return [4 /*yield*/, loadOptions(sjsconfig, _resolve, _fetch)];
                case 1:
                    options = _a.sent();
                    return [4 /*yield*/, createServices(options, builder, _resolve, _lookup)];
                case 2:
                    services = _a.sent();
                    if (!services.options.typeCheck)
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, resolveDeclarationFiles(services.options, _resolve)];
                case 3:
                    resolvedFiles = _a.sent();
                    resolvedFiles.forEach(function (resolvedFile) {
                        services.resolver.registerDeclarationFile(resolvedFile);
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/, services];
            }
        });
    });
}
function loadOptions(sjsconfig, _resolve, _fetch) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tsconfig, tsconfigAddress, tsconfigText, result, files;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sjsconfig.tsconfig)
                        return [3 /*break*/, 3];
                    tsconfig = (sjsconfig.tsconfig === true) ? "tsconfig.json" : sjsconfig.tsconfig;
                    return [4 /*yield*/, _resolve(tsconfig)];
                case 1:
                    tsconfigAddress = _a.sent();
                    return [4 /*yield*/, _fetch(tsconfigAddress)];
                case 2:
                    tsconfigText = _a.sent();
                    result = ts.parseConfigFileTextToJson(tsconfigAddress, tsconfigText);
                    if (result.error) {
                        formatErrors([result.error], logger);
                        throw new Error("failed to load tsconfig from " + tsconfigAddress);
                    }
                    files = result.config.files;
                    return [2 /*return*/, ts.extend(ts.extend({ tsconfigAddress: tsconfigAddress, files: files }, sjsconfig), result.config.compilerOptions)];
                case 3: return [2 /*return*/, sjsconfig];
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
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var host, transpiler, resolver, typeChecker, defaultLibResolutions, defaultLibAddresses;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    host = new CompilerHost(options, builder);
                    transpiler = new Transpiler(host);
                    resolver = undefined;
                    typeChecker = undefined;
                    if (!options.typeCheck)
                        return [3 /*break*/, 2];
                    resolver = new Resolver(host, _resolve, _lookup);
                    typeChecker = new TypeChecker(host);
                    if (!!host.options.noLib)
                        return [3 /*break*/, 2];
                    defaultLibResolutions = host.getDefaultLibFilePaths().map(function (libPath) { return _resolve(libPath); });
                    return [4 /*yield*/, Promise.all(defaultLibResolutions)];
                case 1:
                    defaultLibAddresses = _a.sent();
                    defaultLibAddresses.forEach(function (defaultLibAddress) {
                        resolver.registerDeclarationFile(defaultLibAddress);
                    });
                    _a.label = 2;
                case 2: return [2 /*return*/, { host: host, transpiler: transpiler, resolver: resolver, typeChecker: typeChecker, options: options }];
            }
        });
    });
}

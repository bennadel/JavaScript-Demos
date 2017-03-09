import * as tslib_1 from "tslib";
import * as ts from 'typescript';
import Logger from './logger';
import { isTypescript, isTypescriptDeclaration, isJavaScript, isRelative, isAmbient, convertToDts } from './utils';
var logger = new Logger({ debug: false });
export var Resolver = (function () {
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
            var info = ts.preProcessFile(file.text, true);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var address, atTypeAddress, typingAddress;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isRelative(importName) && isTypescriptDeclaration(sourceName) && !isTypescriptDeclaration(importName))
                            importName = importName + ".d.ts";
                        return [4 /*yield*/, this._resolve(importName, sourceName)];
                    case 1:
                        address = _a.sent();
                        if (!!isTypescript(address))
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, this.lookupAtType(importName, sourceName)];
                    case 2:
                        atTypeAddress = _a.sent();
                        if (atTypeAddress)
                            return [2 /*return*/, atTypeAddress];
                        return [4 /*yield*/, this.lookupTyping(importName, sourceName, address)];
                    case 3:
                        typingAddress = _a.sent();
                        if (typingAddress)
                            return [2 /*return*/, typingAddress];
                        _a.label = 4;
                    case 4: return [2 /*return*/, address];
                }
            });
        });
    };
    Resolver.prototype.lookupTyping = function (importName, sourceName, address) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var packageName, packageTypings, importTypings, metadata;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packageName = this.getPackageName(importName);
                        packageTypings = this._host.options.typings[packageName];
                        importTypings = this._host.options.typings[importName];
                        if (!importTypings)
                            return [3 /*break*/, 1];
                        return [2 /*return*/, this.resolveTyping(importTypings, packageName, sourceName, address)];
                    case 1:
                        if (!packageTypings)
                            return [3 /*break*/, 2];
                        return [2 /*return*/, this.resolveTyping(true, packageName, sourceName, address)];
                    case 2: return [4 /*yield*/, this._lookup(address)];
                    case 3:
                        metadata = _a.sent();
                        return [2 /*return*/, this.resolveTyping(metadata.typings, packageName, sourceName, address)];
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var typingsName;
            return tslib_1.__generator(this, function (_a) {
                if (typings === true) {
                    return [2 /*return*/, convertToDts(address)];
                }
                else if (typeof (typings) === 'string') {
                    typingsName = isRelative(typings) ? typings.slice(2) : typings;
                    return [2 /*return*/, this._resolve(packageName + '/' + typingsName, sourceName)];
                }
                else if (typings) {
                    throw new Error("invalid 'typings' value [" + typings + "] [" + address + "]");
                }
                else {
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/];
            });
        });
    };
    Resolver.prototype.lookupAtType = function (importName, sourceName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var packageName, resolved;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packageName = this.getPackageName(importName);
                        if (this._host.options.types.indexOf(packageName) < 0)
                            return [2 /*return*/, undefined];
                        return [4 /*yield*/, this._resolve('@types/' + packageName, sourceName)];
                    case 1:
                        resolved = _a.sent();
                        if (isJavaScript(resolved))
                            resolved = resolved.slice(0, -3);
                        if (!isTypescriptDeclaration(resolved))
                            resolved = resolved + '/index.d.ts';
                        return [2 /*return*/, resolved];
                }
            });
        });
    };
    return Resolver;
}());

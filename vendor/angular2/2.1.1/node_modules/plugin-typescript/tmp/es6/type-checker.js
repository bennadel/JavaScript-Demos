import * as ts from 'typescript';
import Logger from './logger';
import { isTypescriptDeclaration, hasError } from './utils';
import { HTML_MODULE } from "./compiler-host";
var logger = new Logger({ debug: false });
export var TypeChecker = (function () {
    function TypeChecker(host) {
        this._host = host;
        this._options = ts.clone(this._host.options);
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
            .map(function (file) { return ({
            name: file.fileName,
            file: file,
            seen: false,
            resolved: !!file.dependencies,
            checkable: force || undefined,
            deps: file.dependencies && file.dependencies.list
        }); });
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
        var program = ts.createProgram(filelist, this._options, this._host);
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

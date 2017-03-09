import * as ts from 'typescript';
import { isJavaScript, isSourceMap, hasError } from './utils';
import Logger from './logger';
var logger = new Logger({ debug: false });
export var Transpiler = (function () {
    function Transpiler(host) {
        this._host = host;
        this._options = ts.clone(this._host.options);
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
        logger.debug("transpiling " + sourceName);
        var file = this._host.getSourceFile(sourceName);
        if (!file)
            throw new Error("file [" + sourceName + "] has not been added");
        if (!file.output) {
            var program = ts.createProgram([sourceName], this._options, this._host);
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

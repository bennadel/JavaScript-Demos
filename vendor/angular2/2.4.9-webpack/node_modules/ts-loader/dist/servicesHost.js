"use strict";
var constants = require("./constants");
var path = require("path");
var makeResolver = require("./resolver");
var utils = require("./utils");
/**
 * Create the TypeScript language service
 */
function makeServicesHost(scriptRegex, log, loader, instance, appendTsSuffixTo) {
    var compiler = instance.compiler, compilerOptions = instance.compilerOptions, files = instance.files;
    var newLine = compilerOptions.newLine === constants.CarriageReturnLineFeedCode ? constants.CarriageReturnLineFeed :
        compilerOptions.newLine === constants.LineFeedCode ? constants.LineFeed :
            constants.EOL;
    // make a (sync) resolver that follows webpack's rules
    var resolveSync = makeResolver(loader.options);
    var moduleResolutionHost = {
        fileExists: function (fileName) { return utils.readFile(fileName) !== undefined; },
        readFile: function (fileName) { return utils.readFile(fileName); },
    };
    return {
        getProjectVersion: function () { return "" + instance.version; },
        getScriptFileNames: function () { return Object.keys(files).filter(function (filePath) { return !!filePath.match(scriptRegex); }); },
        getScriptVersion: function (fileName) {
            fileName = path.normalize(fileName);
            return files[fileName] && files[fileName].version.toString();
        },
        getScriptSnapshot: function (fileName) {
            // This is called any time TypeScript needs a file's text
            // We either load from memory or from disk
            fileName = path.normalize(fileName);
            var file = files[fileName];
            if (!file) {
                var text = utils.readFile(fileName);
                if (!text) {
                    return undefined;
                }
                file = files[fileName] = { version: 0, text: text };
            }
            return compiler.ScriptSnapshot.fromString(file.text);
        },
        /**
         * getDirectories is also required for full import and type reference completions.
         * Without it defined, certain completions will not be provided
         */
        getDirectories: compiler.sys ? compiler.sys.getDirectories : undefined,
        /**
         * For @types expansion, these two functions are needed.
         */
        directoryExists: compiler.sys ? compiler.sys.directoryExists : undefined,
        getCurrentDirectory: function () { return process.cwd(); },
        getCompilationSettings: function () { return compilerOptions; },
        getDefaultLibFileName: function (options) { return compiler.getDefaultLibFilePath(options); },
        getNewLine: function () { return newLine; },
        log: log.log,
        resolveModuleNames: function (moduleNames, containingFile) {
            return resolveModuleNames(resolveSync, moduleResolutionHost, appendTsSuffixTo, scriptRegex, instance, moduleNames, containingFile);
        }
    };
}
function resolveModuleNames(resolveSync, moduleResolutionHost, appendTsSuffixTo, scriptRegex, instance, moduleNames, containingFile) {
    var resolvedModules = moduleNames.map(function (moduleName) {
        return resolveModuleName(resolveSync, moduleResolutionHost, appendTsSuffixTo, scriptRegex, instance, moduleName, containingFile);
    });
    populateDependencyGraphs(resolvedModules, instance, containingFile);
    return resolvedModules;
}
function resolveModuleName(resolveSync, moduleResolutionHost, appendTsSuffixTo, scriptRegex, instance, moduleName, containingFile) {
    var compiler = instance.compiler, compilerOptions = instance.compilerOptions;
    var resolutionResult;
    try {
        var resolvedFileName = resolveSync(undefined, path.normalize(path.dirname(containingFile)), moduleName);
        resolvedFileName = utils.appendTsSuffixIfMatch(appendTsSuffixTo, resolvedFileName);
        if (resolvedFileName.match(scriptRegex)) {
            resolutionResult = { resolvedFileName: resolvedFileName };
        }
    }
    catch (e) { }
    var tsResolution = compiler.resolveModuleName(moduleName, containingFile, compilerOptions, moduleResolutionHost);
    if (tsResolution.resolvedModule) {
        var tsResolutionResult = {
            resolvedFileName: path.normalize(tsResolution.resolvedModule.resolvedFileName),
            isExternalLibraryImport: tsResolution.resolvedModule.isExternalLibraryImport
        };
        if (resolutionResult) {
            if (resolutionResult.resolvedFileName === tsResolutionResult.resolvedFileName) {
                resolutionResult.isExternalLibraryImport = tsResolutionResult.isExternalLibraryImport;
            }
        }
        else {
            resolutionResult = tsResolutionResult;
        }
    }
    return resolutionResult;
}
function populateDependencyGraphs(resolvedModules, instance, containingFile) {
    var importedFiles = resolvedModules
        .filter(function (m) { return m !== null && m !== undefined; })
        .map(function (m) { return m.resolvedFileName; });
    instance.dependencyGraph[path.normalize(containingFile)] = importedFiles;
    importedFiles.forEach(function (importedFileName) {
        if (!instance.reverseDependencyGraph[importedFileName]) {
            instance.reverseDependencyGraph[importedFileName] = {};
        }
        instance.reverseDependencyGraph[importedFileName][path.normalize(containingFile)] = true;
    });
}
module.exports = makeServicesHost;

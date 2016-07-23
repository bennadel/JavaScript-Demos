"use strict";
var pathToRegexp = require('path-to-regexp');
var REGEXP_CACHE = new Map();
var COMPILED_CACHE = new Map();
function getRegexp(pattern) {
    if (!REGEXP_CACHE.has(pattern)) {
        var keys = [];
        var regexp = pathToRegexp(pattern, keys, { end: false });
        REGEXP_CACHE.set(pattern, { keys: keys, regexp: regexp });
    }
    return REGEXP_CACHE.get(pattern);
}
exports.getRegexp = getRegexp;
function getCompiled(pattern) {
    if (!COMPILED_CACHE.has(pattern)) {
        COMPILED_CACHE.set(pattern, pathToRegexp.compile(pattern));
    }
    return COMPILED_CACHE.get(pattern);
}
exports.getCompiled = getCompiled;
function matchPattern(pattern, pathname) {
    if (pattern.charAt(0) !== '/') {
        pattern = "/" + pattern;
    }
    var compiled = getRegexp(pattern);
    var match = compiled.regexp.exec(pathname);
    if (!match) {
        return {
            remainingPathname: null,
            paramNames: [],
            paramValues: []
        };
    }
    return {
        remainingPathname: pathname.substr(match[0].length),
        paramNames: compiled.keys.map(function (_a) {
            var name = _a.name;
            return name;
        }),
        paramValues: match.slice(1).map(function (value) { return value && decodeURIComponent(value); })
    };
}
exports.matchPattern = matchPattern;
function getParamNames(pattern) {
    return getRegexp(pattern).keys.map(function (_a) {
        var name = _a.name;
        return name;
    });
}
exports.getParamNames = getParamNames;
function makeParams(paramNames, paramValues) {
    var params = {};
    var lastIndex = 0;
    paramNames.forEach(function (paramName, index) {
        if (typeof paramName === 'number') {
            paramName = lastIndex++;
        }
        params[paramName] = paramValues && paramValues[index];
    });
    return params;
}
exports.makeParams = makeParams;
function getParams(pattern, pathname) {
    var _a = matchPattern(pattern, pathname), remainingPathname = _a.remainingPathname, paramNames = _a.paramNames, paramValues = _a.paramValues;
    if (remainingPathname === null) {
        return null;
    }
    return makeParams(paramNames, paramValues);
}
exports.getParams = getParams;
function formatPattern(pattern, params) {
    if (params === void 0) { params = {}; }
    return getCompiled(pattern)(params);
}
exports.formatPattern = formatPattern;
//# sourceMappingURL=match-pattern.js.map
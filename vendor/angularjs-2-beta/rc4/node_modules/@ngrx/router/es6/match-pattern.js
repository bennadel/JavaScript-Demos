import * as pathToRegexp from 'path-to-regexp';
const REGEXP_CACHE = new Map();
const COMPILED_CACHE = new Map();
export function getRegexp(pattern) {
    if (!REGEXP_CACHE.has(pattern)) {
        const keys = [];
        const regexp = pathToRegexp(pattern, keys, { end: false });
        REGEXP_CACHE.set(pattern, { keys, regexp });
    }
    return REGEXP_CACHE.get(pattern);
}
export function getCompiled(pattern) {
    if (!COMPILED_CACHE.has(pattern)) {
        COMPILED_CACHE.set(pattern, pathToRegexp.compile(pattern));
    }
    return COMPILED_CACHE.get(pattern);
}
export function matchPattern(pattern, pathname) {
    if (pattern.charAt(0) !== '/') {
        pattern = `/${pattern}`;
    }
    const compiled = getRegexp(pattern);
    const match = compiled.regexp.exec(pathname);
    if (!match) {
        return {
            remainingPathname: null,
            paramNames: [],
            paramValues: []
        };
    }
    return {
        remainingPathname: pathname.substr(match[0].length),
        paramNames: compiled.keys.map(({ name }) => name),
        paramValues: match.slice(1).map(value => value && decodeURIComponent(value))
    };
}
export function getParamNames(pattern) {
    return getRegexp(pattern).keys.map(({ name }) => name);
}
export function makeParams(paramNames, paramValues) {
    const params = {};
    let lastIndex = 0;
    paramNames.forEach(function (paramName, index) {
        if (typeof paramName === 'number') {
            paramName = lastIndex++;
        }
        params[paramName] = paramValues && paramValues[index];
    });
    return params;
}
export function getParams(pattern, pathname) {
    const { remainingPathname, paramNames, paramValues } = matchPattern(pattern, pathname);
    if (remainingPathname === null) {
        return null;
    }
    return makeParams(paramNames, paramValues);
}
export function formatPattern(pattern, params = {}) {
    return getCompiled(pattern)(params);
}
//# sourceMappingURL=match-pattern.js.map
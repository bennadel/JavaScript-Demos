/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTimeoutNonBlocking = exports.exportPropGetter = exports.beingCrawled = exports.callUserCallback = exports.exceptionGuard = exports.tryParseInt = exports.INTEGER_REGEXP_ = exports.errorForServerCode = exports.isWindowsStoreApp = exports.isChromeExtensionContentScript = exports.doubleToIEEE754String = exports.bindCallback = exports.each = exports.splitStringBySize = exports.ObjectToUniqueKey = exports.requireKey = exports.stringCompare = exports.nameCompare = exports.MAX_NAME = exports.MIN_NAME = exports.executeWhenDOMReady = exports.isInvalidJSONNumber = exports.warnAboutUnsupportedMethod = exports.warnIfPageIsSecure = exports.warn = exports.fatal = exports.error = exports.logWrapper = exports.log = exports.enableLogging = exports.logger = exports.sha1 = exports.base64Decode = exports.base64Encode = exports.LUIDGenerator = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                              * Copyright 2017 Google Inc.
                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                              * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                              * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                              * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                              *   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                              * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                              * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                              * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                              * limitations under the License.
                                                                                                                                                                                                                                                                              */


exports.setBufferImpl = setBufferImpl;

var _assert = require('../../../utils/assert');

var _obj = require('../../../utils/obj');

var _crypt = require('../../../utils/crypt');

var _Sha = require('../../../utils/Sha1');

var _utf = require('../../../utils/utf8');

var _json = require('../../../utils/json');

var _storage = require('../storage/storage');

var _environment = require('../../../utils/environment');

/**
 * Returns a locally-unique ID (generated by just incrementing up from 0 each time its called).
 * @type {function(): number} Generated ID.
 */
var LUIDGenerator = exports.LUIDGenerator = function () {
    var id = 1;
    return function () {
        return id++;
    };
}();
/**
 * URL-safe base64 encoding
 * @param {!string} str
 * @return {!string}
 */
var base64Encode = exports.base64Encode = function base64Encode(str) {
    var utf8Bytes = (0, _utf.stringToByteArray)(str);
    return _crypt.base64.encodeByteArray(utf8Bytes, /*useWebSafe=*/true);
};
var BufferImpl;
function setBufferImpl(impl) {
    BufferImpl = impl;
}
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param {string} str To be decoded
 * @return {?string} Decoded result, if possible
 */
var base64Decode = exports.base64Decode = function base64Decode(str) {
    try {
        if (BufferImpl) {
            return new BufferImpl(str, 'base64').toString('utf8');
        } else {
            return _crypt.base64.decodeString(str, /*useWebSafe=*/true);
        }
    } catch (e) {
        log('base64Decode failed: ', e);
    }
    return null;
};
/**
 * Sha1 hash of the input string
 * @param {!string} str The string to hash
 * @return {!string} The resulting hash
 */
var sha1 = exports.sha1 = function sha1(str) {
    var utf8Bytes = (0, _utf.stringToByteArray)(str);
    var sha1 = new _Sha.Sha1();
    sha1.update(utf8Bytes);
    var sha1Bytes = sha1.digest();
    return _crypt.base64.encodeByteArray(sha1Bytes);
};
/**
 * @param {...*} var_args
 * @return {string}
 * @private
 */
var buildLogMessage_ = function buildLogMessage_() {
    var var_args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        var_args[_i] = arguments[_i];
    }
    var message = '';
    for (var i = 0; i < var_args.length; i++) {
        if (Array.isArray(var_args[i]) || var_args[i] && _typeof(var_args[i]) === 'object' && typeof var_args[i].length === 'number') {
            message += buildLogMessage_.apply(null, var_args[i]);
        } else if (_typeof(var_args[i]) === 'object') {
            message += (0, _json.stringify)(var_args[i]);
        } else {
            message += var_args[i];
        }
        message += ' ';
    }
    return message;
};
/**
 * Use this for all debug messages in Firebase.
 * @type {?function(string)}
 */
var logger = exports.logger = null;
/**
 * Flag to check for log availability on first log message
 * @type {boolean}
 * @private
 */
var firstLog_ = true;
/**
 * The implementation of Firebase.enableLogging (defined here to break dependencies)
 * @param {boolean|?function(string)} logger_ A flag to turn on logging, or a custom logger
 * @param {boolean=} persistent Whether or not to persist logging settings across refreshes
 */
var enableLogging = exports.enableLogging = function enableLogging(logger_, persistent) {
    (0, _assert.assert)(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
    if (logger_ === true) {
        if (typeof console !== 'undefined') {
            if (typeof console.log === 'function') {
                exports.logger = logger = console.log.bind(console);
            } else if (_typeof(console.log) === 'object') {
                // IE does this.
                exports.logger = logger = function logger(message) {
                    console.log(message);
                };
            }
        }
        if (persistent) _storage.SessionStorage.set('logging_enabled', true);
    } else if (typeof logger_ === 'function') {
        exports.logger = logger = logger_;
    } else {
        exports.logger = logger = null;
        _storage.SessionStorage.remove('logging_enabled');
    }
};
/**
 *
 * @param {...(string|Arguments)} var_args
 */
var log = exports.log = function log() {
    var var_args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        var_args[_i] = arguments[_i];
    }
    if (firstLog_ === true) {
        firstLog_ = false;
        if (logger === null && _storage.SessionStorage.get('logging_enabled') === true) enableLogging(true);
    }
    if (logger) {
        var message = buildLogMessage_.apply(null, var_args);
        logger(message);
    }
};
/**
 * @param {!string} prefix
 * @return {function(...[*])}
 */
var logWrapper = exports.logWrapper = function logWrapper(prefix) {
    return function () {
        var var_args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            var_args[_i] = arguments[_i];
        }
        log.apply(void 0, [prefix].concat(var_args));
    };
};
/**
 * @param {...string} var_args
 */
var error = exports.error = function error() {
    var var_args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        var_args[_i] = arguments[_i];
    }
    if (typeof console !== 'undefined') {
        var message = 'FIREBASE INTERNAL ERROR: ' + buildLogMessage_.apply(void 0, var_args);
        if (typeof console.error !== 'undefined') {
            console.error(message);
        } else {
            console.log(message);
        }
    }
};
/**
 * @param {...string} var_args
 */
var fatal = exports.fatal = function fatal() {
    var var_args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        var_args[_i] = arguments[_i];
    }
    var message = buildLogMessage_.apply(void 0, var_args);
    throw new Error('FIREBASE FATAL ERROR: ' + message);
};
/**
 * @param {...*} var_args
 */
var warn = exports.warn = function warn() {
    var var_args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        var_args[_i] = arguments[_i];
    }
    if (typeof console !== 'undefined') {
        var message = 'FIREBASE WARNING: ' + buildLogMessage_.apply(void 0, var_args);
        if (typeof console.warn !== 'undefined') {
            console.warn(message);
        } else {
            console.log(message);
        }
    }
};
/**
 * Logs a warning if the containing page uses https. Called when a call to new Firebase
 * does not use https.
 */
var warnIfPageIsSecure = exports.warnIfPageIsSecure = function warnIfPageIsSecure() {
    // Be very careful accessing browser globals. Who knows what may or may not exist.
    if (typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.indexOf('https:') !== -1) {
        warn('Insecure Firebase access from a secure page. ' + 'Please use https in calls to new Firebase().');
    }
};
/**
 * @param {!String} methodName
 */
var warnAboutUnsupportedMethod = exports.warnAboutUnsupportedMethod = function warnAboutUnsupportedMethod(methodName) {
    warn(methodName + ' is unsupported and will likely change soon.  ' + 'Please do not use.');
};
/**
 * Returns true if data is NaN, or +/- Infinity.
 * @param {*} data
 * @return {boolean}
 */
var isInvalidJSONNumber = exports.isInvalidJSONNumber = function isInvalidJSONNumber(data) {
    return typeof data === 'number' && (data != data || data == Number.POSITIVE_INFINITY || data == Number.NEGATIVE_INFINITY);
};
/**
 * @param {function()} fn
 */
var executeWhenDOMReady = exports.executeWhenDOMReady = function executeWhenDOMReady(fn) {
    if ((0, _environment.isNodeSdk)() || document.readyState === 'complete') {
        fn();
    } else {
        // Modeled after jQuery. Try DOMContentLoaded and onreadystatechange (which
        // fire before onload), but fall back to onload.
        var called_1 = false;
        var wrappedFn_1 = function wrappedFn_1() {
            if (!document.body) {
                setTimeout(wrappedFn_1, Math.floor(10));
                return;
            }
            if (!called_1) {
                called_1 = true;
                fn();
            }
        };
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', wrappedFn_1, false);
            // fallback to onload.
            window.addEventListener('load', wrappedFn_1, false);
        } else if (document.attachEvent) {
            // IE.
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState === 'complete') wrappedFn_1();
            });
            // fallback to onload.
            window.attachEvent('onload', wrappedFn_1);
            // jQuery has an extra hack for IE that we could employ (based on
            // http://javascript.nwbox.com/IEContentLoaded/) But it looks really old.
            // I'm hoping we don't need it.
        }
    }
};
/**
 * Minimum key name. Invalid for actual data, used as a marker to sort before any valid names
 * @type {!string}
 */
var MIN_NAME = exports.MIN_NAME = '[MIN_NAME]';
/**
 * Maximum key name. Invalid for actual data, used as a marker to sort above any valid names
 * @type {!string}
 */
var MAX_NAME = exports.MAX_NAME = '[MAX_NAME]';
/**
 * Compares valid Firebase key names, plus min and max name
 * @param {!string} a
 * @param {!string} b
 * @return {!number}
 */
var nameCompare = exports.nameCompare = function nameCompare(a, b) {
    if (a === b) {
        return 0;
    } else if (a === MIN_NAME || b === MAX_NAME) {
        return -1;
    } else if (b === MIN_NAME || a === MAX_NAME) {
        return 1;
    } else {
        var aAsInt = tryParseInt(a),
            bAsInt = tryParseInt(b);
        if (aAsInt !== null) {
            if (bAsInt !== null) {
                return aAsInt - bAsInt == 0 ? a.length - b.length : aAsInt - bAsInt;
            } else {
                return -1;
            }
        } else if (bAsInt !== null) {
            return 1;
        } else {
            return a < b ? -1 : 1;
        }
    }
};
/**
 * @param {!string} a
 * @param {!string} b
 * @return {!number} comparison result.
 */
var stringCompare = exports.stringCompare = function stringCompare(a, b) {
    if (a === b) {
        return 0;
    } else if (a < b) {
        return -1;
    } else {
        return 1;
    }
};
/**
 * @param {string} key
 * @param {Object} obj
 * @return {*}
 */
var requireKey = exports.requireKey = function requireKey(key, obj) {
    if (obj && key in obj) {
        return obj[key];
    } else {
        throw new Error('Missing required key (' + key + ') in object: ' + (0, _json.stringify)(obj));
    }
};
/**
 * @param {*} obj
 * @return {string}
 */
var ObjectToUniqueKey = exports.ObjectToUniqueKey = function ObjectToUniqueKey(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return (0, _json.stringify)(obj);
    var keys = [];
    for (var k in obj) {
        keys.push(k);
    }
    // Export as json, but with the keys sorted.
    keys.sort();
    var key = '{';
    for (var i = 0; i < keys.length; i++) {
        if (i !== 0) key += ',';
        key += (0, _json.stringify)(keys[i]);
        key += ':';
        key += ObjectToUniqueKey(obj[keys[i]]);
    }
    key += '}';
    return key;
};
/**
 * Splits a string into a number of smaller segments of maximum size
 * @param {!string} str The string
 * @param {!number} segsize The maximum number of chars in the string.
 * @return {Array.<string>} The string, split into appropriately-sized chunks
 */
var splitStringBySize = exports.splitStringBySize = function splitStringBySize(str, segsize) {
    var len = str.length;
    if (len <= segsize) {
        return [str];
    }
    var dataSegs = [];
    for (var c = 0; c < len; c += segsize) {
        if (c + segsize > len) {
            dataSegs.push(str.substring(c, len));
        } else {
            dataSegs.push(str.substring(c, c + segsize));
        }
    }
    return dataSegs;
};
/**
 * Apply a function to each (key, value) pair in an object or
 * apply a function to each (index, value) pair in an array
 * @param {!(Object|Array)} obj The object or array to iterate over
 * @param {function(?, ?)} fn The function to apply
 */
var each = exports.each = function each(obj, fn) {
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; ++i) {
            fn(i, obj[i]);
        }
    } else {
        /**
         * in the conversion of code we removed the goog.object.forEach
         * function which did a value,key callback. We standardized on
         * a single impl that does a key, value callback. So we invert
         * to not have to touch the `each` code points
         */
        (0, _obj.forEach)(obj, function (key, val) {
            return fn(val, key);
        });
    }
};
/**
 * Like goog.bind, but doesn't bother to create a closure if opt_context is null/undefined.
 * @param {function(*)} callback Callback function.
 * @param {?Object=} context Optional context to bind to.
 * @return {function(*)}
 */
var bindCallback = exports.bindCallback = function bindCallback(callback, context) {
    return context ? callback.bind(context) : callback;
};
/**
 * Borrowed from http://hg.secondlife.com/llsd/src/tip/js/typedarray.js (MIT License)
 * I made one modification at the end and removed the NaN / Infinity
 * handling (since it seemed broken [caused an overflow] and we don't need it).  See MJL comments.
 * @param {!number} v A double
 * @return {string}
 */
var doubleToIEEE754String = exports.doubleToIEEE754String = function doubleToIEEE754String(v) {
    (0, _assert.assert)(!isInvalidJSONNumber(v), 'Invalid JSON number'); // MJL
    var ebits = 11,
        fbits = 52;
    var bias = (1 << ebits - 1) - 1,
        s,
        e,
        f,
        ln,
        i,
        bits,
        str;
    // Compute sign, exponent, fraction
    // Skip NaN / Infinity handling --MJL.
    if (v === 0) {
        e = 0;
        f = 0;
        s = 1 / v === -Infinity ? 1 : 0;
    } else {
        s = v < 0;
        v = Math.abs(v);
        if (v >= Math.pow(2, 1 - bias)) {
            // Normalized
            ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
            e = ln + bias;
            f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
        } else {
            // Denormalized
            e = 0;
            f = Math.round(v / Math.pow(2, 1 - bias - fbits));
        }
    }
    // Pack sign, exponent, fraction
    bits = [];
    for (i = fbits; i; i -= 1) {
        bits.push(f % 2 ? 1 : 0);
        f = Math.floor(f / 2);
    }
    for (i = ebits; i; i -= 1) {
        bits.push(e % 2 ? 1 : 0);
        e = Math.floor(e / 2);
    }
    bits.push(s ? 1 : 0);
    bits.reverse();
    str = bits.join('');
    // Return the data as a hex string. --MJL
    var hexByteString = '';
    for (i = 0; i < 64; i += 8) {
        var hexByte = parseInt(str.substr(i, 8), 2).toString(16);
        if (hexByte.length === 1) hexByte = '0' + hexByte;
        hexByteString = hexByteString + hexByte;
    }
    return hexByteString.toLowerCase();
};
/**
 * Used to detect if we're in a Chrome content script (which executes in an
 * isolated environment where long-polling doesn't work).
 * @return {boolean}
 */
var isChromeExtensionContentScript = exports.isChromeExtensionContentScript = function isChromeExtensionContentScript() {
    return !!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window['chrome'] && window['chrome']['extension'] && !/^chrome/.test(window.location.href));
};
/**
 * Used to detect if we're in a Windows 8 Store app.
 * @return {boolean}
 */
var isWindowsStoreApp = exports.isWindowsStoreApp = function isWindowsStoreApp() {
    // Check for the presence of a couple WinRT globals
    return (typeof Windows === 'undefined' ? 'undefined' : _typeof(Windows)) === 'object' && _typeof(Windows.UI) === 'object';
};
/**
 * Converts a server error code to a Javascript Error
 * @param {!string} code
 * @param {!Query} query
 * @return {Error}
 */
var errorForServerCode = exports.errorForServerCode = function errorForServerCode(code, query) {
    var reason = 'Unknown Error';
    if (code === 'too_big') {
        reason = 'The data requested exceeds the maximum size ' + 'that can be accessed with a single request.';
    } else if (code == 'permission_denied') {
        reason = "Client doesn't have permission to access the desired data.";
    } else if (code == 'unavailable') {
        reason = 'The service is unavailable';
    }
    var error = new Error(code + ' at ' + query.path.toString() + ': ' + reason);
    error.code = code.toUpperCase();
    return error;
};
/**
 * Used to test for integer-looking strings
 * @type {RegExp}
 * @private
 */
var INTEGER_REGEXP_ = exports.INTEGER_REGEXP_ = new RegExp('^-?\\d{1,10}$');
/**
 * If the string contains a 32-bit integer, return it.  Else return null.
 * @param {!string} str
 * @return {?number}
 */
var tryParseInt = exports.tryParseInt = function tryParseInt(str) {
    if (INTEGER_REGEXP_.test(str)) {
        var intVal = Number(str);
        if (intVal >= -2147483648 && intVal <= 2147483647) {
            return intVal;
        }
    }
    return null;
};
/**
 * Helper to run some code but catch any exceptions and re-throw them later.
 * Useful for preventing user callbacks from breaking internal code.
 *
 * Re-throwing the exception from a setTimeout is a little evil, but it's very
 * convenient (we don't have to try to figure out when is a safe point to
 * re-throw it), and the behavior seems reasonable:
 *
 * * If you aren't pausing on exceptions, you get an error in the console with
 *   the correct stack trace.
 * * If you're pausing on all exceptions, the debugger will pause on your
 *   exception and then again when we rethrow it.
 * * If you're only pausing on uncaught exceptions, the debugger will only pause
 *   on us re-throwing it.
 *
 * @param {!function()} fn The code to guard.
 */
var exceptionGuard = exports.exceptionGuard = function exceptionGuard(fn) {
    try {
        fn();
    } catch (e) {
        // Re-throw exception when it's safe.
        setTimeout(function () {
            // It used to be that "throw e" would result in a good console error with
            // relevant context, but as of Chrome 39, you just get the firebase.js
            // file/line number where we re-throw it, which is useless. So we log
            // e.stack explicitly.
            var stack = e.stack || '';
            warn('Exception was thrown by user callback.', stack);
            throw e;
        }, Math.floor(0));
    }
};
/**
 * Helper function to safely call opt_callback with the specified arguments.  It:
 * 1. Turns into a no-op if opt_callback is null or undefined.
 * 2. Wraps the call inside exceptionGuard to prevent exceptions from breaking our state.
 *
 * @param {?Function=} callback Optional onComplete callback.
 * @param {...*} var_args Arbitrary args to be passed to opt_onComplete
 */
var callUserCallback = exports.callUserCallback = function callUserCallback(callback) {
    var var_args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        var_args[_i - 1] = arguments[_i];
    }
    if (typeof callback === 'function') {
        exceptionGuard(function () {
            callback.apply(void 0, var_args);
        });
    }
};
/**
 * @return {boolean} true if we think we're currently being crawled.
 */
var beingCrawled = exports.beingCrawled = function beingCrawled() {
    var userAgent = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window['navigator'] && window['navigator']['userAgent'] || '';
    // For now we whitelist the most popular crawlers.  We should refine this to be the set of crawlers we
    // believe to support JavaScript/AJAX rendering.
    // NOTE: Google Webmaster Tools doesn't really belong, but their "This is how a visitor to your website
    // would have seen the page" is flaky if we don't treat it as a crawler.
    return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
};
/**
 * Export a property of an object using a getter function.
 *
 * @param {!Object} object
 * @param {string} name
 * @param {!function(): *} fnGet
 */
var exportPropGetter = exports.exportPropGetter = function exportPropGetter(object, name, fnGet) {
    Object.defineProperty(object, name, { get: fnGet });
};
/**
 * Same as setTimeout() except on Node.JS it will /not/ prevent the process from exiting.
 *
 * It is removed with clearTimeout() as normal.
 *
 * @param {Function} fn Function to run.
 * @param {number} time Milliseconds to wait before running.
 * @return {number|Object} The setTimeout() return value.
 */
var setTimeoutNonBlocking = exports.setTimeoutNonBlocking = function setTimeoutNonBlocking(fn, time) {
    var timeout = setTimeout(fn, time);
    if ((typeof timeout === 'undefined' ? 'undefined' : _typeof(timeout)) === 'object' && timeout['unref']) {
        timeout['unref']();
    }
    return timeout;
};
//# sourceMappingURL=util.js.map

/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateObjectContainsKey = exports.validateObject = exports.validateString = exports.validateBoolean = exports.validateCredential = exports.validateUrl = exports.validateWritablePath = exports.validateRootPathString = exports.validatePathString = exports.validateKey = exports.validateEventType = exports.validatePriority = exports.validateFirebaseMergeDataArg = exports.validateFirebaseMergePaths = exports.validateFirebaseData = exports.validateFirebaseDataArg = exports.isValidPriority = exports.isValidRootPathString = exports.isValidPathString = exports.isValidKey = exports.MAX_LEAF_SIZE_ = exports.INVALID_PATH_REGEX_ = exports.INVALID_KEY_REGEX_ = undefined;

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


var _Path = require('./Path');

var _obj = require('../../../utils/obj');

var _util = require('./util');

var _validation = require('../../../utils/validation');

var _utf = require('../../../utils/utf8');

/**
 * True for invalid Firebase keys
 * @type {RegExp}
 * @private
 */
var INVALID_KEY_REGEX_ = exports.INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
/**
 * True for invalid Firebase paths.
 * Allows '/' in paths.
 * @type {RegExp}
 * @private
 */
var INVALID_PATH_REGEX_ = exports.INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
/**
 * Maximum number of characters to allow in leaf value
 * @type {number}
 * @private
 */
var MAX_LEAF_SIZE_ = exports.MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
/**
 * @param {*} key
 * @return {boolean}
 */
var isValidKey = exports.isValidKey = function isValidKey(key) {
    return typeof key === 'string' && key.length !== 0 && !INVALID_KEY_REGEX_.test(key);
};
/**
 * @param {string} pathString
 * @return {boolean}
 */
var isValidPathString = exports.isValidPathString = function isValidPathString(pathString) {
    return typeof pathString === 'string' && pathString.length !== 0 && !INVALID_PATH_REGEX_.test(pathString);
};
/**
 * @param {string} pathString
 * @return {boolean}
 */
var isValidRootPathString = exports.isValidRootPathString = function isValidRootPathString(pathString) {
    if (pathString) {
        // Allow '/.info/' at the beginning.
        pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
    }
    return isValidPathString(pathString);
};
/**
 * @param {*} priority
 * @return {boolean}
 */
var isValidPriority = exports.isValidPriority = function isValidPriority(priority) {
    return priority === null || typeof priority === 'string' || typeof priority === 'number' && !(0, _util.isInvalidJSONNumber)(priority) || priority && (typeof priority === 'undefined' ? 'undefined' : _typeof(priority)) === 'object' && (0, _obj.contains)(priority, '.sv');
};
/**
 * Pre-validate a datum passed as an argument to Firebase function.
 *
 * @param {string} fnName
 * @param {number} argumentNumber
 * @param {*} data
 * @param {!Path} path
 * @param {boolean} optional
 */
var validateFirebaseDataArg = exports.validateFirebaseDataArg = function validateFirebaseDataArg(fnName, argumentNumber, data, path, optional) {
    if (optional && data === undefined) return;
    validateFirebaseData((0, _validation.errorPrefix)(fnName, argumentNumber, optional), data, path);
};
/**
 * Validate a data object client-side before sending to server.
 *
 * @param {string} errorPrefix
 * @param {*} data
 * @param {!Path|!ValidationPath} path_
 */
var validateFirebaseData = exports.validateFirebaseData = function validateFirebaseData(errorPrefix, data, path_) {
    var path = path_ instanceof _Path.Path ? new _Path.ValidationPath(path_, errorPrefix) : path_;
    if (data === undefined) {
        throw new Error(errorPrefix + 'contains undefined ' + path.toErrorString());
    }
    if (typeof data === 'function') {
        throw new Error(errorPrefix + 'contains a function ' + path.toErrorString() + ' with contents = ' + data.toString());
    }
    if ((0, _util.isInvalidJSONNumber)(data)) {
        throw new Error(errorPrefix + 'contains ' + data.toString() + ' ' + path.toErrorString());
    }
    // Check max leaf size, but try to avoid the utf8 conversion if we can.
    if (typeof data === 'string' && data.length > MAX_LEAF_SIZE_ / 3 && (0, _utf.stringLength)(data) > MAX_LEAF_SIZE_) {
        throw new Error(errorPrefix + 'contains a string greater than ' + MAX_LEAF_SIZE_ + ' utf8 bytes ' + path.toErrorString() + " ('" + data.substring(0, 50) + "...')");
    }
    // TODO = Perf = Consider combining the recursive validation of keys into NodeFromJSON
    // to save extra walking of large objects.
    if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        var hasDotValue_1 = false,
            hasActualChild_1 = false;
        (0, _obj.forEach)(data, function (key, value) {
            if (key === '.value') {
                hasDotValue_1 = true;
            } else if (key !== '.priority' && key !== '.sv') {
                hasActualChild_1 = true;
                if (!isValidKey(key)) {
                    throw new Error(errorPrefix + ' contains an invalid key (' + key + ') ' + path.toErrorString() + '.  Keys must be non-empty strings ' + 'and can\'t contain ".", "#", "$", "/", "[", or "]"');
                }
            }
            path.push(key);
            validateFirebaseData(errorPrefix, value, path);
            path.pop();
        });
        if (hasDotValue_1 && hasActualChild_1) {
            throw new Error(errorPrefix + ' contains ".value" child ' + path.toErrorString() + ' in addition to actual children.');
        }
    }
};
/**
 * Pre-validate paths passed in the firebase function.
 *
 * @param {string} errorPrefix
 * @param {Array<!Path>} mergePaths
 */
var validateFirebaseMergePaths = exports.validateFirebaseMergePaths = function validateFirebaseMergePaths(errorPrefix, mergePaths) {
    var i, curPath;
    for (i = 0; i < mergePaths.length; i++) {
        curPath = mergePaths[i];
        var keys = curPath.slice();
        for (var j = 0; j < keys.length; j++) {
            if (keys[j] === '.priority' && j === keys.length - 1) {
                // .priority is OK
            } else if (!isValidKey(keys[j])) {
                throw new Error(errorPrefix + 'contains an invalid key (' + keys[j] + ') in path ' + curPath.toString() + '. Keys must be non-empty strings ' + 'and can\'t contain ".", "#", "$", "/", "[", or "]"');
            }
        }
    }
    // Check that update keys are not descendants of each other.
    // We rely on the property that sorting guarantees that ancestors come
    // right before descendants.
    mergePaths.sort(_Path.Path.comparePaths);
    var prevPath = null;
    for (i = 0; i < mergePaths.length; i++) {
        curPath = mergePaths[i];
        if (prevPath !== null && prevPath.contains(curPath)) {
            throw new Error(errorPrefix + 'contains a path ' + prevPath.toString() + ' that is ancestor of another path ' + curPath.toString());
        }
        prevPath = curPath;
    }
};
/**
 * pre-validate an object passed as an argument to firebase function (
 * must be an object - e.g. for firebase.update()).
 *
 * @param {string} fnName
 * @param {number} argumentNumber
 * @param {*} data
 * @param {!Path} path
 * @param {boolean} optional
 */
var validateFirebaseMergeDataArg = exports.validateFirebaseMergeDataArg = function validateFirebaseMergeDataArg(fnName, argumentNumber, data, path, optional) {
    if (optional && data === undefined) return;
    var errorPrefix = (0, _validation.errorPrefix)(fnName, argumentNumber, optional);
    if (!(data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') || Array.isArray(data)) {
        throw new Error(errorPrefix + ' must be an object containing the children to replace.');
    }
    var mergePaths = [];
    (0, _obj.forEach)(data, function (key, value) {
        var curPath = new _Path.Path(key);
        validateFirebaseData(errorPrefix, value, path.child(curPath));
        if (curPath.getBack() === '.priority') {
            if (!isValidPriority(value)) {
                throw new Error(errorPrefix + "contains an invalid value for '" + curPath.toString() + "', which must be a valid " + 'Firebase priority (a string, finite number, server value, or null).');
            }
        }
        mergePaths.push(curPath);
    });
    validateFirebaseMergePaths(errorPrefix, mergePaths);
};
var validatePriority = exports.validatePriority = function validatePriority(fnName, argumentNumber, priority, optional) {
    if (optional && priority === undefined) return;
    if ((0, _util.isInvalidJSONNumber)(priority)) throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'is ' + priority.toString() + ', but must be a valid Firebase priority (a string, finite number, ' + 'server value, or null).');
    // Special case to allow importing data with a .sv.
    if (!isValidPriority(priority)) throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must be a valid Firebase priority ' + '(a string, finite number, server value, or null).');
};
var validateEventType = exports.validateEventType = function validateEventType(fnName, argumentNumber, eventType, optional) {
    if (optional && eventType === undefined) return;
    switch (eventType) {
        case 'value':
        case 'child_added':
        case 'child_removed':
        case 'child_changed':
        case 'child_moved':
            break;
        default:
            throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must be a valid event type = "value", "child_added", "child_removed", ' + '"child_changed", or "child_moved".');
    }
};
var validateKey = exports.validateKey = function validateKey(fnName, argumentNumber, key, optional) {
    if (optional && key === undefined) return;
    if (!isValidKey(key)) throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'was an invalid key = "' + key + '".  Firebase keys must be non-empty strings and ' + 'can\'t contain ".", "#", "$", "/", "[", or "]").');
};
var validatePathString = exports.validatePathString = function validatePathString(fnName, argumentNumber, pathString, optional) {
    if (optional && pathString === undefined) return;
    if (!isValidPathString(pathString)) throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'was an invalid path = "' + pathString + '". Paths must be non-empty strings and ' + 'can\'t contain ".", "#", "$", "[", or "]"');
};
var validateRootPathString = exports.validateRootPathString = function validateRootPathString(fnName, argumentNumber, pathString, optional) {
    if (pathString) {
        // Allow '/.info/' at the beginning.
        pathString = pathString.replace(/^\/*\.info(\/|$)/, '/');
    }
    validatePathString(fnName, argumentNumber, pathString, optional);
};
var validateWritablePath = exports.validateWritablePath = function validateWritablePath(fnName, path) {
    if (path.getFront() === '.info') {
        throw new Error(fnName + " failed = Can't modify data under /.info/");
    }
};
var validateUrl = exports.validateUrl = function validateUrl(fnName, argumentNumber, parsedUrl) {
    // TODO = Validate server better.
    var pathString = parsedUrl.path.toString();
    if (!(typeof parsedUrl.repoInfo.host === 'string') || parsedUrl.repoInfo.host.length === 0 || !isValidKey(parsedUrl.repoInfo.namespace) || pathString.length !== 0 && !isValidRootPathString(pathString)) {
        throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, false) + 'must be a valid firebase URL and ' + 'the path can\'t contain ".", "#", "$", "[", or "]".');
    }
};
var validateCredential = exports.validateCredential = function validateCredential(fnName, argumentNumber, cred, optional) {
    if (optional && cred === undefined) return;
    if (!(typeof cred === 'string')) throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must be a valid credential (a string).');
};
var validateBoolean = exports.validateBoolean = function validateBoolean(fnName, argumentNumber, bool, optional) {
    if (optional && bool === undefined) return;
    if (typeof bool !== 'boolean') throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must be a boolean.');
};
var validateString = exports.validateString = function validateString(fnName, argumentNumber, string, optional) {
    if (optional && string === undefined) return;
    if (!(typeof string === 'string')) {
        throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must be a valid string.');
    }
};
var validateObject = exports.validateObject = function validateObject(fnName, argumentNumber, obj, optional) {
    if (optional && obj === undefined) return;
    if (!(obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') || obj === null) {
        throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must be a valid object.');
    }
};
var validateObjectContainsKey = exports.validateObjectContainsKey = function validateObjectContainsKey(fnName, argumentNumber, obj, key, optional, opt_type) {
    var objectContainsKey = obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && (0, _obj.contains)(obj, key);
    if (!objectContainsKey) {
        if (optional) {
            return;
        } else {
            throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must contain the key "' + key + '"');
        }
    }
    if (opt_type) {
        var val = (0, _obj.safeGet)(obj, key);
        if (opt_type === 'number' && !(typeof val === 'number') || opt_type === 'string' && !(typeof val === 'string') || opt_type === 'boolean' && !(typeof val === 'boolean') || opt_type === 'function' && !(typeof val === 'function') || opt_type === 'object' && !((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') && val) {
            if (optional) {
                throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'contains invalid value for key "' + key + '" (must be of type "' + opt_type + '")');
            } else {
                throw new Error((0, _validation.errorPrefix)(fnName, argumentNumber, optional) + 'must contain the key "' + key + '" with type "' + opt_type + '"');
            }
        }
    }
};
//# sourceMappingURL=validation.js.map

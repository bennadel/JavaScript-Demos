/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reference = undefined;

var _onDisconnect = require('./onDisconnect');

var _TransactionResult = require('./TransactionResult');

var _util = require('../core/util/util');

var _NextPushId = require('../core/util/NextPushId');

var _Query = require('./Query');

var _Repo = require('../core/Repo');

var _Path = require('../core/util/Path');

var _QueryParams = require('../core/view/QueryParams');

var _validation = require('../core/util/validation');

var _validation2 = require('../../utils/validation');

var _promise = require('../../utils/promise');

var _SyncPoint = require('../core/SyncPoint');

/**
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
var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

var Reference = function (_super) {
    __extends(Reference, _super);
    /**
     * Call options:
     *   new Reference(Repo, Path) or
     *   new Reference(url: string, string|RepoManager)
     *
     * Externally - this is the firebase.database.Reference type.
     *
     * @param {!Repo} repo
     * @param {(!Path)} path
     * @extends {Query}
     */
    function Reference(repo, path) {
        var _this = this;
        if (!(repo instanceof _Repo.Repo)) {
            throw new Error('new Reference() no longer supported - use app.database().');
        }
        // call Query's constructor, passing in the repo and path.
        _this = _super.call(this, repo, path, _QueryParams.QueryParams.DEFAULT, false) || this;
        return _this;
    }
    /** @return {?string} */
    Reference.prototype.getKey = function () {
        (0, _validation2.validateArgCount)('Reference.key', 0, 0, arguments.length);
        if (this.path.isEmpty()) return null;else return this.path.getBack();
    };
    /**
     * @param {!(string|Path)} pathString
     * @return {!Reference}
     */
    Reference.prototype.child = function (pathString) {
        (0, _validation2.validateArgCount)('Reference.child', 1, 1, arguments.length);
        if (typeof pathString === 'number') {
            pathString = String(pathString);
        } else if (!(pathString instanceof _Path.Path)) {
            if (this.path.getFront() === null) (0, _validation.validateRootPathString)('Reference.child', 1, pathString, false);else (0, _validation.validatePathString)('Reference.child', 1, pathString, false);
        }
        return new Reference(this.repo, this.path.child(pathString));
    };
    /** @return {?Reference} */
    Reference.prototype.getParent = function () {
        (0, _validation2.validateArgCount)('Reference.parent', 0, 0, arguments.length);
        var parentPath = this.path.parent();
        return parentPath === null ? null : new Reference(this.repo, parentPath);
    };
    /** @return {!Reference} */
    Reference.prototype.getRoot = function () {
        (0, _validation2.validateArgCount)('Reference.root', 0, 0, arguments.length);
        var ref = this;
        while (ref.getParent() !== null) {
            ref = ref.getParent();
        }
        return ref;
    };
    /** @return {!Database} */
    Reference.prototype.databaseProp = function () {
        return this.repo.database;
    };
    /**
     * @param {*} newVal
     * @param {function(?Error)=} onComplete
     * @return {!Promise}
     */
    Reference.prototype.set = function (newVal, onComplete) {
        (0, _validation2.validateArgCount)('Reference.set', 1, 2, arguments.length);
        (0, _validation.validateWritablePath)('Reference.set', this.path);
        (0, _validation.validateFirebaseDataArg)('Reference.set', 1, newVal, this.path, false);
        (0, _validation2.validateCallback)('Reference.set', 2, onComplete, true);
        var deferred = new _promise.Deferred();
        this.repo.setWithPriority(this.path, newVal,
        /*priority=*/null, deferred.wrapCallback(onComplete));
        return deferred.promise;
    };
    /**
     * @param {!Object} objectToMerge
     * @param {function(?Error)=} onComplete
     * @return {!Promise}
     */
    Reference.prototype.update = function (objectToMerge, onComplete) {
        (0, _validation2.validateArgCount)('Reference.update', 1, 2, arguments.length);
        (0, _validation.validateWritablePath)('Reference.update', this.path);
        if (Array.isArray(objectToMerge)) {
            var newObjectToMerge = {};
            for (var i = 0; i < objectToMerge.length; ++i) {
                newObjectToMerge['' + i] = objectToMerge[i];
            }
            objectToMerge = newObjectToMerge;
            (0, _util.warn)('Passing an Array to Firebase.update() is deprecated. ' + 'Use set() if you want to overwrite the existing data, or ' + 'an Object with integer keys if you really do want to ' + 'only update some of the children.');
        }
        (0, _validation.validateFirebaseMergeDataArg)('Reference.update', 1, objectToMerge, this.path, false);
        (0, _validation2.validateCallback)('Reference.update', 2, onComplete, true);
        var deferred = new _promise.Deferred();
        this.repo.update(this.path, objectToMerge, deferred.wrapCallback(onComplete));
        return deferred.promise;
    };
    /**
     * @param {*} newVal
     * @param {string|number|null} newPriority
     * @param {function(?Error)=} onComplete
     * @return {!Promise}
     */
    Reference.prototype.setWithPriority = function (newVal, newPriority, onComplete) {
        (0, _validation2.validateArgCount)('Reference.setWithPriority', 2, 3, arguments.length);
        (0, _validation.validateWritablePath)('Reference.setWithPriority', this.path);
        (0, _validation.validateFirebaseDataArg)('Reference.setWithPriority', 1, newVal, this.path, false);
        (0, _validation.validatePriority)('Reference.setWithPriority', 2, newPriority, false);
        (0, _validation2.validateCallback)('Reference.setWithPriority', 3, onComplete, true);
        if (this.getKey() === '.length' || this.getKey() === '.keys') throw 'Reference.setWithPriority failed: ' + this.getKey() + ' is a read-only object.';
        var deferred = new _promise.Deferred();
        this.repo.setWithPriority(this.path, newVal, newPriority, deferred.wrapCallback(onComplete));
        return deferred.promise;
    };
    /**
     * @param {function(?Error)=} onComplete
     * @return {!Promise}
     */
    Reference.prototype.remove = function (onComplete) {
        (0, _validation2.validateArgCount)('Reference.remove', 0, 1, arguments.length);
        (0, _validation.validateWritablePath)('Reference.remove', this.path);
        (0, _validation2.validateCallback)('Reference.remove', 1, onComplete, true);
        return this.set(null, onComplete);
    };
    /**
     * @param {function(*):*} transactionUpdate
     * @param {(function(?Error, boolean, ?DataSnapshot))=} onComplete
     * @param {boolean=} applyLocally
     * @return {!Promise}
     */
    Reference.prototype.transaction = function (transactionUpdate, onComplete, applyLocally) {
        (0, _validation2.validateArgCount)('Reference.transaction', 1, 3, arguments.length);
        (0, _validation.validateWritablePath)('Reference.transaction', this.path);
        (0, _validation2.validateCallback)('Reference.transaction', 1, transactionUpdate, false);
        (0, _validation2.validateCallback)('Reference.transaction', 2, onComplete, true);
        // NOTE: applyLocally is an internal-only option for now.  We need to decide if we want to keep it and how
        // to expose it.
        (0, _validation.validateBoolean)('Reference.transaction', 3, applyLocally, true);
        if (this.getKey() === '.length' || this.getKey() === '.keys') throw 'Reference.transaction failed: ' + this.getKey() + ' is a read-only object.';
        if (applyLocally === undefined) applyLocally = true;
        var deferred = new _promise.Deferred();
        if (typeof onComplete === 'function') {
            (0, _promise.attachDummyErrorHandler)(deferred.promise);
        }
        var promiseComplete = function promiseComplete(error, committed, snapshot) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(new _TransactionResult.TransactionResult(committed, snapshot));
            }
            if (typeof onComplete === 'function') {
                onComplete(error, committed, snapshot);
            }
        };
        this.repo.startTransaction(this.path, transactionUpdate, promiseComplete, applyLocally);
        return deferred.promise;
    };
    /**
     * @param {string|number|null} priority
     * @param {function(?Error)=} onComplete
     * @return {!Promise}
     */
    Reference.prototype.setPriority = function (priority, onComplete) {
        (0, _validation2.validateArgCount)('Reference.setPriority', 1, 2, arguments.length);
        (0, _validation.validateWritablePath)('Reference.setPriority', this.path);
        (0, _validation.validatePriority)('Reference.setPriority', 1, priority, false);
        (0, _validation2.validateCallback)('Reference.setPriority', 2, onComplete, true);
        var deferred = new _promise.Deferred();
        this.repo.setWithPriority(this.path.child('.priority'), priority, null, deferred.wrapCallback(onComplete));
        return deferred.promise;
    };
    /**
     * @param {*=} value
     * @param {function(?Error)=} onComplete
     * @return {!Reference}
     */
    Reference.prototype.push = function (value, onComplete) {
        (0, _validation2.validateArgCount)('Reference.push', 0, 2, arguments.length);
        (0, _validation.validateWritablePath)('Reference.push', this.path);
        (0, _validation.validateFirebaseDataArg)('Reference.push', 1, value, this.path, true);
        (0, _validation2.validateCallback)('Reference.push', 2, onComplete, true);
        var now = this.repo.serverTime();
        var name = (0, _NextPushId.nextPushId)(now);
        // push() returns a ThennableReference whose promise is fulfilled with a regular Reference.
        // We use child() to create handles to two different references. The first is turned into a
        // ThennableReference below by adding then() and catch() methods and is used as the
        // return value of push(). The second remains a regular Reference and is used as the fulfilled
        // value of the first ThennableReference.
        var thennablePushRef = this.child(name);
        var pushRef = this.child(name);
        var promise;
        if (value != null) {
            promise = thennablePushRef.set(value, onComplete).then(function () {
                return pushRef;
            });
        } else {
            promise = _promise.PromiseImpl.resolve(pushRef);
        }
        thennablePushRef.then = promise.then.bind(promise);
        thennablePushRef.catch = promise.then.bind(promise, undefined);
        if (typeof onComplete === 'function') {
            (0, _promise.attachDummyErrorHandler)(promise);
        }
        return thennablePushRef;
    };
    /**
     * @return {!OnDisconnect}
     */
    Reference.prototype.onDisconnect = function () {
        (0, _validation.validateWritablePath)('Reference.onDisconnect', this.path);
        return new _onDisconnect.OnDisconnect(this.repo, this.path);
    };
    Object.defineProperty(Reference.prototype, "database", {
        get: function get() {
            return this.databaseProp();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "key", {
        get: function get() {
            return this.getKey();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "parent", {
        get: function get() {
            return this.getParent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "root", {
        get: function get() {
            return this.getRoot();
        },
        enumerable: true,
        configurable: true
    });
    return Reference;
}(_Query.Query);
exports.Reference = Reference;
/**
 * Define reference constructor in various modules
 *
 * We are doing this here to avoid several circular
 * dependency issues
 */

_Query.Query.__referenceConstructor = Reference;
_SyncPoint.SyncPoint.__referenceConstructor = Reference;
//# sourceMappingURL=Reference.js.map

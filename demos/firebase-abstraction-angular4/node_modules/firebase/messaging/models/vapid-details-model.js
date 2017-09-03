/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbInterface = require('./db-interface');

var _dbInterface2 = _interopRequireDefault(_dbInterface);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var FCM_VAPID_OBJ_STORE = 'fcm_vapid_object_Store';
var DB_VERSION = 1;
var VapidDetailsModel = function (_super) {
    __extends(VapidDetailsModel, _super);
    function VapidDetailsModel() {
        return _super.call(this, VapidDetailsModel.dbName, DB_VERSION) || this;
    }
    Object.defineProperty(VapidDetailsModel, "dbName", {
        get: function get() {
            return 'fcm_vapid_details_db';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @override
     * @param {IDBDatabase} db
     */
    VapidDetailsModel.prototype.onDBUpgrade = function (db) {
        db.createObjectStore(FCM_VAPID_OBJ_STORE, {
            keyPath: 'swScope'
        });
    };
    /**
     * Given a service worker scope, this method will look up the vapid key
     * in indexedDB.
     * @param {string} swScope
     * @return {Promise<string>} The vapid key associated with that scope.
     */
    VapidDetailsModel.prototype.getVapidFromSWScope = function (swScope) {
        if (typeof swScope !== 'string' || swScope.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SCOPE));
        }
        return this.openDatabase().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_VAPID_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_VAPID_OBJ_STORE);
                var scopeRequest = objectStore.get(swScope);
                scopeRequest.onerror = function (event) {
                    reject(event.target.error);
                };
                scopeRequest.onsuccess = function (event) {
                    var result = event.target.result;
                    var vapidKey = null;
                    if (result) {
                        vapidKey = result.vapidKey;
                    }
                    resolve(vapidKey);
                };
            });
        });
    };
    /**
     * Save a vapid key against a swScope for later date.
     * @param  {string} swScope The service worker scope to be associated with
     * this push subscription.
     * @param {string} vapidKey The public vapid key to be associated with
     * the swScope.
     * @return {Promise<void>}
     */
    VapidDetailsModel.prototype.saveVapidDetails = function (swScope, vapidKey) {
        var _this = this;
        if (typeof swScope !== 'string' || swScope.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SCOPE));
        }
        if (typeof vapidKey !== 'string' || vapidKey.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_VAPID_KEY));
        }
        var details = {
            swScope: swScope,
            vapidKey: vapidKey
        };
        return this.openDatabase().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_VAPID_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                var objectStore = transaction.objectStore(FCM_VAPID_OBJ_STORE);
                var request = objectStore.put(details);
                request.onerror = function (event) {
                    reject(event.target.error);
                };
                request.onsuccess = function (event) {
                    resolve();
                };
            });
        });
    };
    /**
     * This method deletes details of the current FCM VAPID key for a SW scope.
     * @param {string} swScope Scope to be deleted
     * @return {Promise<string>} Resolves once the scope / vapid details have been
     * deleted and returns the deleted vapid key.
     */
    VapidDetailsModel.prototype.deleteVapidDetails = function (swScope) {
        var _this = this;
        return this.getVapidFromSWScope(swScope).then(function (vapidKey) {
            if (!vapidKey) {
                throw _this.errorFactory_.create(_errors2.default.codes.DELETE_SCOPE_NOT_FOUND);
            }
            return _this.openDatabase().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_VAPID_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                    var objectStore = transaction.objectStore(FCM_VAPID_OBJ_STORE);
                    var request = objectStore.delete(swScope);
                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                    request.onsuccess = function (event) {
                        if (event.target.result === 0) {
                            reject(_this.errorFactory_.create(_errors2.default.codes.FAILED_DELETE_VAPID_KEY));
                            return;
                        }
                        resolve(vapidKey);
                    };
                });
            });
        });
    };
    return VapidDetailsModel;
}(_dbInterface2.default);
exports.default = VapidDetailsModel;
module.exports = exports['default'];
//# sourceMappingURL=vapid-details-model.js.map

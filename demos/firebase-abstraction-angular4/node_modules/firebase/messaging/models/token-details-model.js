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

var _arrayBufferToBase = require('../helpers/array-buffer-to-base64');

var _arrayBufferToBase2 = _interopRequireDefault(_arrayBufferToBase);

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

var FCM_TOKEN_OBJ_STORE = 'fcm_token_object_Store';
var DB_VERSION = 1;
/** @record */
function ValidateInput() {}
/** @type {string|undefined} */
ValidateInput.prototype.fcmToken;
/** @type {string|undefined} */
ValidateInput.prototype.swScope;
/** @type {string|undefined} */
ValidateInput.prototype.vapidKey;
/** @type {PushSubscription|undefined} */
ValidateInput.prototype.subscription;
/** @type {string|undefined} */
ValidateInput.prototype.fcmSenderId;
/** @type {string|undefined} */
ValidateInput.prototype.fcmPushSet;
var TokenDetailsModel = function (_super) {
    __extends(TokenDetailsModel, _super);
    function TokenDetailsModel() {
        return _super.call(this, TokenDetailsModel.dbName, DB_VERSION) || this;
    }
    Object.defineProperty(TokenDetailsModel, "dbName", {
        get: function get() {
            return 'fcm_token_details_db';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @override
     */
    TokenDetailsModel.prototype.onDBUpgrade = function (db) {
        var objectStore = db.createObjectStore(FCM_TOKEN_OBJ_STORE, {
            keyPath: 'swScope'
        });
        // Make sure the sender ID can be searched
        objectStore.createIndex('fcmSenderId', 'fcmSenderId', {
            unique: false
        });
        objectStore.createIndex('fcmToken', 'fcmToken', {
            unique: true
        });
    };
    /**
     * This method takes an object and will check for known arguments and
     * validate the input.
     * @private
     * @param {!ValidateInput} input
     * @return {!Promise} Returns promise that resolves if input is valid,
     * rejects otherwise.
     */
    TokenDetailsModel.prototype.validateInputs_ = function (input) {
        if (input.fcmToken) {
            if (typeof input.fcmToken !== 'string' || input.fcmToken.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_TOKEN));
            }
        }
        if (input.swScope) {
            if (typeof input.swScope !== 'string' || input.swScope.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SCOPE));
            }
        }
        if (input.vapidKey) {
            if (typeof input.vapidKey !== 'string' || input.vapidKey.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_VAPID_KEY));
            }
        }
        if (input.subscription) {
            if (!(input.subscription instanceof PushSubscription)) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SUBSCRIPTION));
            }
        }
        if (input.fcmSenderId) {
            if (typeof input.fcmSenderId !== 'string' || input.fcmSenderId.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SENDER_ID));
            }
        }
        if (input.fcmPushSet) {
            if (typeof input.fcmPushSet !== 'string' || input.fcmPushSet.length === 0) {
                return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_PUSH_SET));
            }
        }
        return Promise.resolve();
    };
    /**
     * Given a token, this method will look up the details in indexedDB.
     * @param {string} fcmToken
     * @return {Promise<Object>} The details associated with that token.
     */
    TokenDetailsModel.prototype.getTokenDetailsFromToken = function (fcmToken) {
        var _this = this;
        if (!fcmToken) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_TOKEN));
        }
        return this.validateInputs_({ fcmToken: fcmToken }).then(function () {
            return _this.openDatabase();
        }).then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var index = objectStore.index('fcmToken');
                var request = index.get(fcmToken);
                request.onerror = function (event) {
                    reject(event.target.error);
                };
                request.onsuccess = function (event) {
                    var result = event.target.result ? event.target.result : null;
                    resolve(result);
                };
            });
        });
    };
    /**
     * Given a service worker scope, this method will look up the details in
     * indexedDB.
     * @public
     * @param {string} swScope
     * @return {Promise<Object>} The details associated with that token.
     */
    TokenDetailsModel.prototype.getTokenDetailsFromSWScope = function (swScope) {
        var _this = this;
        if (!swScope) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SCOPE));
        }
        return this.validateInputs_({ swScope: swScope }).then(function () {
            return _this.openDatabase();
        }).then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var scopeRequest = objectStore.get(swScope);
                scopeRequest.onerror = function (event) {
                    reject(event.target.error);
                };
                scopeRequest.onsuccess = function (event) {
                    var result = event.target.result ? event.target.result : null;
                    resolve(result);
                };
            });
        });
    };
    /**
     * Save the details for the fcm token for re-use at a later date.
     * @param {{swScope: !string, vapidKey: !string,
     * subscription: !PushSubscription, fcmSenderId: !string, fcmToken: !string,
     * fcmPushSet: !string}} input A plain js object containing args to save.
     * @return {Promise<void>}
     */
    TokenDetailsModel.prototype.saveTokenDetails = function (_a) {
        var _this = this;
        var swScope = _a.swScope,
            vapidKey = _a.vapidKey,
            subscription = _a.subscription,
            fcmSenderId = _a.fcmSenderId,
            fcmToken = _a.fcmToken,
            fcmPushSet = _a.fcmPushSet;
        if (!swScope) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SCOPE));
        }
        if (!vapidKey) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_VAPID_KEY));
        }
        if (!subscription) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SUBSCRIPTION));
        }
        if (!fcmSenderId) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_SENDER_ID));
        }
        if (!fcmToken) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_TOKEN));
        }
        if (!fcmPushSet) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.BAD_PUSH_SET));
        }
        return this.validateInputs_({
            swScope: swScope,
            vapidKey: vapidKey,
            subscription: subscription,
            fcmSenderId: fcmSenderId,
            fcmToken: fcmToken,
            fcmPushSet: fcmPushSet
        }).then(function () {
            return _this.openDatabase();
        }).then(function (db) {
            /**
            * @dict
            */
            var details = {
                swScope: swScope,
                vapidKey: vapidKey,
                endpoint: subscription.endpoint,
                auth: (0, _arrayBufferToBase2.default)(subscription['getKey']('auth')),
                p256dh: (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh')),
                fcmSenderId: fcmSenderId,
                fcmToken: fcmToken,
                fcmPushSet: fcmPushSet
            };
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
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
     * This method deletes details of the current FCM token.
     * It's returning a promise in case we need to move to an async
     * method for deleting at a later date.
     * @param {string} token Token to be deleted
     * @return {Promise<Object>} Resolves once the FCM token details have been
     * deleted and returns the deleted details.
     */
    TokenDetailsModel.prototype.deleteToken = function (token) {
        var _this = this;
        if (typeof token !== 'string' || token.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors2.default.codes.INVALID_DELETE_TOKEN));
        }
        return this.getTokenDetailsFromToken(token).then(function (details) {
            if (!details) {
                throw _this.errorFactory_.create(_errors2.default.codes.DELETE_TOKEN_NOT_FOUND);
            }
            return _this.openDatabase().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], _this.TRANSACTION_READ_WRITE);
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var request = objectStore.delete(details['swScope']);
                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                    request.onsuccess = function (event) {
                        if (event.target.result === 0) {
                            reject(_this.errorFactory_.create(_errors2.default.codes.FAILED_TO_DELETE_TOKEN));
                            return;
                        }
                        resolve(details);
                    };
                });
            });
        });
    };
    return TokenDetailsModel;
}(_dbInterface2.default);
exports.default = TokenDetailsModel;
module.exports = exports['default'];
//# sourceMappingURL=token-details-model.js.map

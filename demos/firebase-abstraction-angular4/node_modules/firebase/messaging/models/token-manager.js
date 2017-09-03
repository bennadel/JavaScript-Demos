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

var _errors = require('../../app/errors');

var _errors2 = require('./errors');

var _errors3 = _interopRequireDefault(_errors2);

var _arrayBufferToBase = require('../helpers/array-buffer-to-base64');

var _arrayBufferToBase2 = _interopRequireDefault(_arrayBufferToBase);

var _fcmDetails = require('./fcm-details');

var _fcmDetails2 = _interopRequireDefault(_fcmDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FCM_TOKEN_DETAILS_DB = 'fcm_token_details_db';
var FCM_TOKEN_OBJ_STORE = 'fcm_token_object_Store';
var FCM_TOKEN_DETAILS_DB_VERSION = 1;
var TokenManager = function () {
    function TokenManager() {
        this.errorFactory_ = new _errors.ErrorFactory('messaging', 'Messaging', _errors3.default.map);
        this.openDbPromise_ = null;
    }
    /**
     * Get the indexedDB as a promsie.
     * @private
     * @return {Promise<IDBDatabase>} The IndexedDB database
     */
    TokenManager.prototype.openDatabase_ = function () {
        if (this.openDbPromise_) {
            return this.openDbPromise_;
        }
        this.openDbPromise_ = new Promise(function (resolve, reject) {
            var request = indexedDB.open(FCM_TOKEN_DETAILS_DB, FCM_TOKEN_DETAILS_DB_VERSION);
            request.onerror = function (event) {
                reject(event.target.error);
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
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
        });
        return this.openDbPromise_;
    };
    /**
     * Close the currently open database.
     * @return {Promise<?>} Returns the result of the promise chain.
     */
    TokenManager.prototype.closeDatabase = function () {
        var _this = this;
        if (this.openDbPromise_) {
            return this.openDbPromise_.then(function (db) {
                db.close();
                _this.openDbPromise_ = null;
            });
        }
        return Promise.resolve();
    };
    /**
     * Given a token, this method will look up the details in indexedDB.
     * @public
     * @param {string} fcmToken
     * @return {Promise<Object>} The details associated with that token.
     */
    TokenManager.prototype.getTokenDetailsFromToken = function (fcmToken) {
        return this.openDatabase_().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var index = objectStore.index('fcmToken');
                var request = index.get(fcmToken);
                request.onerror = function (event) {
                    reject(event.target.error);
                };
                request.onsuccess = function (event) {
                    resolve(event.target.result);
                };
            });
        });
    };
    TokenManager.prototype.getTokenDetailsFromSWScope_ = function (swScope) {
        return this.openDatabase_().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var scopeRequest = objectStore.get(swScope);
                scopeRequest.onerror = function (event) {
                    reject(event.target.error);
                };
                scopeRequest.onsuccess = function (event) {
                    resolve(event.target.result);
                };
            });
        });
    };
    TokenManager.prototype.getAllTokenDetailsForSenderId_ = function (senderId) {
        return this.openDatabase_().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE]);
                var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                var senderIdTokens = [];
                var cursorRequest = objectStore.openCursor();
                cursorRequest.onerror = function (event) {
                    reject(event.target.error);
                };
                cursorRequest.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        if (cursor.value['fcmSenderId'] === senderId) {
                            senderIdTokens.push(cursor.value);
                        }
                        cursor.continue();
                    } else {
                        resolve(senderIdTokens);
                    }
                };
            });
        });
    };
    /**
     * Given a PushSubscription and messagingSenderId, get an FCM token.
     * @public
     * @param  {string} senderId The 'messagingSenderId' to tie the token to.
     * @param  {PushSubscription} subscription The PushSusbcription to "federate".
     * @param  {string=} pushSet If defined this will swap the subscription for
     * matching FCM token.
     * @return {Promise<!Object>} Returns the FCM token to be used in place
     * of the PushSubscription.
     */
    TokenManager.prototype.subscribeToFCM = function (senderId, subscription, pushSet) {
        var _this = this;
        var p256dh = (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh'));
        var auth = (0, _arrayBufferToBase2.default)(subscription['getKey']('auth'));
        var fcmSubscribeBody = "authorized_entity=" + senderId + "&" + ("endpoint=" + subscription.endpoint + "&") + ("encryption_key=" + p256dh + "&") + ("encryption_auth=" + auth);
        if (pushSet) {
            fcmSubscribeBody += "&pushSet=" + pushSet;
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var subscribeOptions = {
            method: 'POST',
            headers: headers,
            body: fcmSubscribeBody
        };
        return fetch(_fcmDetails2.default.ENDPOINT + '/fcm/connect/subscribe', subscribeOptions).then(function (response) {
            return response.json();
        }).then(function (response) {
            var fcmTokenResponse = response;
            if (fcmTokenResponse['error']) {
                var message = fcmTokenResponse['error']['message'];
                throw _this.errorFactory_.create(_errors3.default.codes.TOKEN_SUBSCRIBE_FAILED, {
                    message: message
                });
            }
            if (!fcmTokenResponse['token']) {
                throw _this.errorFactory_.create(_errors3.default.codes.TOKEN_SUBSCRIBE_NO_TOKEN);
            }
            if (!fcmTokenResponse['pushSet']) {
                throw _this.errorFactory_.create(_errors3.default.codes.TOKEN_SUBSCRIBE_NO_PUSH_SET);
            }
            return {
                token: fcmTokenResponse['token'],
                pushSet: fcmTokenResponse['pushSet']
            };
        });
    };
    /**
     * Checks the that fields in the PushSubscription are equivalent to the
     * details stores in the masterTokenDetails.
     * @private
     * @param  {PushSubscription} subscription The push subscription we expect
     * the master token to match.
     * @param  {Object}  masterTokenDetails The saved details we wish to compare
     * with the PushSubscription
     * @return {boolean} true if the subscription and token details are
     * equivalent.
     */
    TokenManager.prototype.isSameSubscription_ = function (subscription, masterTokenDetails) {
        // getKey() isn't defined in the PushSubscription externs file, hence
        // subscription['getKey']('<key name>').
        return subscription.endpoint === masterTokenDetails['endpoint'] && (0, _arrayBufferToBase2.default)(subscription['getKey']('auth')) === masterTokenDetails['auth'] && (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh')) === masterTokenDetails['p256dh'];
    };
    /**
     * Save the details for the fcm token for re-use at a later date.
     * @private
     * @param  {string} senderId The 'messagingSenderId' used for this project
     * @param  {ServiceWorkerRegistration} swRegistration The service worker
     * used to subscribe the user for web push
     * @param  {PushSubscription} subscription The push subscription passed to
     * FCM for the current token.
     * @param  {string} fcmToken The FCM token currently used on this
     * device.
     * @param  {string} fcmPushSet The FCM push tied to the fcm token.
     * @return {Promise<void>}
     */
    TokenManager.prototype.saveTokenDetails_ = function (senderId, swRegistration, subscription, fcmToken, fcmPushSet) {
        var details = {
            swScope: swRegistration.scope,
            endpoint: subscription.endpoint,
            auth: (0, _arrayBufferToBase2.default)(subscription['getKey']('auth')),
            p256dh: (0, _arrayBufferToBase2.default)(subscription['getKey']('p256dh')),
            fcmToken: fcmToken,
            fcmPushSet: fcmPushSet,
            fcmSenderId: senderId
        };
        return this.openDatabase_().then(function (db) {
            return new Promise(function (resolve, reject) {
                var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], 'readwrite');
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
     * Returns the saved FCM Token if one is available and still valid,
     * otherwise `null` is returned.
     * @param {string} senderId This should be the sender ID associated with the
     * FCM Token being retrieved.
     * @param {ServiceWorkerRegistration} swRegistration Registration to be used
     * to subscribe the user to push.
     * @return {Promise<string> | Promise} Returns the saved FCM Token if
     * avilable and valid.
     * @export
     */
    TokenManager.prototype.getSavedToken = function (senderId, swRegistration) {
        var _this = this;
        if (!(swRegistration instanceof ServiceWorkerRegistration)) {
            return Promise.reject(this.errorFactory_.create(_errors3.default.codes.SW_REGISTRATION_EXPECTED));
        }
        if (typeof senderId !== 'string' || senderId.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors3.default.codes.BAD_SENDER_ID));
        }
        return this.getAllTokenDetailsForSenderId_(senderId).then(function (allTokenDetails) {
            if (allTokenDetails.length === 0) {
                return;
            }
            var index = allTokenDetails.findIndex(function (tokenDetails) {
                return swRegistration.scope === tokenDetails['swScope'] && senderId === tokenDetails['fcmSenderId'];
            });
            if (index === -1) {
                return;
            }
            return allTokenDetails[index];
        }).then(function (tokenDetails) {
            if (!tokenDetails) {
                return;
            }
            return swRegistration.pushManager.getSubscription().catch(function (err) {
                throw _this.errorFactory_.create(_errors3.default.codes.GET_SUBSCRIPTION_FAILED);
            }).then(function (subscription) {
                if (subscription && _this.isSameSubscription_(subscription, tokenDetails)) {
                    return tokenDetails['fcmToken'];
                }
            });
        });
    };
    /**
     * Creates a new FCM token.
     */
    TokenManager.prototype.createToken = function (senderId, swRegistration) {
        var _this = this;
        if (typeof senderId !== 'string' || senderId.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors3.default.codes.BAD_SENDER_ID));
        }
        if (!(swRegistration instanceof ServiceWorkerRegistration)) {
            return Promise.reject(this.errorFactory_.create(_errors3.default.codes.SW_REGISTRATION_EXPECTED));
        }
        // Check for existing subscription first
        var subscription;
        var fcmTokenDetails;
        return swRegistration.pushManager.getSubscription().then(function (subscription) {
            if (subscription) {
                return subscription;
            }
            return swRegistration.pushManager.subscribe(_fcmDetails2.default.SUBSCRIPTION_OPTIONS);
        }).then(function (sub) {
            subscription = sub;
            return _this.subscribeToFCM(senderId, subscription);
        }).then(function (tokenDetails) {
            fcmTokenDetails = tokenDetails;
            return _this.saveTokenDetails_(senderId, swRegistration, subscription, fcmTokenDetails['token'], fcmTokenDetails['pushSet']);
        }).then(function () {
            return fcmTokenDetails['token'];
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
    TokenManager.prototype.deleteToken = function (token) {
        var _this = this;
        if (typeof token !== 'string' || token.length === 0) {
            return Promise.reject(this.errorFactory_.create(_errors3.default.codes.INVALID_DELETE_TOKEN));
        }
        return this.getTokenDetailsFromToken(token).then(function (details) {
            if (!details) {
                throw _this.errorFactory_.create(_errors3.default.codes.DELETE_TOKEN_NOT_FOUND);
            }
            return _this.openDatabase_().then(function (db) {
                return new Promise(function (resolve, reject) {
                    var transaction = db.transaction([FCM_TOKEN_OBJ_STORE], 'readwrite');
                    var objectStore = transaction.objectStore(FCM_TOKEN_OBJ_STORE);
                    var request = objectStore.delete(details['swScope']);
                    request.onerror = function (event) {
                        reject(event.target.error);
                    };
                    request.onsuccess = function (event) {
                        if (event.target.result === 0) {
                            reject(_this.errorFactory_.create(_errors3.default.codes.FAILED_TO_DELETE_TOKEN));
                            return;
                        }
                        resolve(details);
                    };
                });
            });
        });
    };
    return TokenManager;
}();
exports.default = TokenManager;
module.exports = exports['default'];
//# sourceMappingURL=token-manager.js.map

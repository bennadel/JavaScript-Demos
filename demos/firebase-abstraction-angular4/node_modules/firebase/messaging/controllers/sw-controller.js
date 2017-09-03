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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _controllerInterface = require('./controller-interface');

var _controllerInterface2 = _interopRequireDefault(_controllerInterface);

var _errors = require('../models/errors');

var _errors2 = _interopRequireDefault(_errors);

var _workerPageMessage = require('../models/worker-page-message');

var _workerPageMessage2 = _interopRequireDefault(_workerPageMessage);

var _fcmDetails = require('../models/fcm-details');

var _fcmDetails2 = _interopRequireDefault(_fcmDetails);

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

var FCM_MSG = 'FCM_MSG';
var SWController = function (_super) {
    __extends(SWController, _super);
    function SWController(app) {
        var _this = _super.call(this, app) || this;
        self.addEventListener('push', function (e) {
            return _this.onPush_(e);
        }, false);
        self.addEventListener('pushsubscriptionchange', function (e) {
            return _this.onSubChange_(e);
        }, false);
        self.addEventListener('notificationclick', function (e) {
            return _this.onNotificationClick_(e);
        }, false);
        /**
         * @private
         * @type {function(Object)|null}
         */
        _this.bgMessageHandler_ = null;
        return _this;
    }
    /**
    * A handler for push events that shows notifications based on the content of
    * the payload.
    *
    * The payload must be a JSON-encoded Object with a `notification` key. The
    * value of the `notification` property will be used as the NotificationOptions
    * object passed to showNotification. Additionally, the `title` property of the
    * notification object will be used as the title.
    *
    * If there is no notification data in the payload then no notification will be
    * shown.
    * @private
    */
    SWController.prototype.onPush_ = function (event) {
        var _this = this;
        var msgPayload;
        try {
            msgPayload = event.data.json();
        } catch (err) {
            // Not JSON so not an FCM message
            return;
        }
        var handleMsgPromise = this.hasVisibleClients_().then(function (hasVisibleClients) {
            if (hasVisibleClients) {
                // Do not need to show a notification.
                if (msgPayload.notification || _this.bgMessageHandler_) {
                    // Send to page
                    return _this.sendMessageToWindowClients_(msgPayload);
                }
                return;
            }
            var notificationDetails = _this.getNotificationData_(msgPayload);
            if (notificationDetails) {
                var notificationTitle = notificationDetails.title || '';
                return self.registration.showNotification(notificationTitle, notificationDetails);
            } else if (_this.bgMessageHandler_) {
                return _this.bgMessageHandler_(msgPayload);
            }
        });
        event.waitUntil(handleMsgPromise);
    };
    /**
    * @private
    */
    SWController.prototype.onSubChange_ = function (event) {
        var _this = this;
        var promiseChain = this.getToken().then(function (token) {
            if (!token) {
                // We can't resubscribe if we don't have an FCM token for this scope.
                throw _this.errorFactory_.create(_errors2.default.codes.NO_FCM_TOKEN_FOR_RESUBSCRIBE);
            }
            var tokenDetails = null;
            var tokenManager = _this.getTokenManager();
            return tokenManager.getTokenDetailsFromToken(token).then(function (details) {
                tokenDetails = details;
                if (!tokenDetails) {
                    throw _this.errorFactory_.create(_errors2.default.codes.INVALID_SAVED_TOKEN);
                }
                // Attempt to get a new subscription
                return self.registration.pushManager.subscribe(_fcmDetails2.default.SUBSCRIPTION_OPTIONS);
            }).then(function (newSubscription) {
                // Send new subscription to FCM.
                return tokenManager.subscribeToFCM(tokenDetails.fcmSenderId, newSubscription, tokenDetails.fcmPushSet);
            }).catch(function (err) {
                // The best thing we can do is log this to the terminal so
                // developers might notice the error.
                return tokenManager.deleteToken(tokenDetails.fcmToken).then(function () {
                    throw _this.errorFactory_.create(_errors2.default.codes.UNABLE_TO_RESUBSCRIBE, {
                        message: err
                    });
                });
            });
        });
        event.waitUntil(promiseChain);
    };
    /**
    * @private
    */
    SWController.prototype.onNotificationClick_ = function (event) {
        var _this = this;
        if (!(event.notification && event.notification.data && event.notification.data[FCM_MSG])) {
            // Not an FCM notification, do nothing.
            return;
        }
        // Prevent other listeners from receiving the event
        event.stopImmediatePropagation();
        event.notification.close();
        var msgPayload = event.notification.data[FCM_MSG];
        var clickAction = msgPayload['notification']['click_action'];
        if (!clickAction) {
            // Nothing to do.
            return;
        }
        var promiseChain = this.getWindowClient_(clickAction).then(function (windowClient) {
            if (!windowClient) {
                // Unable to find window client so need to open one.
                return self.clients.openWindow(clickAction);
            }
            return windowClient;
        }).then(function (windowClient) {
            if (!windowClient) {
                // Window Client will not be returned if it's for a third party origin.
                return;
            }
            // Delete notification data from payload before sending to the page.
            var notificationData = msgPayload['notification'];
            delete msgPayload['notification'];
            var internalMsg = _workerPageMessage2.default.createNewMsg(_workerPageMessage2.default.TYPES_OF_MSG.NOTIFICATION_CLICKED, msgPayload);
            // Attempt to send a message to the client to handle the data
            // Is affected by: https://github.com/slightlyoff/ServiceWorker/issues/728
            return _this.attemptToMessageClient_(windowClient, internalMsg);
        });
        event.waitUntil(promiseChain);
    };
    /**
     * @private
     * @param {Object} msgPayload
     * @return {NotificationOptions|undefined}
     */
    SWController.prototype.getNotificationData_ = function (msgPayload) {
        if (!msgPayload) {
            return;
        }
        if (_typeof(msgPayload.notification) !== 'object') {
            return;
        }
        var notificationInformation = Object.assign({}, msgPayload.notification);
        // Put the message payload under FCM_MSG name so we can identify the
        // notification as being an FCM notification vs a notification from
        // somewhere else (i.e. normal web push or developer generated
        // notification).
        notificationInformation['data'] = (_a = {}, _a[FCM_MSG] = msgPayload, _a);
        return notificationInformation;
        var _a;
    };
    /**
     * Calling setBackgroundMessageHandler will opt in to some specific
     * behaviours.
     * 1.) If a notification doesn't need to be shown due to a window already
     * being visible, then push messages will be sent to the page.
     * 2.) If a notification needs to be shown, and the message contains no
     * notification data this method will be called
     * and the promise it returns will be passed to event.waitUntil.
     * If you do not set this callback then all push messages will let and the
     * developer can handle them in a their own 'push' event callback
     * @export
     * @param {function(Object)} callback The callback to be called when a push
     * message is received and a notification must be shown. The callback will
     * be given the data from the push message.
     */
    SWController.prototype.setBackgroundMessageHandler = function (callback) {
        if (callback && typeof callback !== 'function') {
            throw this.errorFactory_.create(_errors2.default.codes.BG_HANDLER_FUNCTION_EXPECTED);
        }
        this.bgMessageHandler_ = callback;
    };
    /**
     * @private
     * @param {string} url The URL to look for when focusing a client.
     * @return {Object} Returns an existing window client or a newly opened
     * WindowClient.
     */
    SWController.prototype.getWindowClient_ = function (url) {
        // Use URL to normalize the URL when comparing to windowClients.
        // This at least handles whether to include trailing slashes or not
        var parsedURL = new URL(url).href;
        return self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {
            var suitableClient = null;
            for (var i = 0; i < clientList.length; i++) {
                var parsedClientUrl = new URL(clientList[i].url).href;
                if (parsedClientUrl === parsedURL) {
                    suitableClient = clientList[i];
                    break;
                }
            }
            if (suitableClient) {
                suitableClient.focus();
                return suitableClient;
            }
        });
    };
    /**
     * This message will attempt to send the message to a window client.
     * @private
     * @param {Object} client The WindowClient to send the message to.
     * @param {Object} message The message to send to the client.
     * @returns {Promise} Returns a promise that resolves after sending the
     * message. This does not guarantee that the message was successfully
     * received.
     */
    SWController.prototype.attemptToMessageClient_ = function (client, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!client) {
                return reject(_this.errorFactory_.create(_errors2.default.codes.NO_WINDOW_CLIENT_TO_MSG));
            }
            client.postMessage(message);
            resolve();
        });
    };
    /**
     * @private
     * @returns {Promise<boolean>} If there is currently a visible WindowClient,
     * this method will resolve to true, otherwise false.
     */
    SWController.prototype.hasVisibleClients_ = function () {
        return self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {
            return clientList.some(function (client) {
                return client.visibilityState === 'visible';
            });
        });
    };
    /**
     * @private
     * @param {Object} msgPayload The data from the push event that should be sent
     * to all available pages.
     * @returns {Promise} Returns a promise that resolves once the message
     * has been sent to all WindowClients.
     */
    SWController.prototype.sendMessageToWindowClients_ = function (msgPayload) {
        var _this = this;
        return self.clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {
            var internalMsg = _workerPageMessage2.default.createNewMsg(_workerPageMessage2.default.TYPES_OF_MSG.PUSH_MSG_RECEIVED, msgPayload);
            return Promise.all(clientList.map(function (client) {
                return _this.attemptToMessageClient_(client, internalMsg);
            }));
        });
    };
    /**
     * This will register the default service worker and return the registration.
     * @private
     * @return {Promise<!ServiceWorkerRegistration>} The service worker
     * registration to be used for the push service.
     */
    SWController.prototype.getSWRegistration_ = function () {
        return Promise.resolve(self.registration);
    };
    return SWController;
}(_controllerInterface2.default);
exports.default = SWController;
module.exports = exports['default'];
//# sourceMappingURL=sw-controller.js.map

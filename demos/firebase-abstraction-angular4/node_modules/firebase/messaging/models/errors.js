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
var CODES = {
    AVAILABLE_IN_WINDOW: 'only-available-in-window',
    AVAILABLE_IN_SW: 'only-available-in-sw',
    SHOULD_BE_INHERITED: 'should-be-overriden',
    BAD_SENDER_ID: 'bad-sender-id',
    INCORRECT_GCM_SENDER_ID: 'incorrect-gcm-sender-id',
    PERMISSION_DEFAULT: 'permission-default',
    PERMISSION_BLOCKED: 'permission-blocked',
    UNSUPPORTED_BROWSER: 'unsupported-browser',
    NOTIFICATIONS_BLOCKED: 'notifications-blocked',
    FAILED_DEFAULT_REGISTRATION: 'failed-serviceworker-registration',
    SW_REGISTRATION_EXPECTED: 'sw-registration-expected',
    GET_SUBSCRIPTION_FAILED: 'get-subscription-failed',
    INVALID_SAVED_TOKEN: 'invalid-saved-token',
    SW_REG_REDUNDANT: 'sw-reg-redundant',
    TOKEN_SUBSCRIBE_FAILED: 'token-subscribe-failed',
    TOKEN_SUBSCRIBE_NO_TOKEN: 'token-subscribe-no-token',
    TOKEN_SUBSCRIBE_NO_PUSH_SET: 'token-subscribe-no-push-set',
    USE_SW_BEFORE_GET_TOKEN: 'use-sw-before-get-token',
    INVALID_DELETE_TOKEN: 'invalid-delete-token',
    DELETE_TOKEN_NOT_FOUND: 'delete-token-not-found',
    DELETE_SCOPE_NOT_FOUND: 'delete-scope-not-found',
    BG_HANDLER_FUNCTION_EXPECTED: 'bg-handler-function-expected',
    NO_WINDOW_CLIENT_TO_MSG: 'no-window-client-to-msg',
    UNABLE_TO_RESUBSCRIBE: 'unable-to-resubscribe',
    NO_FCM_TOKEN_FOR_RESUBSCRIBE: 'no-fcm-token-for-resubscribe',
    FAILED_TO_DELETE_TOKEN: 'failed-to-delete-token',
    NO_SW_IN_REG: 'no-sw-in-reg',
    BAD_SCOPE: 'bad-scope',
    BAD_VAPID_KEY: 'bad-vapid-key',
    BAD_SUBSCRIPTION: 'bad-subscription',
    BAD_TOKEN: 'bad-token',
    BAD_PUSH_SET: 'bad-push-set',
    FAILED_DELETE_VAPID_KEY: 'failed-delete-vapid-key'
};
var ERROR_MAP = (_a = {}, _a[CODES.AVAILABLE_IN_WINDOW] = 'This method is available in a Window context.', _a[CODES.AVAILABLE_IN_SW] = 'This method is available in a service worker ' + 'context.', _a[CODES.SHOULD_BE_INHERITED] = 'This method should be overriden by ' + 'extended classes.', _a[CODES.BAD_SENDER_ID] = "Please ensure that 'messagingSenderId' is set " + 'correctly in the options passed into firebase.initializeApp().', _a[CODES.PERMISSION_DEFAULT] = 'The required permissions were not granted and ' + 'dismissed instead.', _a[CODES.PERMISSION_BLOCKED] = 'The required permissions were not granted and ' + 'blocked instead.', _a[CODES.UNSUPPORTED_BROWSER] = "This browser doesn't support the API's " + 'required to use the firebase SDK.', _a[CODES.NOTIFICATIONS_BLOCKED] = 'Notifications have been blocked.', _a[CODES.FAILED_DEFAULT_REGISTRATION] = 'We are unable to register the ' + 'default service worker. {$browserErrorMessage}', _a[CODES.SW_REGISTRATION_EXPECTED] = 'A service worker registration was the ' + 'expected input.', _a[CODES.GET_SUBSCRIPTION_FAILED] = 'There was an error when trying to get ' + 'any existing Push Subscriptions.', _a[CODES.INVALID_SAVED_TOKEN] = 'Unable to access details of the saved token.', _a[CODES.SW_REG_REDUNDANT] = 'The service worker being used for push was made ' + 'redundant.', _a[CODES.TOKEN_SUBSCRIBE_FAILED] = 'A problem occured while subscribing the ' + 'user to FCM: {$message}', _a[CODES.TOKEN_SUBSCRIBE_NO_TOKEN] = 'FCM returned no token when subscribing ' + 'the user to push.', _a[CODES.TOKEN_SUBSCRIBE_NO_PUSH_SET] = 'FCM returned an invalid response ' + 'when getting an FCM token.', _a[CODES.USE_SW_BEFORE_GET_TOKEN] = 'You must call useServiceWorker() before ' + 'calling getToken() to ensure your service worker is used.', _a[CODES.INVALID_DELETE_TOKEN] = 'You must pass a valid token into ' + 'deleteToken(), i.e. the token from getToken().', _a[CODES.DELETE_TOKEN_NOT_FOUND] = 'The deletion attempt for token could not ' + 'be performed as the token was not found.', _a[CODES.DELETE_SCOPE_NOT_FOUND] = 'The deletion attempt for service worker ' + 'scope could not be performed as the scope was not found.', _a[CODES.BG_HANDLER_FUNCTION_EXPECTED] = 'The input to ' + 'setBackgroundMessageHandler() must be a function.', _a[CODES.NO_WINDOW_CLIENT_TO_MSG] = 'An attempt was made to message a ' + 'non-existant window client.', _a[CODES.UNABLE_TO_RESUBSCRIBE] = 'There was an error while re-subscribing ' + 'the FCM token for push messaging. Will have to resubscribe the ' + 'user on next visit. {$message}', _a[CODES.NO_FCM_TOKEN_FOR_RESUBSCRIBE] = 'Could not find an FCM token ' + 'and as a result, unable to resubscribe. Will have to resubscribe the ' + 'user on next visit.', _a[CODES.FAILED_TO_DELETE_TOKEN] = 'Unable to delete the currently saved token.', _a[CODES.NO_SW_IN_REG] = 'Even though the service worker registration was ' + 'successful, there was a problem accessing the service worker itself.', _a[CODES.INCORRECT_GCM_SENDER_ID] = "Please change your web app manifest's " + "'gcm_sender_id' value to '103953800507' to use Firebase messaging.", _a[CODES.BAD_SCOPE] = 'The service worker scope must be a string with at ' + 'least one character.', _a[CODES.BAD_VAPID_KEY] = 'The public VAPID key must be a string with at ' + 'least one character.', _a[CODES.BAD_SUBSCRIPTION] = 'The subscription must be a valid ' + 'PushSubscription.', _a[CODES.BAD_TOKEN] = 'The FCM Token used for storage / lookup was not ' + 'a valid token string.', _a[CODES.BAD_PUSH_SET] = 'The FCM push set used for storage / lookup was not ' + 'not a valid push set string.', _a[CODES.FAILED_DELETE_VAPID_KEY] = 'The VAPID key could not be deleted.', _a);
exports.default = {
    codes: CODES,
    map: ERROR_MAP
};

var _a;
module.exports = exports['default'];
//# sourceMappingURL=errors.js.map

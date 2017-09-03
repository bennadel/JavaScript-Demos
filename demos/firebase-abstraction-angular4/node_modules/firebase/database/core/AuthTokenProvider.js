/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthTokenProvider = undefined;

var _util = require('./util/util');

/**
 * Abstraction around FirebaseApp's token fetching capabilities.
 */
var AuthTokenProvider = function () {
    /**
     * @param {!FirebaseApp} app_
     */
    function AuthTokenProvider(app_) {
        this.app_ = app_;
    }
    /**
     * @param {boolean} forceRefresh
     * @return {!Promise<FirebaseAuthTokenData>}
     */
    AuthTokenProvider.prototype.getToken = function (forceRefresh) {
        return this.app_['INTERNAL']['getToken'](forceRefresh).then(null,
        // .catch
        function (error) {
            // TODO: Need to figure out all the cases this is raised and whether
            // this makes sense.
            if (error && error.code === 'auth/token-not-initialized') {
                (0, _util.log)('Got auth/token-not-initialized error.  Treating as null token.');
                return null;
            } else {
                return Promise.reject(error);
            }
        });
    };
    AuthTokenProvider.prototype.addTokenChangeListener = function (listener) {
        // TODO: We might want to wrap the listener and call it with no args to
        // avoid a leaky abstraction, but that makes removing the listener harder.
        this.app_['INTERNAL']['addAuthTokenListener'](listener);
    };
    AuthTokenProvider.prototype.removeTokenChangeListener = function (listener) {
        this.app_['INTERNAL']['removeAuthTokenListener'](listener);
    };
    AuthTokenProvider.prototype.notifyForInvalidToken = function () {
        var errorMessage = 'Provided authentication credentials for the app named "' + this.app_.name + '" are invalid. This usually indicates your app was not ' + 'initialized correctly. ';
        if ('credential' in this.app_.options) {
            errorMessage += 'Make sure the "credential" property provided to initializeApp() ' + 'is authorized to access the specified "databaseURL" and is from the correct ' + 'project.';
        } else if ('serviceAccount' in this.app_.options) {
            errorMessage += 'Make sure the "serviceAccount" property provided to initializeApp() ' + 'is authorized to access the specified "databaseURL" and is from the correct ' + 'project.';
        } else {
            errorMessage += 'Make sure the "apiKey" and "databaseURL" properties provided to ' + 'initializeApp() match the values provided for your app at ' + 'https://console.firebase.google.com/.';
        }
        (0, _util.warn)(errorMessage);
    };
    return AuthTokenProvider;
}(); /**
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
exports.AuthTokenProvider = AuthTokenProvider;
//# sourceMappingURL=AuthTokenProvider.js.map

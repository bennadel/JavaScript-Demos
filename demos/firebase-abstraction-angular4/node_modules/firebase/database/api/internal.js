/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.interceptServerData = exports.dataUpdateCount = exports.statsIncrementCounter = exports.stats = exports.setSecurityDebugCallback = exports.isWebSocketsAvailable = exports.forceWebSockets = exports.forceLongPolling = undefined;

var _WebSocketConnection = require('../realtime/WebSocketConnection');

var _BrowserPollConnection = require('../realtime/BrowserPollConnection');

/**
 * INTERNAL methods for internal-use only (tests, etc.).
 *
 * Customers shouldn't use these or else should be aware that they could break at any time.
 *
 * @const
 */
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
var forceLongPolling = exports.forceLongPolling = function forceLongPolling() {
    _WebSocketConnection.WebSocketConnection.forceDisallow();
    _BrowserPollConnection.BrowserPollConnection.forceAllow();
};
var forceWebSockets = exports.forceWebSockets = function forceWebSockets() {
    _BrowserPollConnection.BrowserPollConnection.forceDisallow();
};
/* Used by App Manager */
var isWebSocketsAvailable = exports.isWebSocketsAvailable = function isWebSocketsAvailable() {
    return _WebSocketConnection.WebSocketConnection['isAvailable']();
};
var setSecurityDebugCallback = exports.setSecurityDebugCallback = function setSecurityDebugCallback(ref, callback) {
    ref.repo.persistentConnection_.securityDebugCallback_ = callback;
};
var stats = exports.stats = function stats(ref, showDelta) {
    ref.repo.stats(showDelta);
};
var statsIncrementCounter = exports.statsIncrementCounter = function statsIncrementCounter(ref, metric) {
    ref.repo.statsIncrementCounter(metric);
};
var dataUpdateCount = exports.dataUpdateCount = function dataUpdateCount(ref) {
    return ref.repo.dataUpdateCount;
};
var interceptServerData = exports.interceptServerData = function interceptServerData(ref, callback) {
    return ref.repo.interceptServerData_(callback);
};
//# sourceMappingURL=internal.js.map

/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
/**
 * Interface defining the set of actions that can be performed against the Firebase server
 * (basically corresponds to our wire protocol).
 *
 * @interface
 */
var ServerActions = function () {
  function ServerActions() {}
  /**
   * @param {string} pathString
   * @param {*} data
   * @param {function(string, string)=} onComplete
   * @param {string=} hash
   */
  ServerActions.prototype.put = function (pathString, data, onComplete, hash) {};
  /**
   * @param {string} pathString
   * @param {*} data
   * @param {function(string, ?string)} onComplete
   * @param {string=} hash
   */
  ServerActions.prototype.merge = function (pathString, data, onComplete, hash) {};
  /**
   * Refreshes the auth token for the current connection.
   * @param {string} token The authentication token
   */
  ServerActions.prototype.refreshAuthToken = function (token) {};
  /**
   * @param {string} pathString
   * @param {*} data
   * @param {function(string, string)=} onComplete
   */
  ServerActions.prototype.onDisconnectPut = function (pathString, data, onComplete) {};
  /**
   * @param {string} pathString
   * @param {*} data
   * @param {function(string, string)=} onComplete
   */
  ServerActions.prototype.onDisconnectMerge = function (pathString, data, onComplete) {};
  /**
   * @param {string} pathString
   * @param {function(string, string)=} onComplete
   */
  ServerActions.prototype.onDisconnectCancel = function (pathString, onComplete) {};
  /**
   * @param {Object.<string, *>} stats
   */
  ServerActions.prototype.reportStats = function (stats) {};
  return ServerActions;
}();
exports.ServerActions = ServerActions;
//# sourceMappingURL=ServerActions.js.map

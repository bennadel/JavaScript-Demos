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
var Transport = function () {
  /**
   *
   * @param {string} connId An identifier for this connection, used for logging
   * @param {RepoInfo} repoInfo The info for the endpoint to send data to.
   * @param {string=} transportSessionId Optional transportSessionId if this is connecting to an existing transport session
   * @param {string=} lastSessionId Optional lastSessionId if there was a previous connection
   * @interface
   */
  function Transport(connId, repoInfo, transportSessionId, lastSessionId) {}
  return Transport;
}();
exports.Transport = Transport;
//# sourceMappingURL=Transport.js.map

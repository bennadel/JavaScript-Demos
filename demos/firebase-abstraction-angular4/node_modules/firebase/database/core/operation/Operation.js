/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationSource = exports.OperationType = undefined;

var _assert = require("../../../utils/assert");

/**
 *
 * @enum
 */
var OperationType = exports.OperationType = undefined; /**
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

(function (OperationType) {
  OperationType[OperationType["OVERWRITE"] = 0] = "OVERWRITE";
  OperationType[OperationType["MERGE"] = 1] = "MERGE";
  OperationType[OperationType["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
  OperationType[OperationType["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
})(OperationType || (exports.OperationType = OperationType = {}));
/**
 * @param {boolean} fromUser
 * @param {boolean} fromServer
 * @param {?string} queryId
 * @param {boolean} tagged
 * @constructor
 */
var OperationSource = function () {
  function OperationSource(fromUser, fromServer, queryId, tagged) {
    this.fromUser = fromUser;
    this.fromServer = fromServer;
    this.queryId = queryId;
    this.tagged = tagged;
    (0, _assert.assert)(!tagged || fromServer, 'Tagged queries must be from server.');
  }
  /**
   * @const
   * @type {!OperationSource}
   */
  OperationSource.User = new OperationSource(
  /*fromUser=*/true, false, null,
  /*tagged=*/false);
  /**
   * @const
   * @type {!OperationSource}
   */
  OperationSource.Server = new OperationSource(false,
  /*fromServer=*/true, null,
  /*tagged=*/false);
  /**
   * @param {string} queryId
   * @return {!OperationSource}
   */
  OperationSource.forServerTaggedQuery = function (queryId) {
    return new OperationSource(false,
    /*fromServer=*/true, queryId,
    /*tagged=*/true);
  };
  return OperationSource;
}();
exports.OperationSource = OperationSource;
//# sourceMappingURL=Operation.js.map

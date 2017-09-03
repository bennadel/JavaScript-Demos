/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AckUserWrite = undefined;

var _assert = require('../../../utils/assert');

var _Path = require('../util/Path');

var _Operation = require('./Operation');

var AckUserWrite = function () {
    /**
     *
     * @param {!Path} path
     * @param {!ImmutableTree<!boolean>} affectedTree A tree containing true for each affected path. Affected paths can't overlap.
     * @param {!boolean} revert
     */
    function AckUserWrite(
    /**@inheritDoc */path,
    /**@inheritDoc */affectedTree,
    /**@inheritDoc */revert) {
        this.path = path;
        this.affectedTree = affectedTree;
        this.revert = revert;
        /** @inheritDoc */
        this.type = _Operation.OperationType.ACK_USER_WRITE;
        /** @inheritDoc */
        this.source = _Operation.OperationSource.User;
    }
    /**
     * @inheritDoc
     */
    AckUserWrite.prototype.operationForChild = function (childName) {
        if (!this.path.isEmpty()) {
            (0, _assert.assert)(this.path.getFront() === childName, 'operationForChild called for unrelated child.');
            return new AckUserWrite(this.path.popFront(), this.affectedTree, this.revert);
        } else if (this.affectedTree.value != null) {
            (0, _assert.assert)(this.affectedTree.children.isEmpty(), 'affectedTree should not have overlapping affected paths.');
            // All child locations are affected as well; just return same operation.
            return this;
        } else {
            var childTree = this.affectedTree.subtree(new _Path.Path(childName));
            return new AckUserWrite(_Path.Path.Empty, childTree, this.revert);
        }
    };
    return AckUserWrite;
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
exports.AckUserWrite = AckUserWrite;
//# sourceMappingURL=AckUserWrite.js.map

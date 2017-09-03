/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Merge = undefined;

var _Operation = require('./Operation');

var _Overwrite = require('./Overwrite');

var _Path = require('../util/Path');

var _assert = require('../../../utils/assert');

/**
 * @param {!OperationSource} source
 * @param {!Path} path
 * @param {!ImmutableTree.<!Node>} children
 * @constructor
 * @implements {Operation}
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
var Merge = function () {
    function Merge(
    /**@inheritDoc */source,
    /**@inheritDoc */path,
    /**@inheritDoc */children) {
        this.source = source;
        this.path = path;
        this.children = children;
        /** @inheritDoc */
        this.type = _Operation.OperationType.MERGE;
    }
    /**
     * @inheritDoc
     */
    Merge.prototype.operationForChild = function (childName) {
        if (this.path.isEmpty()) {
            var childTree = this.children.subtree(new _Path.Path(childName));
            if (childTree.isEmpty()) {
                // This child is unaffected
                return null;
            } else if (childTree.value) {
                // We have a snapshot for the child in question.  This becomes an overwrite of the child.
                return new _Overwrite.Overwrite(this.source, _Path.Path.Empty, childTree.value);
            } else {
                // This is a merge at a deeper level
                return new Merge(this.source, _Path.Path.Empty, childTree);
            }
        } else {
            (0, _assert.assert)(this.path.getFront() === childName, "Can't get a merge for a child not on the path of the operation");
            return new Merge(this.source, this.path.popFront(), this.children);
        }
    };
    /**
     * @inheritDoc
     */
    Merge.prototype.toString = function () {
        return 'Operation(' + this.path + ': ' + this.source.toString() + ' merge: ' + this.children.toString() + ')';
    };
    return Merge;
}();
exports.Merge = Merge;
//# sourceMappingURL=Merge.js.map

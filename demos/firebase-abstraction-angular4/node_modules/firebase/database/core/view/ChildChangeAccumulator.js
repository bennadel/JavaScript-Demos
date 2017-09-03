/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChildChangeAccumulator = undefined;

var _obj = require('../../../utils/obj');

var _Change = require('./Change');

var _assert = require('../../../utils/assert');

/**
 * @constructor
 */
var ChildChangeAccumulator = function () {
    function ChildChangeAccumulator() {
        this.changeMap_ = {};
    }
    /**
     * @param {!Change} change
     */
    ChildChangeAccumulator.prototype.trackChildChange = function (change) {
        var type = change.type;
        var childKey /** @type {!string} */ = change.childName;
        (0, _assert.assert)(type == _Change.Change.CHILD_ADDED || type == _Change.Change.CHILD_CHANGED || type == _Change.Change.CHILD_REMOVED, 'Only child changes supported for tracking');
        (0, _assert.assert)(childKey !== '.priority', 'Only non-priority child changes can be tracked.');
        var oldChange = (0, _obj.safeGet)(this.changeMap_, childKey);
        if (oldChange) {
            var oldType = oldChange.type;
            if (type == _Change.Change.CHILD_ADDED && oldType == _Change.Change.CHILD_REMOVED) {
                this.changeMap_[childKey] = _Change.Change.childChangedChange(childKey, change.snapshotNode, oldChange.snapshotNode);
            } else if (type == _Change.Change.CHILD_REMOVED && oldType == _Change.Change.CHILD_ADDED) {
                delete this.changeMap_[childKey];
            } else if (type == _Change.Change.CHILD_REMOVED && oldType == _Change.Change.CHILD_CHANGED) {
                this.changeMap_[childKey] = _Change.Change.childRemovedChange(childKey, oldChange.oldSnap);
            } else if (type == _Change.Change.CHILD_CHANGED && oldType == _Change.Change.CHILD_ADDED) {
                this.changeMap_[childKey] = _Change.Change.childAddedChange(childKey, change.snapshotNode);
            } else if (type == _Change.Change.CHILD_CHANGED && oldType == _Change.Change.CHILD_CHANGED) {
                this.changeMap_[childKey] = _Change.Change.childChangedChange(childKey, change.snapshotNode, oldChange.oldSnap);
            } else {
                throw (0, _assert.assertionError)('Illegal combination of changes: ' + change + ' occurred after ' + oldChange);
            }
        } else {
            this.changeMap_[childKey] = change;
        }
    };
    /**
     * @return {!Array.<!Change>}
     */
    ChildChangeAccumulator.prototype.getChanges = function () {
        return (0, _obj.getValues)(this.changeMap_);
    };
    return ChildChangeAccumulator;
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
exports.ChildChangeAccumulator = ChildChangeAccumulator;
//# sourceMappingURL=ChildChangeAccumulator.js.map

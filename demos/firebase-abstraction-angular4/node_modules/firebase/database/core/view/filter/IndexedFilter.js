/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IndexedFilter = undefined;

var _assert = require('../../../../utils/assert');

var _Change = require('../Change');

var _ChildrenNode = require('../../snap/ChildrenNode');

var _PriorityIndex = require('../../snap/indexes/PriorityIndex');

/**
 * Doesn't really filter nodes but applies an index to the node and keeps track of any changes
 *
 * @constructor
 * @implements {NodeFilter}
 * @param {!Index} index
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
var IndexedFilter = function () {
    function IndexedFilter(index_) {
        this.index_ = index_;
    }
    IndexedFilter.prototype.updateChild = function (snap, key, newChild, affectedPath, source, optChangeAccumulator) {
        (0, _assert.assert)(snap.isIndexed(this.index_), 'A node must be indexed if only a child is updated');
        var oldChild = snap.getImmediateChild(key);
        // Check if anything actually changed.
        if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
            // There's an edge case where a child can enter or leave the view because affectedPath was set to null.
            // In this case, affectedPath will appear null in both the old and new snapshots.  So we need
            // to avoid treating these cases as "nothing changed."
            if (oldChild.isEmpty() == newChild.isEmpty()) {
                // Nothing changed.
                // This assert should be valid, but it's expensive (can dominate perf testing) so don't actually do it.
                //assert(oldChild.equals(newChild), 'Old and new snapshots should be equal.');
                return snap;
            }
        }
        if (optChangeAccumulator != null) {
            if (newChild.isEmpty()) {
                if (snap.hasChild(key)) {
                    optChangeAccumulator.trackChildChange(_Change.Change.childRemovedChange(key, oldChild));
                } else {
                    (0, _assert.assert)(snap.isLeafNode(), 'A child remove without an old child only makes sense on a leaf node');
                }
            } else if (oldChild.isEmpty()) {
                optChangeAccumulator.trackChildChange(_Change.Change.childAddedChange(key, newChild));
            } else {
                optChangeAccumulator.trackChildChange(_Change.Change.childChangedChange(key, newChild, oldChild));
            }
        }
        if (snap.isLeafNode() && newChild.isEmpty()) {
            return snap;
        } else {
            // Make sure the node is indexed
            return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
        }
    };
    /**
     * @inheritDoc
     */
    IndexedFilter.prototype.updateFullNode = function (oldSnap, newSnap, optChangeAccumulator) {
        if (optChangeAccumulator != null) {
            if (!oldSnap.isLeafNode()) {
                oldSnap.forEachChild(_PriorityIndex.PRIORITY_INDEX, function (key, childNode) {
                    if (!newSnap.hasChild(key)) {
                        optChangeAccumulator.trackChildChange(_Change.Change.childRemovedChange(key, childNode));
                    }
                });
            }
            if (!newSnap.isLeafNode()) {
                newSnap.forEachChild(_PriorityIndex.PRIORITY_INDEX, function (key, childNode) {
                    if (oldSnap.hasChild(key)) {
                        var oldChild = oldSnap.getImmediateChild(key);
                        if (!oldChild.equals(childNode)) {
                            optChangeAccumulator.trackChildChange(_Change.Change.childChangedChange(key, childNode, oldChild));
                        }
                    } else {
                        optChangeAccumulator.trackChildChange(_Change.Change.childAddedChange(key, childNode));
                    }
                });
            }
        }
        return newSnap.withIndex(this.index_);
    };
    /**
     * @inheritDoc
     */
    IndexedFilter.prototype.updatePriority = function (oldSnap, newPriority) {
        if (oldSnap.isEmpty()) {
            return _ChildrenNode.ChildrenNode.EMPTY_NODE;
        } else {
            return oldSnap.updatePriority(newPriority);
        }
    };
    /**
     * @inheritDoc
     */
    IndexedFilter.prototype.filtersNodes = function () {
        return false;
    };
    /**
     * @inheritDoc
     */
    IndexedFilter.prototype.getIndexedFilter = function () {
        return this;
    };
    /**
     * @inheritDoc
     */
    IndexedFilter.prototype.getIndex = function () {
        return this.index_;
    };
    return IndexedFilter;
}();
exports.IndexedFilter = IndexedFilter;
//# sourceMappingURL=IndexedFilter.js.map

/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LimitedFilter = undefined;

var _RangedFilter = require('./RangedFilter');

var _ChildrenNode = require('../../snap/ChildrenNode');

var _Node = require('../../snap/Node');

var _assert = require('../../../../utils/assert');

var _Change = require('../Change');

/**
 * Applies a limit and a range to a node and uses RangedFilter to do the heavy lifting where possible
 *
 * @constructor
 * @implements {NodeFilter}
 */
var LimitedFilter = function () {
    /**
     * @param {!QueryParams} params
     */
    function LimitedFilter(params) {
        this.rangedFilter_ = new _RangedFilter.RangedFilter(params);
        this.index_ = params.getIndex();
        this.limit_ = params.getLimit();
        this.reverse_ = !params.isViewFromLeft();
    }
    /**
     * @inheritDoc
     */
    LimitedFilter.prototype.updateChild = function (snap, key, newChild, affectedPath, source, optChangeAccumulator) {
        if (!this.rangedFilter_.matches(new _Node.NamedNode(key, newChild))) {
            newChild = _ChildrenNode.ChildrenNode.EMPTY_NODE;
        }
        if (snap.getImmediateChild(key).equals(newChild)) {
            // No change
            return snap;
        } else if (snap.numChildren() < this.limit_) {
            return this.rangedFilter_.getIndexedFilter().updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
        } else {
            return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
        }
    };
    /**
     * @inheritDoc
     */
    LimitedFilter.prototype.updateFullNode = function (oldSnap, newSnap, optChangeAccumulator) {
        var filtered;
        if (newSnap.isLeafNode() || newSnap.isEmpty()) {
            // Make sure we have a children node with the correct index, not a leaf node;
            filtered = _ChildrenNode.ChildrenNode.EMPTY_NODE.withIndex(this.index_);
        } else {
            if (this.limit_ * 2 < newSnap.numChildren() && newSnap.isIndexed(this.index_)) {
                // Easier to build up a snapshot, since what we're given has more than twice the elements we want
                filtered = _ChildrenNode.ChildrenNode.EMPTY_NODE.withIndex(this.index_);
                // anchor to the startPost, endPost, or last element as appropriate
                var iterator = void 0;
                if (this.reverse_) {
                    iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
                } else {
                    iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
                }
                var count = 0;
                while (iterator.hasNext() && count < this.limit_) {
                    var next = iterator.getNext();
                    var inRange = void 0;
                    if (this.reverse_) {
                        inRange = this.index_.compare(this.rangedFilter_.getStartPost(), next) <= 0;
                    } else {
                        inRange = this.index_.compare(next, this.rangedFilter_.getEndPost()) <= 0;
                    }
                    if (inRange) {
                        filtered = filtered.updateImmediateChild(next.name, next.node);
                        count++;
                    } else {
                        // if we have reached the end post, we cannot keep adding elemments
                        break;
                    }
                }
            } else {
                // The snap contains less than twice the limit. Faster to delete from the snap than build up a new one
                filtered = newSnap.withIndex(this.index_);
                // Don't support priorities on queries
                filtered = filtered.updatePriority(_ChildrenNode.ChildrenNode.EMPTY_NODE);
                var startPost = void 0;
                var endPost = void 0;
                var cmp = void 0;
                var iterator = void 0;
                if (this.reverse_) {
                    iterator = filtered.getReverseIterator(this.index_);
                    startPost = this.rangedFilter_.getEndPost();
                    endPost = this.rangedFilter_.getStartPost();
                    var indexCompare_1 = this.index_.getCompare();
                    cmp = function cmp(a, b) {
                        return indexCompare_1(b, a);
                    };
                } else {
                    iterator = filtered.getIterator(this.index_);
                    startPost = this.rangedFilter_.getStartPost();
                    endPost = this.rangedFilter_.getEndPost();
                    cmp = this.index_.getCompare();
                }
                var count = 0;
                var foundStartPost = false;
                while (iterator.hasNext()) {
                    var next = iterator.getNext();
                    if (!foundStartPost && cmp(startPost, next) <= 0) {
                        // start adding
                        foundStartPost = true;
                    }
                    var inRange = foundStartPost && count < this.limit_ && cmp(next, endPost) <= 0;
                    if (inRange) {
                        count++;
                    } else {
                        filtered = filtered.updateImmediateChild(next.name, _ChildrenNode.ChildrenNode.EMPTY_NODE);
                    }
                }
            }
        }
        return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap, filtered, optChangeAccumulator);
    };
    /**
     * @inheritDoc
     */
    LimitedFilter.prototype.updatePriority = function (oldSnap, newPriority) {
        // Don't support priorities on queries
        return oldSnap;
    };
    /**
     * @inheritDoc
     */
    LimitedFilter.prototype.filtersNodes = function () {
        return true;
    };
    /**
     * @inheritDoc
     */
    LimitedFilter.prototype.getIndexedFilter = function () {
        return this.rangedFilter_.getIndexedFilter();
    };
    /**
     * @inheritDoc
     */
    LimitedFilter.prototype.getIndex = function () {
        return this.index_;
    };
    /**
     * @param {!Node} snap
     * @param {string} childKey
     * @param {!Node} childSnap
     * @param {!CompleteChildSource} source
     * @param {?ChildChangeAccumulator} changeAccumulator
     * @return {!Node}
     * @private
     */
    LimitedFilter.prototype.fullLimitUpdateChild_ = function (snap, childKey, childSnap, source, changeAccumulator) {
        // TODO: rename all cache stuff etc to general snap terminology
        var cmp;
        if (this.reverse_) {
            var indexCmp_1 = this.index_.getCompare();
            cmp = function cmp(a, b) {
                return indexCmp_1(b, a);
            };
        } else {
            cmp = this.index_.getCompare();
        }
        var oldEventCache = snap;
        (0, _assert.assert)(oldEventCache.numChildren() == this.limit_, '');
        var newChildNamedNode = new _Node.NamedNode(childKey, childSnap);
        var windowBoundary = this.reverse_ ? oldEventCache.getFirstChild(this.index_) : oldEventCache.getLastChild(this.index_);
        var inRange = this.rangedFilter_.matches(newChildNamedNode);
        if (oldEventCache.hasChild(childKey)) {
            var oldChildSnap = oldEventCache.getImmediateChild(childKey);
            var nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
            while (nextChild != null && (nextChild.name == childKey || oldEventCache.hasChild(nextChild.name))) {
                // There is a weird edge case where a node is updated as part of a merge in the write tree, but hasn't
                // been applied to the limited filter yet. Ignore this next child which will be updated later in
                // the limited filter...
                nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
            }
            var compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
            var remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
            if (remainsInWindow) {
                if (changeAccumulator != null) {
                    changeAccumulator.trackChildChange(_Change.Change.childChangedChange(childKey, childSnap, oldChildSnap));
                }
                return oldEventCache.updateImmediateChild(childKey, childSnap);
            } else {
                if (changeAccumulator != null) {
                    changeAccumulator.trackChildChange(_Change.Change.childRemovedChange(childKey, oldChildSnap));
                }
                var newEventCache = oldEventCache.updateImmediateChild(childKey, _ChildrenNode.ChildrenNode.EMPTY_NODE);
                var nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
                if (nextChildInRange) {
                    if (changeAccumulator != null) {
                        changeAccumulator.trackChildChange(_Change.Change.childAddedChange(nextChild.name, nextChild.node));
                    }
                    return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
                } else {
                    return newEventCache;
                }
            }
        } else if (childSnap.isEmpty()) {
            // we're deleting a node, but it was not in the window, so ignore it
            return snap;
        } else if (inRange) {
            if (cmp(windowBoundary, newChildNamedNode) >= 0) {
                if (changeAccumulator != null) {
                    changeAccumulator.trackChildChange(_Change.Change.childRemovedChange(windowBoundary.name, windowBoundary.node));
                    changeAccumulator.trackChildChange(_Change.Change.childAddedChange(childKey, childSnap));
                }
                return oldEventCache.updateImmediateChild(childKey, childSnap).updateImmediateChild(windowBoundary.name, _ChildrenNode.ChildrenNode.EMPTY_NODE);
            } else {
                return snap;
            }
        } else {
            return snap;
        }
    };
    return LimitedFilter;
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
exports.LimitedFilter = LimitedFilter;
//# sourceMappingURL=LimitedFilter.js.map

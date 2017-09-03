/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangedFilter = undefined;

var _IndexedFilter = require('./IndexedFilter');

var _PriorityIndex = require('../../snap/indexes/PriorityIndex');

var _Node = require('../../../core/snap/Node');

var _ChildrenNode = require('../../snap/ChildrenNode');

/**
 * Filters nodes by range and uses an IndexFilter to track any changes after filtering the node
 *
 * @constructor
 * @implements {NodeFilter}
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
var RangedFilter = function () {
    /**
     * @param {!QueryParams} params
     */
    function RangedFilter(params) {
        this.indexedFilter_ = new _IndexedFilter.IndexedFilter(params.getIndex());
        this.index_ = params.getIndex();
        this.startPost_ = RangedFilter.getStartPost_(params);
        this.endPost_ = RangedFilter.getEndPost_(params);
    }
    /**
     * @return {!NamedNode}
     */
    RangedFilter.prototype.getStartPost = function () {
        return this.startPost_;
    };
    /**
     * @return {!NamedNode}
     */
    RangedFilter.prototype.getEndPost = function () {
        return this.endPost_;
    };
    /**
     * @param {!NamedNode} node
     * @return {boolean}
     */
    RangedFilter.prototype.matches = function (node) {
        return this.index_.compare(this.getStartPost(), node) <= 0 && this.index_.compare(node, this.getEndPost()) <= 0;
    };
    /**
     * @inheritDoc
     */
    RangedFilter.prototype.updateChild = function (snap, key, newChild, affectedPath, source, optChangeAccumulator) {
        if (!this.matches(new _Node.NamedNode(key, newChild))) {
            newChild = _ChildrenNode.ChildrenNode.EMPTY_NODE;
        }
        return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
    };
    /**
     * @inheritDoc
     */
    RangedFilter.prototype.updateFullNode = function (oldSnap, newSnap, optChangeAccumulator) {
        if (newSnap.isLeafNode()) {
            // Make sure we have a children node with the correct index, not a leaf node;
            newSnap = _ChildrenNode.ChildrenNode.EMPTY_NODE;
        }
        var filtered = newSnap.withIndex(this.index_);
        // Don't support priorities on queries
        filtered = filtered.updatePriority(_ChildrenNode.ChildrenNode.EMPTY_NODE);
        var self = this;
        newSnap.forEachChild(_PriorityIndex.PRIORITY_INDEX, function (key, childNode) {
            if (!self.matches(new _Node.NamedNode(key, childNode))) {
                filtered = filtered.updateImmediateChild(key, _ChildrenNode.ChildrenNode.EMPTY_NODE);
            }
        });
        return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
    };
    /**
     * @inheritDoc
     */
    RangedFilter.prototype.updatePriority = function (oldSnap, newPriority) {
        // Don't support priorities on queries
        return oldSnap;
    };
    /**
     * @inheritDoc
     */
    RangedFilter.prototype.filtersNodes = function () {
        return true;
    };
    /**
     * @inheritDoc
     */
    RangedFilter.prototype.getIndexedFilter = function () {
        return this.indexedFilter_;
    };
    /**
     * @inheritDoc
     */
    RangedFilter.prototype.getIndex = function () {
        return this.index_;
    };
    /**
     * @param {!QueryParams} params
     * @return {!NamedNode}
     * @private
     */
    RangedFilter.getStartPost_ = function (params) {
        if (params.hasStart()) {
            var startName = params.getIndexStartName();
            return params.getIndex().makePost(params.getIndexStartValue(), startName);
        } else {
            return params.getIndex().minPost();
        }
    };
    /**
     * @param {!QueryParams} params
     * @return {!NamedNode}
     * @private
     */
    RangedFilter.getEndPost_ = function (params) {
        if (params.hasEnd()) {
            var endName = params.getIndexEndName();
            return params.getIndex().makePost(params.getIndexEndValue(), endName);
        } else {
            return params.getIndex().maxPost();
        }
    };
    return RangedFilter;
}();
exports.RangedFilter = RangedFilter;
//# sourceMappingURL=RangedFilter.js.map

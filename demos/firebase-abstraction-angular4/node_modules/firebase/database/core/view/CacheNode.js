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
 * A cache node only stores complete children. Additionally it holds a flag whether the node can be considered fully
 * initialized in the sense that we know at one point in time this represented a valid state of the world, e.g.
 * initialized with data from the server, or a complete overwrite by the client. The filtered flag also tracks
 * whether a node potentially had children removed due to a filter.
 */
var CacheNode = function () {
    /**
     * @param {!Node} node_
     * @param {boolean} fullyInitialized_
     * @param {boolean} filtered_
     */
    function CacheNode(node_, fullyInitialized_, filtered_) {
        this.node_ = node_;
        this.fullyInitialized_ = fullyInitialized_;
        this.filtered_ = filtered_;
    }
    /**
     * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
     * @return {boolean}
     */
    CacheNode.prototype.isFullyInitialized = function () {
        return this.fullyInitialized_;
    };
    /**
     * Returns whether this node is potentially missing children due to a filter applied to the node
     * @return {boolean}
     */
    CacheNode.prototype.isFiltered = function () {
        return this.filtered_;
    };
    /**
     * @param {!Path} path
     * @return {boolean}
     */
    CacheNode.prototype.isCompleteForPath = function (path) {
        if (path.isEmpty()) {
            return this.isFullyInitialized() && !this.filtered_;
        }
        var childKey = path.getFront();
        return this.isCompleteForChild(childKey);
    };
    /**
     * @param {!string} key
     * @return {boolean}
     */
    CacheNode.prototype.isCompleteForChild = function (key) {
        return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
    };
    /**
     * @return {!Node}
     */
    CacheNode.prototype.getNode = function () {
        return this.node_;
    };
    return CacheNode;
}();
exports.CacheNode = CacheNode;
//# sourceMappingURL=CacheNode.js.map

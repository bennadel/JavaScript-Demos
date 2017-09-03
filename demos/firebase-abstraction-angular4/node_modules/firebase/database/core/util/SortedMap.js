/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

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
 * An iterator over an LLRBNode.
 */
var SortedMapIterator = function () {
    /**
     * @template K, V, T
     * @param {LLRBNode|LLRBEmptyNode} node Node to iterate.
     * @param {?K} startKey
     * @param {function(K, K): number} comparator
     * @param {boolean} isReverse_ Whether or not to iterate in reverse
     * @param {(function(K, V):T)=} resultGenerator_
     */
    function SortedMapIterator(node, startKey, comparator, isReverse_, resultGenerator_) {
        if (resultGenerator_ === void 0) {
            resultGenerator_ = null;
        }
        this.isReverse_ = isReverse_;
        this.resultGenerator_ = resultGenerator_;
        /** @private
         * @type {Array.<!LLRBNode>}
         */
        this.nodeStack_ = [];
        var cmp = 1;
        while (!node.isEmpty()) {
            node = node;
            cmp = startKey ? comparator(node.key, startKey) : 1;
            // flip the comparison if we're going in reverse
            if (isReverse_) cmp *= -1;
            if (cmp < 0) {
                // This node is less than our start key. ignore it
                if (this.isReverse_) {
                    node = node.left;
                } else {
                    node = node.right;
                }
            } else if (cmp === 0) {
                // This node is exactly equal to our start key. Push it on the stack, but stop iterating;
                this.nodeStack_.push(node);
                break;
            } else {
                // This node is greater than our start key, add it to the stack and move to the next one
                this.nodeStack_.push(node);
                if (this.isReverse_) {
                    node = node.right;
                } else {
                    node = node.left;
                }
            }
        }
    }
    SortedMapIterator.prototype.getNext = function () {
        if (this.nodeStack_.length === 0) return null;
        var node = this.nodeStack_.pop();
        var result;
        if (this.resultGenerator_) result = this.resultGenerator_(node.key, node.value);else result = { key: node.key, value: node.value };
        if (this.isReverse_) {
            node = node.left;
            while (!node.isEmpty()) {
                this.nodeStack_.push(node);
                node = node.right;
            }
        } else {
            node = node.right;
            while (!node.isEmpty()) {
                this.nodeStack_.push(node);
                node = node.left;
            }
        }
        return result;
    };
    SortedMapIterator.prototype.hasNext = function () {
        return this.nodeStack_.length > 0;
    };
    SortedMapIterator.prototype.peek = function () {
        if (this.nodeStack_.length === 0) return null;
        var node = this.nodeStack_[this.nodeStack_.length - 1];
        if (this.resultGenerator_) {
            return this.resultGenerator_(node.key, node.value);
        } else {
            return { key: node.key, value: node.value };
        }
    };
    return SortedMapIterator;
}();
exports.SortedMapIterator = SortedMapIterator;
/**
 * Represents a node in a Left-leaning Red-Black tree.
 */

var LLRBNode = function () {
    /**
     * @template K, V
     * @param {!K} key Key associated with this node.
     * @param {!V} value Value associated with this node.
     * @param {?boolean} color Whether this node is red.
     * @param {?(LLRBNode|LLRBEmptyNode)=} left Left child.
     * @param {?(LLRBNode|LLRBEmptyNode)=} right Right child.
     */
    function LLRBNode(key, value, color, left, right) {
        this.key = key;
        this.value = value;
        this.color = color != null ? color : LLRBNode.RED;
        this.left = left != null ? left : SortedMap.EMPTY_NODE;
        this.right = right != null ? right : SortedMap.EMPTY_NODE;
    }
    /**
     * Returns a copy of the current node, optionally replacing pieces of it.
     *
     * @param {?K} key New key for the node, or null.
     * @param {?V} value New value for the node, or null.
     * @param {?boolean} color New color for the node, or null.
     * @param {?LLRBNode|LLRBEmptyNode} left New left child for the node, or null.
     * @param {?LLRBNode|LLRBEmptyNode} right New right child for the node, or null.
     * @return {!LLRBNode} The node copy.
     */
    LLRBNode.prototype.copy = function (key, value, color, left, right) {
        return new LLRBNode(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
    };
    /**
     * @return {number} The total number of nodes in the tree.
     */
    LLRBNode.prototype.count = function () {
        return this.left.count() + 1 + this.right.count();
    };
    /**
     * @return {boolean} True if the tree is empty.
     */
    LLRBNode.prototype.isEmpty = function () {
        return false;
    };
    /**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param {function(!K, !V):*} action Callback function to be called for each
     *   node.  If it returns true, traversal is aborted.
     * @return {*} The first truthy value returned by action, or the last falsey
     *   value returned by action
     */
    LLRBNode.prototype.inorderTraversal = function (action) {
        return this.left.inorderTraversal(action) || action(this.key, this.value) || this.right.inorderTraversal(action);
    };
    /**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param {function(!Object, !Object)} action Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @return {*} True if traversal was aborted.
     */
    LLRBNode.prototype.reverseTraversal = function (action) {
        return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
    };
    /**
     * @return {!Object} The minimum node in the tree.
     * @private
     */
    LLRBNode.prototype.min_ = function () {
        if (this.left.isEmpty()) {
            return this;
        } else {
            return this.left.min_();
        }
    };
    /**
     * @return {!K} The maximum key in the tree.
     */
    LLRBNode.prototype.minKey = function () {
        return this.min_().key;
    };
    /**
     * @return {!K} The maximum key in the tree.
     */
    LLRBNode.prototype.maxKey = function () {
        if (this.right.isEmpty()) {
            return this.key;
        } else {
            return this.right.maxKey();
        }
    };
    /**
     *
     * @param {!Object} key Key to insert.
     * @param {!Object} value Value to insert.
     * @param {Comparator} comparator Comparator.
     * @return {!LLRBNode} New tree, with the key/value added.
     */
    LLRBNode.prototype.insert = function (key, value, comparator) {
        var cmp, n;
        n = this;
        cmp = comparator(key, n.key);
        if (cmp < 0) {
            n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
        } else if (cmp === 0) {
            n = n.copy(null, value, null, null, null);
        } else {
            n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
        }
        return n.fixUp_();
    };
    /**
     * @private
     * @return {!LLRBNode|LLRBEmptyNode} New tree, with the minimum key removed.
     */
    LLRBNode.prototype.removeMin_ = function () {
        if (this.left.isEmpty()) {
            return SortedMap.EMPTY_NODE;
        }
        var n = this;
        if (!n.left.isRed_() && !n.left.left.isRed_()) n = n.moveRedLeft_();
        n = n.copy(null, null, null, n.left.removeMin_(), null);
        return n.fixUp_();
    };
    /**
     * @param {!Object} key The key of the item to remove.
     * @param {Comparator} comparator Comparator.
     * @return {!LLRBNode|LLRBEmptyNode} New tree, with the specified item removed.
     */
    LLRBNode.prototype.remove = function (key, comparator) {
        var n, smallest;
        n = this;
        if (comparator(key, n.key) < 0) {
            if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
                n = n.moveRedLeft_();
            }
            n = n.copy(null, null, null, n.left.remove(key, comparator), null);
        } else {
            if (n.left.isRed_()) n = n.rotateRight_();
            if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
                n = n.moveRedRight_();
            }
            if (comparator(key, n.key) === 0) {
                if (n.right.isEmpty()) {
                    return SortedMap.EMPTY_NODE;
                } else {
                    smallest = n.right.min_();
                    n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
                }
            }
            n = n.copy(null, null, null, null, n.right.remove(key, comparator));
        }
        return n.fixUp_();
    };
    /**
     * @private
     * @return {boolean} Whether this is a RED node.
     */
    LLRBNode.prototype.isRed_ = function () {
        return this.color;
    };
    /**
     * @private
     * @return {!LLRBNode} New tree after performing any needed rotations.
     */
    LLRBNode.prototype.fixUp_ = function () {
        var n = this;
        if (n.right.isRed_() && !n.left.isRed_()) n = n.rotateLeft_();
        if (n.left.isRed_() && n.left.left.isRed_()) n = n.rotateRight_();
        if (n.left.isRed_() && n.right.isRed_()) n = n.colorFlip_();
        return n;
    };
    /**
     * @private
     * @return {!LLRBNode} New tree, after moveRedLeft.
     */
    LLRBNode.prototype.moveRedLeft_ = function () {
        var n = this.colorFlip_();
        if (n.right.left.isRed_()) {
            n = n.copy(null, null, null, null, n.right.rotateRight_());
            n = n.rotateLeft_();
            n = n.colorFlip_();
        }
        return n;
    };
    /**
     * @private
     * @return {!LLRBNode} New tree, after moveRedRight.
     */
    LLRBNode.prototype.moveRedRight_ = function () {
        var n = this.colorFlip_();
        if (n.left.left.isRed_()) {
            n = n.rotateRight_();
            n = n.colorFlip_();
        }
        return n;
    };
    /**
     * @private
     * @return {!LLRBNode} New tree, after rotateLeft.
     */
    LLRBNode.prototype.rotateLeft_ = function () {
        var nl = this.copy(null, null, LLRBNode.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, nl, null);
    };
    /**
     * @private
     * @return {!LLRBNode} New tree, after rotateRight.
     */
    LLRBNode.prototype.rotateRight_ = function () {
        var nr = this.copy(null, null, LLRBNode.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, nr);
    };
    /**
     * @private
     * @return {!LLRBNode} New tree, after colorFlip.
     */
    LLRBNode.prototype.colorFlip_ = function () {
        var left = this.left.copy(null, null, !this.left.color, null, null);
        var right = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, left, right);
    };
    /**
     * For testing.
     *
     * @private
     * @return {boolean} True if all is well.
     */
    LLRBNode.prototype.checkMaxDepth_ = function () {
        var blackDepth = this.check_();
        return Math.pow(2.0, blackDepth) <= this.count() + 1;
    };
    /**
     * @private
     * @return {number} Not sure what this returns exactly. :-).
     */
    LLRBNode.prototype.check_ = function () {
        var blackDepth;
        if (this.isRed_() && this.left.isRed_()) {
            throw new Error('Red node has red child(' + this.key + ',' + this.value + ')');
        }
        if (this.right.isRed_()) {
            throw new Error('Right child of (' + this.key + ',' + this.value + ') is red');
        }
        blackDepth = this.left.check_();
        if (blackDepth !== this.right.check_()) {
            throw new Error('Black depths differ');
        } else {
            return blackDepth + (this.isRed_() ? 0 : 1);
        }
    };
    LLRBNode.RED = true;
    LLRBNode.BLACK = false;
    return LLRBNode;
}();
exports.LLRBNode = LLRBNode;
/**
 * Represents an empty node (a leaf node in the Red-Black Tree).
 */

var LLRBEmptyNode = function () {
    function LLRBEmptyNode() {}
    /**
     * Returns a copy of the current node.
     *
     * @return {!LLRBEmptyNode} The node copy.
     */
    LLRBEmptyNode.prototype.copy = function (key, value, color, left, right) {
        return this;
    };
    /**
     * Returns a copy of the tree, with the specified key/value added.
     *
     * @param {!K} key Key to be added.
     * @param {!V} value Value to be added.
     * @param {Comparator} comparator Comparator.
     * @return {!LLRBNode} New tree, with item added.
     */
    LLRBEmptyNode.prototype.insert = function (key, value, comparator) {
        return new LLRBNode(key, value, null);
    };
    /**
     * Returns a copy of the tree, with the specified key removed.
     *
     * @param {!K} key The key to remove.
     * @param {Comparator} comparator Comparator.
     * @return {!LLRBEmptyNode} New tree, with item removed.
     */
    LLRBEmptyNode.prototype.remove = function (key, comparator) {
        return this;
    };
    /**
     * @return {number} The total number of nodes in the tree.
     */
    LLRBEmptyNode.prototype.count = function () {
        return 0;
    };
    /**
     * @return {boolean} True if the tree is empty.
     */
    LLRBEmptyNode.prototype.isEmpty = function () {
        return true;
    };
    /**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param {function(!K, !V):*} action Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @return {boolean} True if traversal was aborted.
     */
    LLRBEmptyNode.prototype.inorderTraversal = function (action) {
        return false;
    };
    /**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param {function(!K, !V)} action Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @return {boolean} True if traversal was aborted.
     */
    LLRBEmptyNode.prototype.reverseTraversal = function (action) {
        return false;
    };
    /**
     * @return {null}
     */
    LLRBEmptyNode.prototype.minKey = function () {
        return null;
    };
    /**
     * @return {null}
     */
    LLRBEmptyNode.prototype.maxKey = function () {
        return null;
    };
    /**
     * @private
     * @return {number} Not sure what this returns exactly. :-).
     */
    LLRBEmptyNode.prototype.check_ = function () {
        return 0;
    };
    /**
     * @private
     * @return {boolean} Whether this node is red.
     */
    LLRBEmptyNode.prototype.isRed_ = function () {
        return false;
    };
    return LLRBEmptyNode;
}();
exports.LLRBEmptyNode = LLRBEmptyNode;
/**
 * An immutable sorted map implementation, based on a Left-leaning Red-Black
 * tree.
 */

var SortedMap = function () {
    /**
     * @template K, V
     * @param {function(K, K):number} comparator_ Key comparator.
     * @param {LLRBNode=} root_ (Optional) Root node for the map.
     */
    function SortedMap(comparator_, root_) {
        if (root_ === void 0) {
            root_ = SortedMap.EMPTY_NODE;
        }
        this.comparator_ = comparator_;
        this.root_ = root_;
    }
    /**
     * Returns a copy of the map, with the specified key/value added or replaced.
     * (TODO: We should perhaps rename this method to 'put')
     *
     * @param {!K} key Key to be added.
     * @param {!V} value Value to be added.
     * @return {!SortedMap.<K, V>} New map, with item added.
     */
    SortedMap.prototype.insert = function (key, value) {
        return new SortedMap(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    };
    /**
     * Returns a copy of the map, with the specified key removed.
     *
     * @param {!K} key The key to remove.
     * @return {!SortedMap.<K, V>} New map, with item removed.
     */
    SortedMap.prototype.remove = function (key) {
        return new SortedMap(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    };
    /**
     * Returns the value of the node with the given key, or null.
     *
     * @param {!K} key The key to look up.
     * @return {?V} The value of the node with the given key, or null if the
     * key doesn't exist.
     */
    SortedMap.prototype.get = function (key) {
        var cmp;
        var node = this.root_;
        while (!node.isEmpty()) {
            cmp = this.comparator_(key, node.key);
            if (cmp === 0) {
                return node.value;
            } else if (cmp < 0) {
                node = node.left;
            } else if (cmp > 0) {
                node = node.right;
            }
        }
        return null;
    };
    /**
     * Returns the key of the item *before* the specified key, or null if key is the first item.
     * @param {K} key The key to find the predecessor of
     * @return {?K} The predecessor key.
     */
    SortedMap.prototype.getPredecessorKey = function (key) {
        var cmp,
            node = this.root_,
            rightParent = null;
        while (!node.isEmpty()) {
            cmp = this.comparator_(key, node.key);
            if (cmp === 0) {
                if (!node.left.isEmpty()) {
                    node = node.left;
                    while (!node.right.isEmpty()) {
                        node = node.right;
                    }return node.key;
                } else if (rightParent) {
                    return rightParent.key;
                } else {
                    return null; // first item.
                }
            } else if (cmp < 0) {
                node = node.left;
            } else if (cmp > 0) {
                rightParent = node;
                node = node.right;
            }
        }
        throw new Error('Attempted to find predecessor key for a nonexistent key.  What gives?');
    };
    /**
     * @return {boolean} True if the map is empty.
     */
    SortedMap.prototype.isEmpty = function () {
        return this.root_.isEmpty();
    };
    /**
     * @return {number} The total number of nodes in the map.
     */
    SortedMap.prototype.count = function () {
        return this.root_.count();
    };
    /**
     * @return {?K} The minimum key in the map.
     */
    SortedMap.prototype.minKey = function () {
        return this.root_.minKey();
    };
    /**
     * @return {?K} The maximum key in the map.
     */
    SortedMap.prototype.maxKey = function () {
        return this.root_.maxKey();
    };
    /**
     * Traverses the map in key order and calls the specified action function
     * for each key/value pair.
     *
     * @param {function(!K, !V):*} action Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @return {*} The first truthy value returned by action, or the last falsey
     *   value returned by action
     */
    SortedMap.prototype.inorderTraversal = function (action) {
        return this.root_.inorderTraversal(action);
    };
    /**
     * Traverses the map in reverse key order and calls the specified action function
     * for each key/value pair.
     *
     * @param {function(!Object, !Object)} action Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @return {*} True if the traversal was aborted.
     */
    SortedMap.prototype.reverseTraversal = function (action) {
        return this.root_.reverseTraversal(action);
    };
    /**
     * Returns an iterator over the SortedMap.
     * @template T
     * @param {(function(K, V):T)=} resultGenerator
     * @return {SortedMapIterator.<K, V, T>} The iterator.
     */
    SortedMap.prototype.getIterator = function (resultGenerator) {
        return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
    };
    SortedMap.prototype.getIteratorFrom = function (key, resultGenerator) {
        return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
    };
    SortedMap.prototype.getReverseIteratorFrom = function (key, resultGenerator) {
        return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
    };
    SortedMap.prototype.getReverseIterator = function (resultGenerator) {
        return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
    };
    /**
     * Always use the same empty node, to reduce memory.
     * @const
     */
    SortedMap.EMPTY_NODE = new LLRBEmptyNode();
    return SortedMap;
}();
exports.SortedMap = SortedMap;
//# sourceMappingURL=SortedMap.js.map

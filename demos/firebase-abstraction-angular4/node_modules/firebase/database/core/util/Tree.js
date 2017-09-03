/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tree = exports.TreeNode = undefined;

var _assert = require('../../../utils/assert');

var _Path = require('./Path');

var _obj = require('../../../utils/obj');

/**
 * Node in a Tree.
 */
var TreeNode = function () {
    function TreeNode() {
        // TODO: Consider making accessors that create children and value lazily or
        // separate Internal / Leaf 'types'.
        this.children = {};
        this.childCount = 0;
        this.value = null;
    }
    return TreeNode;
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
exports.TreeNode = TreeNode;
/**
 * A light-weight tree, traversable by path.  Nodes can have both values and children.
 * Nodes are not enumerated (by forEachChild) unless they have a value or non-empty
 * children.
 */

var Tree = function () {
    /**
     * @template T
     * @param {string=} name_ Optional name of the node.
     * @param {Tree=} parent_ Optional parent node.
     * @param {TreeNode=} node_ Optional node to wrap.
     */
    function Tree(name_, parent_, node_) {
        if (name_ === void 0) {
            name_ = '';
        }
        if (parent_ === void 0) {
            parent_ = null;
        }
        if (node_ === void 0) {
            node_ = new TreeNode();
        }
        this.name_ = name_;
        this.parent_ = parent_;
        this.node_ = node_;
    }
    /**
     * Returns a sub-Tree for the given path.
     *
     * @param {!(string|Path)} pathObj Path to look up.
     * @return {!Tree.<T>} Tree for path.
     */
    Tree.prototype.subTree = function (pathObj) {
        // TODO: Require pathObj to be Path?
        var path = pathObj instanceof _Path.Path ? pathObj : new _Path.Path(pathObj);
        var child = this,
            next;
        while ((next = path.getFront()) !== null) {
            var childNode = (0, _obj.safeGet)(child.node_.children, next) || new TreeNode();
            child = new Tree(next, child, childNode);
            path = path.popFront();
        }
        return child;
    };
    /**
     * Returns the data associated with this tree node.
     *
     * @return {?T} The data or null if no data exists.
     */
    Tree.prototype.getValue = function () {
        return this.node_.value;
    };
    /**
     * Sets data to this tree node.
     *
     * @param {!T} value Value to set.
     */
    Tree.prototype.setValue = function (value) {
        (0, _assert.assert)(typeof value !== 'undefined', 'Cannot set value to undefined');
        this.node_.value = value;
        this.updateParents_();
    };
    /**
     * Clears the contents of the tree node (its value and all children).
     */
    Tree.prototype.clear = function () {
        this.node_.value = null;
        this.node_.children = {};
        this.node_.childCount = 0;
        this.updateParents_();
    };
    /**
     * @return {boolean} Whether the tree has any children.
     */
    Tree.prototype.hasChildren = function () {
        return this.node_.childCount > 0;
    };
    /**
     * @return {boolean} Whether the tree is empty (no value or children).
     */
    Tree.prototype.isEmpty = function () {
        return this.getValue() === null && !this.hasChildren();
    };
    /**
     * Calls action for each child of this tree node.
     *
     * @param {function(!Tree.<T>)} action Action to be called for each child.
     */
    Tree.prototype.forEachChild = function (action) {
        var _this = this;
        (0, _obj.forEach)(this.node_.children, function (child, childTree) {
            action(new Tree(child, _this, childTree));
        });
    };
    /**
     * Does a depth-first traversal of this node's descendants, calling action for each one.
     *
     * @param {function(!Tree.<T>)} action Action to be called for each child.
     * @param {boolean=} includeSelf Whether to call action on this node as well. Defaults to
     *   false.
     * @param {boolean=} childrenFirst Whether to call action on children before calling it on
     *   parent.
     */
    Tree.prototype.forEachDescendant = function (action, includeSelf, childrenFirst) {
        if (includeSelf && !childrenFirst) action(this);
        this.forEachChild(function (child) {
            child.forEachDescendant(action, /*includeSelf=*/true, childrenFirst);
        });
        if (includeSelf && childrenFirst) action(this);
    };
    /**
     * Calls action on each ancestor node.
     *
     * @param {function(!Tree.<T>)} action Action to be called on each parent; return
     *   true to abort.
     * @param {boolean=} includeSelf Whether to call action on this node as well.
     * @return {boolean} true if the action callback returned true.
     */
    Tree.prototype.forEachAncestor = function (action, includeSelf) {
        var node = includeSelf ? this : this.parent();
        while (node !== null) {
            if (action(node)) {
                return true;
            }
            node = node.parent();
        }
        return false;
    };
    /**
     * Does a depth-first traversal of this node's descendants.  When a descendant with a value
     * is found, action is called on it and traversal does not continue inside the node.
     * Action is *not* called on this node.
     *
     * @param {function(!Tree.<T>)} action Action to be called for each child.
     */
    Tree.prototype.forEachImmediateDescendantWithValue = function (action) {
        this.forEachChild(function (child) {
            if (child.getValue() !== null) action(child);else child.forEachImmediateDescendantWithValue(action);
        });
    };
    /**
     * @return {!Path} The path of this tree node, as a Path.
     */
    Tree.prototype.path = function () {
        return new _Path.Path(this.parent_ === null ? this.name_ : this.parent_.path() + '/' + this.name_);
    };
    /**
     * @return {string} The name of the tree node.
     */
    Tree.prototype.name = function () {
        return this.name_;
    };
    /**
     * @return {?Tree} The parent tree node, or null if this is the root of the tree.
     */
    Tree.prototype.parent = function () {
        return this.parent_;
    };
    /**
     * Adds or removes this child from its parent based on whether it's empty or not.
     *
     * @private
     */
    Tree.prototype.updateParents_ = function () {
        if (this.parent_ !== null) this.parent_.updateChild_(this.name_, this);
    };
    /**
     * Adds or removes the passed child to this tree node, depending on whether it's empty.
     *
     * @param {string} childName The name of the child to update.
     * @param {!Tree.<T>} child The child to update.
     * @private
     */
    Tree.prototype.updateChild_ = function (childName, child) {
        var childEmpty = child.isEmpty();
        var childExists = (0, _obj.contains)(this.node_.children, childName);
        if (childEmpty && childExists) {
            delete this.node_.children[childName];
            this.node_.childCount--;
            this.updateParents_();
        } else if (!childEmpty && !childExists) {
            this.node_.children[childName] = child.node_;
            this.node_.childCount++;
            this.updateParents_();
        }
    };
    return Tree;
}();
exports.Tree = Tree;
//# sourceMappingURL=Tree.js.map

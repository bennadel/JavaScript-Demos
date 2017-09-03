/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveDeferredValueSnapshot = exports.resolveDeferredValueTree = exports.resolveDeferredValue = exports.generateWithValues = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
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


var _assert = require('../../../utils/assert');

var _Path = require('./Path');

var _SparseSnapshotTree = require('../SparseSnapshotTree');

var _LeafNode = require('../snap/LeafNode');

var _nodeFromJSON = require('../snap/nodeFromJSON');

var _PriorityIndex = require('../snap/indexes/PriorityIndex');

/**
 * Generate placeholders for deferred values.
 * @param {?Object} values
 * @return {!Object}
 */
var generateWithValues = exports.generateWithValues = function generateWithValues(values) {
    values = values || {};
    values['timestamp'] = values['timestamp'] || new Date().getTime();
    return values;
};
/**
 * Value to use when firing local events. When writing server values, fire
 * local events with an approximate value, otherwise return value as-is.
 * @param {(Object|string|number|boolean)} value
 * @param {!Object} serverValues
 * @return {!(string|number|boolean)}
 */
var resolveDeferredValue = exports.resolveDeferredValue = function resolveDeferredValue(value, serverValues) {
    if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
        return value;
    } else {
        (0, _assert.assert)('.sv' in value, 'Unexpected leaf node or priority contents');
        return serverValues[value['.sv']];
    }
};
/**
 * Recursively replace all deferred values and priorities in the tree with the
 * specified generated replacement values.
 * @param {!SparseSnapshotTree} tree
 * @param {!Object} serverValues
 * @return {!SparseSnapshotTree}
 */
var resolveDeferredValueTree = exports.resolveDeferredValueTree = function resolveDeferredValueTree(tree, serverValues) {
    var resolvedTree = new _SparseSnapshotTree.SparseSnapshotTree();
    tree.forEachTree(new _Path.Path(''), function (path, node) {
        resolvedTree.remember(path, resolveDeferredValueSnapshot(node, serverValues));
    });
    return resolvedTree;
};
/**
 * Recursively replace all deferred values and priorities in the node with the
 * specified generated replacement values.  If there are no server values in the node,
 * it'll be returned as-is.
 * @param {!Node} node
 * @param {!Object} serverValues
 * @return {!Node}
 */
var resolveDeferredValueSnapshot = exports.resolveDeferredValueSnapshot = function resolveDeferredValueSnapshot(node, serverValues) {
    var rawPri = node.getPriority().val();
    var priority = resolveDeferredValue(rawPri, serverValues);
    var newNode;
    if (node.isLeafNode()) {
        var leafNode = node;
        var value = resolveDeferredValue(leafNode.getValue(), serverValues);
        if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) {
            return new _LeafNode.LeafNode(value, (0, _nodeFromJSON.nodeFromJSON)(priority));
        } else {
            return node;
        }
    } else {
        var childrenNode = node;
        newNode = childrenNode;
        if (priority !== childrenNode.getPriority().val()) {
            newNode = newNode.updatePriority(new _LeafNode.LeafNode(priority));
        }
        childrenNode.forEachChild(_PriorityIndex.PRIORITY_INDEX, function (childName, childNode) {
            var newChildNode = resolveDeferredValueSnapshot(childNode, serverValues);
            if (newChildNode !== childNode) {
                newNode = newNode.updateImmediateChild(childName, newChildNode);
            }
        });
        return newNode;
    }
};
//# sourceMappingURL=ServerValues.js.map

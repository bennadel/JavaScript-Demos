/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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


exports.nodeFromJSON = nodeFromJSON;

var _ChildrenNode = require('./ChildrenNode');

var _LeafNode = require('./LeafNode');

var _Node = require('./Node');

var _obj = require('../../../utils/obj');

var _assert = require('../../../utils/assert');

var _childSet = require('./childSet');

var _comparators = require('./comparators');

var _IndexMap = require('./IndexMap');

var _PriorityIndex = require('./indexes/PriorityIndex');

var USE_HINZE = true;
/**
 * Constructs a snapshot node representing the passed JSON and returns it.
 * @param {*} json JSON to create a node for.
 * @param {?string|?number=} priority Optional priority to use.  This will be ignored if the
 * passed JSON contains a .priority property.
 * @return {!Node}
 */
function nodeFromJSON(json, priority) {
    if (priority === void 0) {
        priority = null;
    }
    if (json === null) {
        return _ChildrenNode.ChildrenNode.EMPTY_NODE;
    }
    if ((typeof json === 'undefined' ? 'undefined' : _typeof(json)) === 'object' && '.priority' in json) {
        priority = json['.priority'];
    }
    (0, _assert.assert)(priority === null || typeof priority === 'string' || typeof priority === 'number' || (typeof priority === 'undefined' ? 'undefined' : _typeof(priority)) === 'object' && '.sv' in priority, 'Invalid priority type found: ' + (typeof priority === 'undefined' ? 'undefined' : _typeof(priority)));
    if ((typeof json === 'undefined' ? 'undefined' : _typeof(json)) === 'object' && '.value' in json && json['.value'] !== null) {
        json = json['.value'];
    }
    // Valid leaf nodes include non-objects or server-value wrapper objects
    if ((typeof json === 'undefined' ? 'undefined' : _typeof(json)) !== 'object' || '.sv' in json) {
        var jsonLeaf = json;
        return new _LeafNode.LeafNode(jsonLeaf, nodeFromJSON(priority));
    }
    if (!(json instanceof Array) && USE_HINZE) {
        var children_1 = [];
        var childrenHavePriority_1 = false;
        var hinzeJsonObj_1 = json;
        (0, _obj.forEach)(hinzeJsonObj_1, function (key, child) {
            if (typeof key !== 'string' || key.substring(0, 1) !== '.') {
                // Ignore metadata nodes
                var childNode = nodeFromJSON(hinzeJsonObj_1[key]);
                if (!childNode.isEmpty()) {
                    childrenHavePriority_1 = childrenHavePriority_1 || !childNode.getPriority().isEmpty();
                    children_1.push(new _Node.NamedNode(key, childNode));
                }
            }
        });
        if (children_1.length == 0) {
            return _ChildrenNode.ChildrenNode.EMPTY_NODE;
        }
        var childSet = (0, _childSet.buildChildSet)(children_1, _comparators.NAME_ONLY_COMPARATOR, function (namedNode) {
            return namedNode.name;
        }, _comparators.NAME_COMPARATOR);
        if (childrenHavePriority_1) {
            var sortedChildSet = (0, _childSet.buildChildSet)(children_1, _PriorityIndex.PRIORITY_INDEX.getCompare());
            return new _ChildrenNode.ChildrenNode(childSet, nodeFromJSON(priority), new _IndexMap.IndexMap({ '.priority': sortedChildSet }, { '.priority': _PriorityIndex.PRIORITY_INDEX }));
        } else {
            return new _ChildrenNode.ChildrenNode(childSet, nodeFromJSON(priority), _IndexMap.IndexMap.Default);
        }
    } else {
        var node_1 = _ChildrenNode.ChildrenNode.EMPTY_NODE;
        var jsonObj_1 = json;
        (0, _obj.forEach)(jsonObj_1, function (key, childData) {
            if ((0, _obj.contains)(jsonObj_1, key)) {
                if (key.substring(0, 1) !== '.') {
                    // ignore metadata nodes.
                    var childNode = nodeFromJSON(childData);
                    if (childNode.isLeafNode() || !childNode.isEmpty()) node_1 = node_1.updateImmediateChild(key, childNode);
                }
            }
        });
        return node_1.updatePriority(nodeFromJSON(priority));
    }
}
(0, _PriorityIndex.setNodeFromJSON)(nodeFromJSON);
//# sourceMappingURL=nodeFromJSON.js.map

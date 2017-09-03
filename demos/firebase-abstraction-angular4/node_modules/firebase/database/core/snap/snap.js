/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validatePriorityNode = exports.priorityHashText = undefined;

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


exports.setMaxNode = setMaxNode;

var _assert = require('../../../utils/assert');

var _util = require('../util/util');

var _obj = require('../../../utils/obj');

var MAX_NODE;
function setMaxNode(val) {
    MAX_NODE = val;
}
/**
 * @param {(!string|!number)} priority
 * @return {!string}
 */
var priorityHashText = exports.priorityHashText = function priorityHashText(priority) {
    if (typeof priority === 'number') return 'number:' + (0, _util.doubleToIEEE754String)(priority);else return 'string:' + priority;
};
/**
 * Validates that a priority snapshot Node is valid.
 *
 * @param {!Node} priorityNode
 */
var validatePriorityNode = exports.validatePriorityNode = function validatePriorityNode(priorityNode) {
    if (priorityNode.isLeafNode()) {
        var val = priorityNode.val();
        (0, _assert.assert)(typeof val === 'string' || typeof val === 'number' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && (0, _obj.contains)(val, '.sv'), 'Priority must be a string or number.');
    } else {
        (0, _assert.assert)(priorityNode === MAX_NODE || priorityNode.isEmpty(), 'priority of unexpected type.');
    }
    // Don't call getPriority() on MAX_NODE to avoid hitting assertion.
    (0, _assert.assert)(priorityNode === MAX_NODE || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};
//# sourceMappingURL=snap.js.map

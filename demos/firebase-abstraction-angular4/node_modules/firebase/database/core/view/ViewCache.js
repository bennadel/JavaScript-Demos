/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewCache = undefined;

var _ChildrenNode = require('../snap/ChildrenNode');

var _CacheNode = require('./CacheNode');

/**
 * Stores the data we have cached for a view.
 *
 * serverSnap is the cached server data, eventSnap is the cached event data (server data plus any local writes).
 *
 * @constructor
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
var ViewCache = function () {
  /**
   *
   * @param {!CacheNode} eventCache_
   * @param {!CacheNode} serverCache_
   */
  function ViewCache(eventCache_, serverCache_) {
    this.eventCache_ = eventCache_;
    this.serverCache_ = serverCache_;
  }
  /**
   * @param {!Node} eventSnap
   * @param {boolean} complete
   * @param {boolean} filtered
   * @return {!ViewCache}
   */
  ViewCache.prototype.updateEventSnap = function (eventSnap, complete, filtered) {
    return new ViewCache(new _CacheNode.CacheNode(eventSnap, complete, filtered), this.serverCache_);
  };
  /**
   * @param {!Node} serverSnap
   * @param {boolean} complete
   * @param {boolean} filtered
   * @return {!ViewCache}
   */
  ViewCache.prototype.updateServerSnap = function (serverSnap, complete, filtered) {
    return new ViewCache(this.eventCache_, new _CacheNode.CacheNode(serverSnap, complete, filtered));
  };
  /**
   * @return {!CacheNode}
   */
  ViewCache.prototype.getEventCache = function () {
    return this.eventCache_;
  };
  /**
   * @return {?Node}
   */
  ViewCache.prototype.getCompleteEventSnap = function () {
    return this.eventCache_.isFullyInitialized() ? this.eventCache_.getNode() : null;
  };
  /**
   * @return {!CacheNode}
   */
  ViewCache.prototype.getServerCache = function () {
    return this.serverCache_;
  };
  /**
   * @return {?Node}
   */
  ViewCache.prototype.getCompleteServerSnap = function () {
    return this.serverCache_.isFullyInitialized() ? this.serverCache_.getNode() : null;
  };
  /**
   * @const
   * @type {ViewCache}
   */
  ViewCache.Empty = new ViewCache(new _CacheNode.CacheNode(_ChildrenNode.ChildrenNode.EMPTY_NODE,
  /*fullyInitialized=*/false,
  /*filtered=*/false), new _CacheNode.CacheNode(_ChildrenNode.ChildrenNode.EMPTY_NODE,
  /*fullyInitialized=*/false,
  /*filtered=*/false));
  return ViewCache;
}();
exports.ViewCache = ViewCache;
//# sourceMappingURL=ViewCache.js.map

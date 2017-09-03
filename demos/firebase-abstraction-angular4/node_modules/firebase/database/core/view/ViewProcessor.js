/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewProcessor = exports.ProcessorResult = undefined;

var _Operation = require('../operation/Operation');

var _assert = require('../../../utils/assert');

var _ChildChangeAccumulator = require('./ChildChangeAccumulator');

var _Change = require('./Change');

var _ChildrenNode = require('../snap/ChildrenNode');

var _KeyIndex = require('../snap/indexes/KeyIndex');

var _ImmutableTree = require('../util/ImmutableTree');

var _Path = require('../util/Path');

var _CompleteChildSource = require('./CompleteChildSource');

/**
 * @constructor
 * @struct
 */
var ProcessorResult = function () {
    /**
     * @param {!ViewCache} viewCache
     * @param {!Array.<!Change>} changes
     */
    function ProcessorResult(viewCache, changes) {
        this.viewCache = viewCache;
        this.changes = changes;
    }
    return ProcessorResult;
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
exports.ProcessorResult = ProcessorResult;
/**
 * @constructor
 */

var ViewProcessor = function () {
    /**
     * @param {!NodeFilter} filter_
     */
    function ViewProcessor(filter_) {
        this.filter_ = filter_;
    }
    /**
     * @param {!ViewCache} viewCache
     */
    ViewProcessor.prototype.assertIndexed = function (viewCache) {
        (0, _assert.assert)(viewCache.getEventCache().getNode().isIndexed(this.filter_.getIndex()), 'Event snap not indexed');
        (0, _assert.assert)(viewCache.getServerCache().getNode().isIndexed(this.filter_.getIndex()), 'Server snap not indexed');
    };
    /**
     * @param {!ViewCache} oldViewCache
     * @param {!Operation} operation
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} completeCache
     * @return {!ProcessorResult}
     */
    ViewProcessor.prototype.applyOperation = function (oldViewCache, operation, writesCache, completeCache) {
        var accumulator = new _ChildChangeAccumulator.ChildChangeAccumulator();
        var newViewCache, filterServerNode;
        if (operation.type === _Operation.OperationType.OVERWRITE) {
            var overwrite = operation;
            if (overwrite.source.fromUser) {
                newViewCache = this.applyUserOverwrite_(oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
            } else {
                (0, _assert.assert)(overwrite.source.fromServer, 'Unknown source.');
                // We filter the node if it's a tagged update or the node has been previously filtered  and the
                // update is not at the root in which case it is ok (and necessary) to mark the node unfiltered
                // again
                filterServerNode = overwrite.source.tagged || oldViewCache.getServerCache().isFiltered() && !overwrite.path.isEmpty();
                newViewCache = this.applyServerOverwrite_(oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
            }
        } else if (operation.type === _Operation.OperationType.MERGE) {
            var merge = operation;
            if (merge.source.fromUser) {
                newViewCache = this.applyUserMerge_(oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
            } else {
                (0, _assert.assert)(merge.source.fromServer, 'Unknown source.');
                // We filter the node if it's a tagged update or the node has been previously filtered
                filterServerNode = merge.source.tagged || oldViewCache.getServerCache().isFiltered();
                newViewCache = this.applyServerMerge_(oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
            }
        } else if (operation.type === _Operation.OperationType.ACK_USER_WRITE) {
            var ackUserWrite = operation;
            if (!ackUserWrite.revert) {
                newViewCache = this.ackUserWrite_(oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
            } else {
                newViewCache = this.revertUserWrite_(oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
            }
        } else if (operation.type === _Operation.OperationType.LISTEN_COMPLETE) {
            newViewCache = this.listenComplete_(oldViewCache, operation.path, writesCache, accumulator);
        } else {
            throw (0, _assert.assertionError)('Unknown operation type: ' + operation.type);
        }
        var changes = accumulator.getChanges();
        ViewProcessor.maybeAddValueEvent_(oldViewCache, newViewCache, changes);
        return new ProcessorResult(newViewCache, changes);
    };
    /**
     * @param {!ViewCache} oldViewCache
     * @param {!ViewCache} newViewCache
     * @param {!Array.<!Change>} accumulator
     * @private
     */
    ViewProcessor.maybeAddValueEvent_ = function (oldViewCache, newViewCache, accumulator) {
        var eventSnap = newViewCache.getEventCache();
        if (eventSnap.isFullyInitialized()) {
            var isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
            var oldCompleteSnap = oldViewCache.getCompleteEventSnap();
            if (accumulator.length > 0 || !oldViewCache.getEventCache().isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals /** @type {!Node} */(oldCompleteSnap) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
                accumulator.push(_Change.Change.valueChange(
                /** @type {!Node} */newViewCache.getCompleteEventSnap()));
            }
        }
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {!Path} changePath
     * @param {!WriteTreeRef} writesCache
     * @param {!CompleteChildSource} source
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.generateEventCacheAfterServerEvent_ = function (viewCache, changePath, writesCache, source, accumulator) {
        var oldEventSnap = viewCache.getEventCache();
        if (writesCache.shadowingWrite(changePath) != null) {
            // we have a shadowing write, ignore changes
            return viewCache;
        } else {
            var newEventCache = void 0,
                serverNode = void 0;
            if (changePath.isEmpty()) {
                // TODO: figure out how this plays with "sliding ack windows"
                (0, _assert.assert)(viewCache.getServerCache().isFullyInitialized(), 'If change path is empty, we must have complete server data');
                if (viewCache.getServerCache().isFiltered()) {
                    // We need to special case this, because we need to only apply writes to complete children, or
                    // we might end up raising events for incomplete children. If the server data is filtered deep
                    // writes cannot be guaranteed to be complete
                    var serverCache = viewCache.getCompleteServerSnap();
                    var completeChildren = serverCache instanceof _ChildrenNode.ChildrenNode ? serverCache : _ChildrenNode.ChildrenNode.EMPTY_NODE;
                    var completeEventChildren = writesCache.calcCompleteEventChildren(completeChildren);
                    newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), completeEventChildren, accumulator);
                } else {
                    var completeNode = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
                    newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), completeNode, accumulator);
                }
            } else {
                var childKey = changePath.getFront();
                if (childKey == '.priority') {
                    (0, _assert.assert)(changePath.getLength() == 1, "Can't have a priority with additional path components");
                    var oldEventNode = oldEventSnap.getNode();
                    serverNode = viewCache.getServerCache().getNode();
                    // we might have overwrites for this priority
                    var updatedPriority = writesCache.calcEventCacheAfterServerOverwrite(changePath, oldEventNode, serverNode);
                    if (updatedPriority != null) {
                        newEventCache = this.filter_.updatePriority(oldEventNode, updatedPriority);
                    } else {
                        // priority didn't change, keep old node
                        newEventCache = oldEventSnap.getNode();
                    }
                } else {
                    var childChangePath = changePath.popFront();
                    // update child
                    var newEventChild = void 0;
                    if (oldEventSnap.isCompleteForChild(childKey)) {
                        serverNode = viewCache.getServerCache().getNode();
                        var eventChildUpdate = writesCache.calcEventCacheAfterServerOverwrite(changePath, oldEventSnap.getNode(), serverNode);
                        if (eventChildUpdate != null) {
                            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
                        } else {
                            // Nothing changed, just keep the old child
                            newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
                        }
                    } else {
                        newEventChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
                    }
                    if (newEventChild != null) {
                        newEventCache = this.filter_.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
                    } else {
                        // no complete child available or no change
                        newEventCache = oldEventSnap.getNode();
                    }
                }
            }
            return viewCache.updateEventSnap(newEventCache, oldEventSnap.isFullyInitialized() || changePath.isEmpty(), this.filter_.filtersNodes());
        }
    };
    /**
     * @param {!ViewCache} oldViewCache
     * @param {!Path} changePath
     * @param {!Node} changedSnap
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} completeCache
     * @param {boolean} filterServerNode
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.applyServerOverwrite_ = function (oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
        var oldServerSnap = oldViewCache.getServerCache();
        var newServerCache;
        var serverFilter = filterServerNode ? this.filter_ : this.filter_.getIndexedFilter();
        if (changePath.isEmpty()) {
            newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
        } else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
            // we want to filter the server node, but we didn't filter the server node yet, so simulate a full update
            var newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
            newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
        } else {
            var childKey = changePath.getFront();
            if (!oldServerSnap.isCompleteForPath(changePath) && changePath.getLength() > 1) {
                // We don't update incomplete nodes with updates intended for other listeners
                return oldViewCache;
            }
            var childChangePath = changePath.popFront();
            var childNode = oldServerSnap.getNode().getImmediateChild(childKey);
            var newChildNode = childNode.updateChild(childChangePath, changedSnap);
            if (childKey == '.priority') {
                newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
            } else {
                newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, _CompleteChildSource.NO_COMPLETE_CHILD_SOURCE, null);
            }
        }
        var newViewCache = oldViewCache.updateServerSnap(newServerCache, oldServerSnap.isFullyInitialized() || changePath.isEmpty(), serverFilter.filtersNodes());
        var source = new _CompleteChildSource.WriteTreeCompleteChildSource(writesCache, newViewCache, completeCache);
        return this.generateEventCacheAfterServerEvent_(newViewCache, changePath, writesCache, source, accumulator);
    };
    /**
     * @param {!ViewCache} oldViewCache
     * @param {!Path} changePath
     * @param {!Node} changedSnap
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} completeCache
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.applyUserOverwrite_ = function (oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
        var oldEventSnap = oldViewCache.getEventCache();
        var newViewCache, newEventCache;
        var source = new _CompleteChildSource.WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
        if (changePath.isEmpty()) {
            newEventCache = this.filter_.updateFullNode(oldViewCache.getEventCache().getNode(), changedSnap, accumulator);
            newViewCache = oldViewCache.updateEventSnap(newEventCache, true, this.filter_.filtersNodes());
        } else {
            var childKey = changePath.getFront();
            if (childKey === '.priority') {
                newEventCache = this.filter_.updatePriority(oldViewCache.getEventCache().getNode(), changedSnap);
                newViewCache = oldViewCache.updateEventSnap(newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
            } else {
                var childChangePath = changePath.popFront();
                var oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
                var newChild = void 0;
                if (childChangePath.isEmpty()) {
                    // Child overwrite, we can replace the child
                    newChild = changedSnap;
                } else {
                    var childNode = source.getCompleteChild(childKey);
                    if (childNode != null) {
                        if (childChangePath.getBack() === '.priority' && childNode.getChild(childChangePath.parent()).isEmpty()) {
                            // This is a priority update on an empty node. If this node exists on the server, the
                            // server will send down the priority in the update, so ignore for now
                            newChild = childNode;
                        } else {
                            newChild = childNode.updateChild(childChangePath, changedSnap);
                        }
                    } else {
                        // There is no complete child node available
                        newChild = _ChildrenNode.ChildrenNode.EMPTY_NODE;
                    }
                }
                if (!oldChild.equals(newChild)) {
                    var newEventSnap = this.filter_.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
                    newViewCache = oldViewCache.updateEventSnap(newEventSnap, oldEventSnap.isFullyInitialized(), this.filter_.filtersNodes());
                } else {
                    newViewCache = oldViewCache;
                }
            }
        }
        return newViewCache;
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {string} childKey
     * @return {boolean}
     * @private
     */
    ViewProcessor.cacheHasChild_ = function (viewCache, childKey) {
        return viewCache.getEventCache().isCompleteForChild(childKey);
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {!Path} path
     * @param {ImmutableTree.<!Node>} changedChildren
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} serverCache
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.applyUserMerge_ = function (viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
        var _this = this;
        // HACK: In the case of a limit query, there may be some changes that bump things out of the
        // window leaving room for new items.  It's important we process these changes first, so we
        // iterate the changes twice, first processing any that affect items currently in view.
        // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
        // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
        // not the other.
        var curViewCache = viewCache;
        changedChildren.foreach(function (relativePath, childNode) {
            var writePath = path.child(relativePath);
            if (ViewProcessor.cacheHasChild_(viewCache, writePath.getFront())) {
                curViewCache = _this.applyUserOverwrite_(curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
            }
        });
        changedChildren.foreach(function (relativePath, childNode) {
            var writePath = path.child(relativePath);
            if (!ViewProcessor.cacheHasChild_(viewCache, writePath.getFront())) {
                curViewCache = _this.applyUserOverwrite_(curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
            }
        });
        return curViewCache;
    };
    /**
     * @param {!Node} node
     * @param {ImmutableTree.<!Node>} merge
     * @return {!Node}
     * @private
     */
    ViewProcessor.prototype.applyMerge_ = function (node, merge) {
        merge.foreach(function (relativePath, childNode) {
            node = node.updateChild(relativePath, childNode);
        });
        return node;
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {!Path} path
     * @param {!ImmutableTree.<!Node>} changedChildren
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} serverCache
     * @param {boolean} filterServerNode
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.applyServerMerge_ = function (viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
        var _this = this;
        // If we don't have a cache yet, this merge was intended for a previously listen in the same location. Ignore it and
        // wait for the complete data update coming soon.
        if (viewCache.getServerCache().getNode().isEmpty() && !viewCache.getServerCache().isFullyInitialized()) {
            return viewCache;
        }
        // HACK: In the case of a limit query, there may be some changes that bump things out of the
        // window leaving room for new items.  It's important we process these changes first, so we
        // iterate the changes twice, first processing any that affect items currently in view.
        // TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
        // and event snap.  I'm not sure if this will result in edge cases when a child is in one but
        // not the other.
        var curViewCache = viewCache;
        var viewMergeTree;
        if (path.isEmpty()) {
            viewMergeTree = changedChildren;
        } else {
            viewMergeTree = _ImmutableTree.ImmutableTree.Empty.setTree(path, changedChildren);
        }
        var serverNode = viewCache.getServerCache().getNode();
        viewMergeTree.children.inorderTraversal(function (childKey, childTree) {
            if (serverNode.hasChild(childKey)) {
                var serverChild = viewCache.getServerCache().getNode().getImmediateChild(childKey);
                var newChild = _this.applyMerge_(serverChild, childTree);
                curViewCache = _this.applyServerOverwrite_(curViewCache, new _Path.Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
            }
        });
        viewMergeTree.children.inorderTraversal(function (childKey, childMergeTree) {
            var isUnknownDeepMerge = !viewCache.getServerCache().isCompleteForChild(childKey) && childMergeTree.value == null;
            if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
                var serverChild = viewCache.getServerCache().getNode().getImmediateChild(childKey);
                var newChild = _this.applyMerge_(serverChild, childMergeTree);
                curViewCache = _this.applyServerOverwrite_(curViewCache, new _Path.Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
            }
        });
        return curViewCache;
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {!Path} ackPath
     * @param {!ImmutableTree<!boolean>} affectedTree
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} completeCache
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.ackUserWrite_ = function (viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
        if (writesCache.shadowingWrite(ackPath) != null) {
            return viewCache;
        }
        // Only filter server node if it is currently filtered
        var filterServerNode = viewCache.getServerCache().isFiltered();
        // Essentially we'll just get our existing server cache for the affected paths and re-apply it as a server update
        // now that it won't be shadowed.
        var serverCache = viewCache.getServerCache();
        if (affectedTree.value != null) {
            // This is an overwrite.
            if (ackPath.isEmpty() && serverCache.isFullyInitialized() || serverCache.isCompleteForPath(ackPath)) {
                return this.applyServerOverwrite_(viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
            } else if (ackPath.isEmpty()) {
                // This is a goofy edge case where we are acking data at this location but don't have full data.  We
                // should just re-apply whatever we have in our cache as a merge.
                var changedChildren_1 = _ImmutableTree.ImmutableTree.Empty;
                serverCache.getNode().forEachChild(_KeyIndex.KEY_INDEX, function (name, node) {
                    changedChildren_1 = changedChildren_1.set(new _Path.Path(name), node);
                });
                return this.applyServerMerge_(viewCache, ackPath, changedChildren_1, writesCache, completeCache, filterServerNode, accumulator);
            } else {
                return viewCache;
            }
        } else {
            // This is a merge.
            var changedChildren_2 = _ImmutableTree.ImmutableTree.Empty;
            affectedTree.foreach(function (mergePath, value) {
                var serverCachePath = ackPath.child(mergePath);
                if (serverCache.isCompleteForPath(serverCachePath)) {
                    changedChildren_2 = changedChildren_2.set(mergePath, serverCache.getNode().getChild(serverCachePath));
                }
            });
            return this.applyServerMerge_(viewCache, ackPath, changedChildren_2, writesCache, completeCache, filterServerNode, accumulator);
        }
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {!Path} path
     * @param {!WriteTreeRef} writesCache
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.listenComplete_ = function (viewCache, path, writesCache, accumulator) {
        var oldServerNode = viewCache.getServerCache();
        var newViewCache = viewCache.updateServerSnap(oldServerNode.getNode(), oldServerNode.isFullyInitialized() || path.isEmpty(), oldServerNode.isFiltered());
        return this.generateEventCacheAfterServerEvent_(newViewCache, path, writesCache, _CompleteChildSource.NO_COMPLETE_CHILD_SOURCE, accumulator);
    };
    /**
     * @param {!ViewCache} viewCache
     * @param {!Path} path
     * @param {!WriteTreeRef} writesCache
     * @param {?Node} completeServerCache
     * @param {!ChildChangeAccumulator} accumulator
     * @return {!ViewCache}
     * @private
     */
    ViewProcessor.prototype.revertUserWrite_ = function (viewCache, path, writesCache, completeServerCache, accumulator) {
        var complete;
        if (writesCache.shadowingWrite(path) != null) {
            return viewCache;
        } else {
            var source = new _CompleteChildSource.WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
            var oldEventCache = viewCache.getEventCache().getNode();
            var newEventCache = void 0;
            if (path.isEmpty() || path.getFront() === '.priority') {
                var newNode = void 0;
                if (viewCache.getServerCache().isFullyInitialized()) {
                    newNode = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
                } else {
                    var serverChildren = viewCache.getServerCache().getNode();
                    (0, _assert.assert)(serverChildren instanceof _ChildrenNode.ChildrenNode, 'serverChildren would be complete if leaf node');
                    newNode = writesCache.calcCompleteEventChildren(serverChildren);
                }
                newNode = newNode;
                newEventCache = this.filter_.updateFullNode(oldEventCache, newNode, accumulator);
            } else {
                var childKey = path.getFront();
                var newChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
                if (newChild == null && viewCache.getServerCache().isCompleteForChild(childKey)) {
                    newChild = oldEventCache.getImmediateChild(childKey);
                }
                if (newChild != null) {
                    newEventCache = this.filter_.updateChild(oldEventCache, childKey, newChild, path.popFront(), source, accumulator);
                } else if (viewCache.getEventCache().getNode().hasChild(childKey)) {
                    // No complete child available, delete the existing one, if any
                    newEventCache = this.filter_.updateChild(oldEventCache, childKey, _ChildrenNode.ChildrenNode.EMPTY_NODE, path.popFront(), source, accumulator);
                } else {
                    newEventCache = oldEventCache;
                }
                if (newEventCache.isEmpty() && viewCache.getServerCache().isFullyInitialized()) {
                    // We might have reverted all child writes. Maybe the old event was a leaf node
                    complete = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
                    if (complete.isLeafNode()) {
                        newEventCache = this.filter_.updateFullNode(newEventCache, complete, accumulator);
                    }
                }
            }
            complete = viewCache.getServerCache().isFullyInitialized() || writesCache.shadowingWrite(_Path.Path.Empty) != null;
            return viewCache.updateEventSnap(newEventCache, complete, this.filter_.filtersNodes());
        }
    };
    return ViewProcessor;
}();
exports.ViewProcessor = ViewProcessor;
//# sourceMappingURL=ViewProcessor.js.map

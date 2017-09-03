/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.forceRestClient = exports.listens = exports.queryIdentifier = exports.ConnectionTarget = exports.hijackHash = exports.RealTimeConnection = exports.DataConnection = undefined;

var _RepoInfo = require('../core/RepoInfo');

var _PersistentConnection = require('../core/PersistentConnection');

var _RepoManager = require('../core/RepoManager');

var _Connection = require('../realtime/Connection');

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
var DataConnection = exports.DataConnection = _PersistentConnection.PersistentConnection;
/**
 * @param {!string} pathString
 * @param {function(*)} onComplete
 */
_PersistentConnection.PersistentConnection.prototype.simpleListen = function (pathString, onComplete) {
    this.sendRequest('q', { p: pathString }, onComplete);
};
/**
 * @param {*} data
 * @param {function(*)} onEcho
 */
_PersistentConnection.PersistentConnection.prototype.echo = function (data, onEcho) {
    this.sendRequest('echo', { d: data }, onEcho);
};
// RealTimeConnection properties that we use in tests.
var RealTimeConnection = exports.RealTimeConnection = _Connection.Connection;
/**
 * @param {function(): string} newHash
 * @return {function()}
 */
var hijackHash = exports.hijackHash = function hijackHash(newHash) {
    var oldPut = _PersistentConnection.PersistentConnection.prototype.put;
    _PersistentConnection.PersistentConnection.prototype.put = function (pathString, data, opt_onComplete, opt_hash) {
        if (opt_hash !== undefined) {
            opt_hash = newHash();
        }
        oldPut.call(this, pathString, data, opt_onComplete, opt_hash);
    };
    return function () {
        _PersistentConnection.PersistentConnection.prototype.put = oldPut;
    };
};
/**
 * @type {function(new:RepoInfo, !string, boolean, !string, boolean): undefined}
 */
var ConnectionTarget = exports.ConnectionTarget = _RepoInfo.RepoInfo;
/**
 * @param {!Query} query
 * @return {!string}
 */
var queryIdentifier = exports.queryIdentifier = function queryIdentifier(query) {
    return query.queryIdentifier();
};
/**
 * @param {!Query} firebaseRef
 * @return {!Object}
 */
var listens = exports.listens = function listens(firebaseRef) {
    return firebaseRef.repo.persistentConnection_.listens_;
};
/**
 * Forces the RepoManager to create Repos that use ReadonlyRestClient instead of PersistentConnection.
 *
 * @param {boolean} forceRestClient
 */
var forceRestClient = exports.forceRestClient = function forceRestClient(_forceRestClient) {
    _RepoManager.RepoManager.getInstance().forceRestClient(_forceRestClient);
};
//# sourceMappingURL=test_access.js.map

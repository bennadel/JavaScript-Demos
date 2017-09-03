/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatabaseInternals = exports.Database = undefined;

var _util = require('../core/util/util');

var _parser = require('../core/util/libs/parser');

var _Path = require('../core/util/Path');

var _promise = require('../../utils/promise');

var _Reference = require('./Reference');

var _Repo = require('../core/Repo');

var _RepoManager = require('../core/RepoManager');

var _validation = require('../../utils/validation');

var _validation2 = require('../core/util/validation');

/**
 * Class representing a firebase database.
 * @implements {FirebaseService}
 */
var Database = function () {
    /**
     * The constructor should not be called by users of our public API.
     * @param {!Repo} repo_
     */
    function Database(repo_) {
        this.repo_ = repo_;
        if (!(repo_ instanceof _Repo.Repo)) {
            (0, _util.fatal)("Don't call new Database() directly - please use firebase.database().");
        }
        /** @type {Reference} */
        this.root_ = new _Reference.Reference(repo_, _Path.Path.Empty);
        this.INTERNAL = new DatabaseInternals(this);
    }
    Object.defineProperty(Database.prototype, "app", {
        get: function get() {
            return this.repo_.app;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a reference to the root or the path specified in opt_pathString.
     * @param {string=} pathString
     * @return {!Reference} Firebase reference.
     */
    Database.prototype.ref = function (pathString) {
        this.checkDeleted_('ref');
        (0, _validation.validateArgCount)('database.ref', 0, 1, arguments.length);
        return pathString !== undefined ? this.root_.child(pathString) : this.root_;
    };
    /**
     * Returns a reference to the root or the path specified in url.
     * We throw a exception if the url is not in the same domain as the
     * current repo.
     * @param {string} url
     * @return {!Reference} Firebase reference.
     */
    Database.prototype.refFromURL = function (url) {
        /** @const {string} */
        var apiName = 'database.refFromURL';
        this.checkDeleted_(apiName);
        (0, _validation.validateArgCount)(apiName, 1, 1, arguments.length);
        var parsedURL = (0, _parser.parseRepoInfo)(url);
        (0, _validation2.validateUrl)(apiName, 1, parsedURL);
        var repoInfo = parsedURL.repoInfo;
        if (repoInfo.host !== this.repo_.repoInfo_.host) {
            (0, _util.fatal)(apiName + ': Host name does not match the current database: ' + '(found ' + repoInfo.host + ' but expected ' + this.repo_.repoInfo_.host + ')');
        }
        return this.ref(parsedURL.path.toString());
    };
    /**
     * @param {string} apiName
     */
    Database.prototype.checkDeleted_ = function (apiName) {
        if (this.repo_ === null) {
            (0, _util.fatal)('Cannot call ' + apiName + ' on a deleted database.');
        }
    };
    // Make individual repo go offline.
    Database.prototype.goOffline = function () {
        (0, _validation.validateArgCount)('database.goOffline', 0, 0, arguments.length);
        this.checkDeleted_('goOffline');
        this.repo_.interrupt();
    };
    Database.prototype.goOnline = function () {
        (0, _validation.validateArgCount)('database.goOnline', 0, 0, arguments.length);
        this.checkDeleted_('goOnline');
        this.repo_.resume();
    };
    Database.ServerValue = {
        TIMESTAMP: {
            '.sv': 'timestamp'
        }
    };
    return Database;
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
exports.Database = Database;

var DatabaseInternals = function () {
    /** @param {!Database} database */
    function DatabaseInternals(database) {
        this.database = database;
    }
    /** @return {Promise<void>} */
    DatabaseInternals.prototype.delete = function () {
        this.database.checkDeleted_('delete');
        _RepoManager.RepoManager.getInstance().deleteRepo(this.database.repo_);
        this.database.repo_ = null;
        this.database.root_ = null;
        this.database.INTERNAL = null;
        this.database = null;
        return _promise.PromiseImpl.resolve();
    };
    return DatabaseInternals;
}();
exports.DatabaseInternals = DatabaseInternals;
//# sourceMappingURL=Database.js.map

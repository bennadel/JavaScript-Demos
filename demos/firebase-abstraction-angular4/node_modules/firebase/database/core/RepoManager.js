/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RepoManager = undefined;

var _obj = require('../../utils/obj');

var _Repo = require('./Repo');

var _util = require('./util/util');

var _parser = require('./util/libs/parser');

var _validation = require('./util/validation');

require('./Repo_transaction');

/** @const {string} */
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
var DATABASE_URL_OPTION = 'databaseURL';
var _staticInstance;
/**
 * Creates and caches Repo instances.
 */
var RepoManager = function () {
    function RepoManager() {
        /**
         * @private {!Object.<string, !Repo>}
         */
        this.repos_ = {};
        /**
         * If true, new Repos will be created to use ReadonlyRestClient (for testing purposes).
         * @private {boolean}
         */
        this.useRestClient_ = false;
    }
    RepoManager.getInstance = function () {
        if (!_staticInstance) {
            _staticInstance = new RepoManager();
        }
        return _staticInstance;
    };
    // TODO(koss): Remove these functions unless used in tests?
    RepoManager.prototype.interrupt = function () {
        for (var repo in this.repos_) {
            this.repos_[repo].interrupt();
        }
    };
    RepoManager.prototype.resume = function () {
        for (var repo in this.repos_) {
            this.repos_[repo].resume();
        }
    };
    /**
     * This function should only ever be called to CREATE a new database instance.
     *
     * @param {!FirebaseApp} app
     * @return {!Database}
     */
    RepoManager.prototype.databaseFromApp = function (app) {
        var dbUrl = app.options[DATABASE_URL_OPTION];
        if (dbUrl === undefined) {
            (0, _util.fatal)("Can't determine Firebase Database URL.  Be sure to include " + DATABASE_URL_OPTION + ' option when calling firebase.intializeApp().');
        }
        var parsedUrl = (0, _parser.parseRepoInfo)(dbUrl);
        var repoInfo = parsedUrl.repoInfo;
        (0, _validation.validateUrl)('Invalid Firebase Database URL', 1, parsedUrl);
        if (!parsedUrl.path.isEmpty()) {
            (0, _util.fatal)('Database URL must point to the root of a Firebase Database ' + '(not including a child path).');
        }
        var repo = this.createRepo(repoInfo, app);
        return repo.database;
    };
    /**
     * Remove the repo and make sure it is disconnected.
     *
     * @param {!Repo} repo
     */
    RepoManager.prototype.deleteRepo = function (repo) {
        // This should never happen...
        if ((0, _obj.safeGet)(this.repos_, repo.app.name) !== repo) {
            (0, _util.fatal)('Database ' + repo.app.name + ' has already been deleted.');
        }
        repo.interrupt();
        delete this.repos_[repo.app.name];
    };
    /**
     * Ensures a repo doesn't already exist and then creates one using the
     * provided app.
     *
     * @param {!RepoInfo} repoInfo The metadata about the Repo
     * @param {!FirebaseApp} app
     * @return {!Repo} The Repo object for the specified server / repoName.
     */
    RepoManager.prototype.createRepo = function (repoInfo, app) {
        var repo = (0, _obj.safeGet)(this.repos_, app.name);
        if (repo) {
            (0, _util.fatal)('FIREBASE INTERNAL ERROR: Database initialized multiple times.');
        }
        repo = new _Repo.Repo(repoInfo, this.useRestClient_, app);
        this.repos_[app.name] = repo;
        return repo;
    };
    /**
     * Forces us to use ReadonlyRestClient instead of PersistentConnection for new Repos.
     * @param {boolean} forceRestClient
     */
    RepoManager.prototype.forceRestClient = function (forceRestClient) {
        this.useRestClient_ = forceRestClient;
    };
    return RepoManager;
}();
exports.RepoManager = RepoManager;
//# sourceMappingURL=RepoManager.js.map

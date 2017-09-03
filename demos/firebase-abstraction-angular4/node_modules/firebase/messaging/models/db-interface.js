/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _errors = require('../../app/errors');

var _errors2 = require('./errors');

var _errors3 = _interopRequireDefault(_errors2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DBInterface = function () {
    /**
     * @param {string} dbName
     * @param {number} dbVersion
     */
    function DBInterface(dbName, dbVersion) {
        this.errorFactory_ = new _errors.ErrorFactory('messaging', 'Messaging', _errors3.default.map);
        this.dbName_ = dbName;
        this.dbVersion_ = dbVersion;
        this.openDbPromise_ = null;
        this.TRANSACTION_READ_WRITE = 'readwrite';
    }
    /**
     * Get the indexedDB as a promsie.
     * @protected
     * @return {!Promise<!IDBDatabase>} The IndexedDB database
     */
    DBInterface.prototype.openDatabase = function () {
        var _this = this;
        if (this.openDbPromise_) {
            return this.openDbPromise_;
        }
        this.openDbPromise_ = new Promise(function (resolve, reject) {
            var request = indexedDB.open(_this.dbName_, _this.dbVersion_);
            request.onerror = function (event) {
                reject(event.target.error);
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                _this.onDBUpgrade(db);
            };
        });
        return this.openDbPromise_;
    };
    /**
     * Close the currently open database.
     * @return {!Promise} Returns the result of the promise chain.
     */
    DBInterface.prototype.closeDatabase = function () {
        var _this = this;
        return Promise.resolve().then(function () {
            if (_this.openDbPromise_) {
                return _this.openDbPromise_.then(function (db) {
                    db.close();
                    _this.openDbPromise_ = null;
                });
            }
        });
    };
    /**
     * @protected
     * @param {!IDBDatabase} db
     */
    DBInterface.prototype.onDBUpgrade = function (db) {
        throw this.errorFactory_.create(_errors3.default.codes.SHOULD_BE_INHERITED);
    };
    return DBInterface;
}();
exports.default = DBInterface;
module.exports = exports['default'];
//# sourceMappingURL=db-interface.js.map

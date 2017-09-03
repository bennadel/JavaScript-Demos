/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemoryStorage = undefined;

var _obj = require('../../../utils/obj');

/**
 * An in-memory storage implementation that matches the API of DOMStorageWrapper
 * (TODO: create interface for both to implement).
 *
 * @constructor
 */
var MemoryStorage = function () {
    function MemoryStorage() {
        this.cache_ = {};
        this.isInMemoryStorage = true;
    }
    MemoryStorage.prototype.set = function (key, value) {
        if (value == null) {
            delete this.cache_[key];
        } else {
            this.cache_[key] = value;
        }
    };
    MemoryStorage.prototype.get = function (key) {
        if ((0, _obj.contains)(this.cache_, key)) {
            return this.cache_[key];
        }
        return null;
    };
    MemoryStorage.prototype.remove = function (key) {
        delete this.cache_[key];
    };
    return MemoryStorage;
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
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=MemoryStorage.js.map

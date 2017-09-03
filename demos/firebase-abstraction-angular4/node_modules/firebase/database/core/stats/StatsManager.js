/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatsManager = undefined;

var _StatsCollection = require('./StatsCollection');

var StatsManager = function () {
    function StatsManager() {}
    StatsManager.getCollection = function (repoInfo) {
        var hashString = repoInfo.toString();
        if (!this.collections_[hashString]) {
            this.collections_[hashString] = new _StatsCollection.StatsCollection();
        }
        return this.collections_[hashString];
    };
    StatsManager.getOrCreateReporter = function (repoInfo, creatorFunction) {
        var hashString = repoInfo.toString();
        if (!this.reporters_[hashString]) {
            this.reporters_[hashString] = creatorFunction();
        }
        return this.reporters_[hashString];
    };
    StatsManager.collections_ = {};
    StatsManager.reporters_ = {};
    return StatsManager;
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
exports.StatsManager = StatsManager;
//# sourceMappingURL=StatsManager.js.map

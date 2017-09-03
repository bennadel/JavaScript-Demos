/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatsCollection = undefined;

var _deep_copy = require('../../../utils/deep_copy');

var _obj = require('../../../utils/obj');

/**
 * Tracks a collection of stats.
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
var StatsCollection = function () {
    function StatsCollection() {
        this.counters_ = {};
    }
    StatsCollection.prototype.incrementCounter = function (name, amount) {
        if (amount === void 0) {
            amount = 1;
        }
        if (!(0, _obj.contains)(this.counters_, name)) this.counters_[name] = 0;
        this.counters_[name] += amount;
    };
    StatsCollection.prototype.get = function () {
        return (0, _deep_copy.deepCopy)(this.counters_);
    };
    return StatsCollection;
}();
exports.StatsCollection = StatsCollection;
//# sourceMappingURL=StatsCollection.js.map

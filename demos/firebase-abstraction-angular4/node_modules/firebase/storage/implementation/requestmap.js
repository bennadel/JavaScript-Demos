/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestMap = undefined;

var _object = require('./object');

var object = _interopRequireWildcard(_object);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @struct
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
var RequestMap = function () {
    function RequestMap() {
        this.map_ = {};
        this.id_ = constants.minSafeInteger;
    }
    /**
     * Registers the given request with this map.
     * The request is unregistered when it completes.
     * @param r The request to register.
     */
    RequestMap.prototype.addRequest = function (r) {
        var id = this.id_;
        this.id_++;
        this.map_[id] = r;
        var self = this;
        function unmap() {
            delete self.map_[id];
        }
        r.getPromise().then(unmap, unmap);
    };
    /**
     * Cancels all registered requests.
     */
    RequestMap.prototype.clear = function () {
        object.forEach(this.map_, function (key, val) {
            if (val) {
                val.cancel(true);
            }
        });
        this.map_ = {};
    };
    return RequestMap;
}();
exports.RequestMap = RequestMap;
//# sourceMappingURL=requestmap.js.map

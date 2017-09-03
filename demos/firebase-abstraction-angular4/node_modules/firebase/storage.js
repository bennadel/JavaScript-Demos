/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerStorage = registerStorage;

var _string = require('./storage/implementation/string');

var _taskenums = require('./storage/implementation/taskenums');

var _xhriopool = require('./storage/implementation/xhriopool');

var _reference = require('./storage/reference');

var _service = require('./storage/service');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Type constant for Firebase Storage.
 */
var STORAGE_TYPE = 'storage'; /**
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

function factory(app, unused, opt_url) {
    return new _service.Service(app, new _xhriopool.XhrIoPool(), opt_url);
}
function registerStorage(instance) {
    var namespaceExports = {
        // no-inline
        TaskState: _taskenums.TaskState,
        TaskEvent: _taskenums.TaskEvent,
        StringFormat: _string.StringFormat,
        Storage: _service.Service,
        Reference: _reference.Reference
    };
    instance.INTERNAL.registerService(STORAGE_TYPE, factory, namespaceExports, undefined,
    // Allow multiple storage instances per app.
    true);
}
registerStorage(_app2.default);
//# sourceMappingURL=storage.js.map

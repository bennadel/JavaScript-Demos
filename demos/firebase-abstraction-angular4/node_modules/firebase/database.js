/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/

---

typedarray.js
Copyright (c) 2010, Linden Research, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerDatabase = registerDatabase;

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _Database = require('./database/api/Database');

var _Query = require('./database/api/Query');

var _Reference = require('./database/api/Reference');

var _util = require('./database/core/util/util');

var _RepoManager = require('./database/core/RepoManager');

var _internal = require('./database/api/internal');

var INTERNAL = _interopRequireWildcard(_internal);

var _test_access = require('./database/api/test_access');

var TEST_ACCESS = _interopRequireWildcard(_test_access);

var _environment = require('./utils/environment');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerDatabase(instance) {
    // Register the Database Service with the 'firebase' namespace.
    var namespace = instance.INTERNAL.registerService('database', function (app) {
        return _RepoManager.RepoManager.getInstance().databaseFromApp(app);
    },
    // firebase.database namespace properties
    {
        Reference: _Reference.Reference,
        Query: _Query.Query,
        Database: _Database.Database,
        enableLogging: _util.enableLogging,
        INTERNAL: INTERNAL,
        ServerValue: _Database.Database.ServerValue,
        TEST_ACCESS: TEST_ACCESS
    });
    if ((0, _environment.isNodeSdk)()) {
        module.exports = namespace;
    }
} /**
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

registerDatabase(_app2.default);
//# sourceMappingURL=database.js.map

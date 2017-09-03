/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./utils/shims');

var _firebase_app = require('./app/firebase_app');

// Export a single instance of firebase app
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
// Import the needed shims
var firebase = (0, _firebase_app.createFirebaseNamespace)();
// Import the createFirebaseNamespace function
exports.default = firebase;
module.exports = exports['default'];
//# sourceMappingURL=app.js.map

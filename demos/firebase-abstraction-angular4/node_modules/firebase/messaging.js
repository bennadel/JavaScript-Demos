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
exports.registerMessaging = registerMessaging;

var _windowController = require('./messaging/controllers/window-controller');

var _windowController2 = _interopRequireDefault(_windowController);

var _swController = require('./messaging/controllers/sw-controller');

var _swController2 = _interopRequireDefault(_swController);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerMessaging(instance) {
    var messagingName = 'messaging';
    var factoryMethod = function factoryMethod(app) {
        if (self && 'ServiceWorkerGlobalScope' in self) {
            return new _swController2.default(app);
        }
        // Assume we are in the window context.
        return new _windowController2.default(app);
    };
    var namespaceExports = {
        // no-inline
        Messaging: _windowController2.default
    };
    instance.INTERNAL.registerService(messagingName, factoryMethod, namespaceExports);
}
registerMessaging(_app2.default);
//# sourceMappingURL=messaging.js.map

/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventEmitter = undefined;

var _assert = require('../../../utils/assert');

/**
 * Base class to be used if you want to emit events. Call the constructor with
 * the set of allowed event names.
 */
var EventEmitter = function () {
    /**
     * @param {!Array.<string>} allowedEvents_
     */
    function EventEmitter(allowedEvents_) {
        this.allowedEvents_ = allowedEvents_;
        this.listeners_ = {};
        (0, _assert.assert)(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, 'Requires a non-empty array');
    }
    /**
     * To be called by derived classes to trigger events.
     * @param {!string} eventType
     * @param {...*} var_args
     */
    EventEmitter.prototype.trigger = function (eventType) {
        var var_args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            var_args[_i - 1] = arguments[_i];
        }
        if (Array.isArray(this.listeners_[eventType])) {
            // Clone the list, since callbacks could add/remove listeners.
            var listeners = this.listeners_[eventType].slice();
            for (var i = 0; i < listeners.length; i++) {
                listeners[i].callback.apply(listeners[i].context, var_args);
            }
        }
    };
    EventEmitter.prototype.on = function (eventType, callback, context) {
        this.validateEventType_(eventType);
        this.listeners_[eventType] = this.listeners_[eventType] || [];
        this.listeners_[eventType].push({ callback: callback, context: context });
        var eventData = this.getInitialEvent(eventType);
        if (eventData) {
            callback.apply(context, eventData);
        }
    };
    EventEmitter.prototype.off = function (eventType, callback, context) {
        this.validateEventType_(eventType);
        var listeners = this.listeners_[eventType] || [];
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].callback === callback && (!context || context === listeners[i].context)) {
                listeners.splice(i, 1);
                return;
            }
        }
    };
    EventEmitter.prototype.validateEventType_ = function (eventType) {
        (0, _assert.assert)(this.allowedEvents_.find(function (et) {
            return et === eventType;
        }), 'Unknown event: ' + eventType);
    };
    return EventEmitter;
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
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map

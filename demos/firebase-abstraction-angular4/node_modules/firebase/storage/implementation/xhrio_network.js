/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkXhrIo = undefined;

var _error = require('./error');

var errorsExports = _interopRequireWildcard(_error);

var _object = require('./object');

var object = _interopRequireWildcard(_object);

var _promise_external = require('./promise_external');

var promiseimpl = _interopRequireWildcard(_promise_external);

var _type = require('./type');

var type = _interopRequireWildcard(_type);

var _xhrio = require('./xhrio');

var XhrIoExports = _interopRequireWildcard(_xhrio);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * We use this instead of goog.net.XhrIo because goog.net.XhrIo is hyuuuuge and
 * doesn't work in React Native on Android.
 */
var NetworkXhrIo = function () {
    function NetworkXhrIo() {
        var _this = this;
        this.sent_ = false;
        this.xhr_ = new XMLHttpRequest();
        this.errorCode_ = XhrIoExports.ErrorCode.NO_ERROR;
        this.sendPromise_ = promiseimpl.make(function (resolve, reject) {
            _this.xhr_.addEventListener('abort', function (event) {
                _this.errorCode_ = XhrIoExports.ErrorCode.ABORT;
                resolve(_this);
            });
            _this.xhr_.addEventListener('error', function (event) {
                _this.errorCode_ = XhrIoExports.ErrorCode.NETWORK_ERROR;
                resolve(_this);
            });
            _this.xhr_.addEventListener('load', function (event) {
                resolve(_this);
            });
        });
    }
    /**
     * @override
     */
    NetworkXhrIo.prototype.send = function (url, method, opt_body, opt_headers) {
        var _this = this;
        if (this.sent_) {
            throw errorsExports.internalError('cannot .send() more than once');
        }
        this.sent_ = true;
        this.xhr_.open(method, url, true);
        if (type.isDef(opt_headers)) {
            var headers = opt_headers;
            object.forEach(headers, function (key, val) {
                _this.xhr_.setRequestHeader(key, val.toString());
            });
        }
        if (type.isDef(opt_body)) {
            this.xhr_.send(opt_body);
        } else {
            this.xhr_.send();
        }
        return this.sendPromise_;
    };
    /**
     * @override
     */
    NetworkXhrIo.prototype.getErrorCode = function () {
        if (!this.sent_) {
            throw errorsExports.internalError('cannot .getErrorCode() before sending');
        }
        return this.errorCode_;
    };
    /**
     * @override
     */
    NetworkXhrIo.prototype.getStatus = function () {
        if (!this.sent_) {
            throw errorsExports.internalError('cannot .getStatus() before sending');
        }
        try {
            return this.xhr_.status;
        } catch (e) {
            return -1;
        }
    };
    /**
     * @override
     */
    NetworkXhrIo.prototype.getResponseText = function () {
        if (!this.sent_) {
            throw errorsExports.internalError('cannot .getResponseText() before sending');
        }
        return this.xhr_.responseText;
    };
    /**
     * Aborts the request.
     * @override
     */
    NetworkXhrIo.prototype.abort = function () {
        this.xhr_.abort();
    };
    /**
     * @override
     */
    NetworkXhrIo.prototype.getResponseHeader = function (header) {
        return this.xhr_.getResponseHeader(header);
    };
    /**
     * @override
     */
    NetworkXhrIo.prototype.addUploadProgressListener = function (listener) {
        if (type.isDef(this.xhr_.upload)) {
            this.xhr_.upload.addEventListener('progress', listener);
        }
    };
    /**
     * @override
     */
    NetworkXhrIo.prototype.removeUploadProgressListener = function (listener) {
        if (type.isDef(this.xhr_.upload)) {
            this.xhr_.upload.removeEventListener('progress', listener);
        }
    };
    return NetworkXhrIo;
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
exports.NetworkXhrIo = NetworkXhrIo;
//# sourceMappingURL=xhrio_network.js.map

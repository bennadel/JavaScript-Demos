/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

var _constants = require('./constants');

var _WebSocketConnection = require('../database/realtime/WebSocketConnection');

var _util = require('../database/core/util/util');

var _BrowserPollConnection = require('../database/realtime/BrowserPollConnection');

var _fayeWebsocket = require('faye-websocket');

(0, _util.setBufferImpl)(Buffer); /**
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

(0, _WebSocketConnection.setWebSocketImpl)(_fayeWebsocket.Client);
// Overriding the constant (we should be the only ones doing this)
_constants.CONSTANTS.NODE_CLIENT = true;
/**
 * @suppress {es5Strict}
 */
(function () {
    var version = process['version'];
    if (version !== 'v0.10.22' && version !== 'v0.10.23' && version !== 'v0.10.24') return;
    /**
     * The following duplicates much of `/lib/_stream_writable.js` at
     * b922b5e90d2c14dd332b95827c2533e083df7e55, applying the fix for
     * https://github.com/joyent/node/issues/6506. Note that this fix also
     * needs to be applied to `Duplex.prototype.write()` (in
     * `/lib/_stream_duplex.js`) as well.
     */
    var Writable = require('_stream_writable');
    Writable['prototype']['write'] = function (chunk, encoding, cb) {
        var state = this['_writableState'];
        var ret = false;
        if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
        }
        if (Buffer['isBuffer'](chunk)) encoding = 'buffer';else if (!encoding) encoding = state['defaultEncoding'];
        if (typeof cb !== 'function') cb = function cb() {};
        if (state['ended']) writeAfterEnd(this, state, cb);else if (validChunk(this, state, chunk, cb)) ret = writeOrBuffer(this, state, chunk, encoding, cb);
        return ret;
    };
    function writeAfterEnd(stream, state, cb) {
        var er = new Error('write after end');
        // TODO: defer error events consistently everywhere, not just the cb
        stream['emit']('error', er);
        process['nextTick'](function () {
            cb(er);
        });
    }
    function validChunk(stream, state, chunk, cb) {
        var valid = true;
        if (!Buffer['isBuffer'](chunk) && 'string' !== typeof chunk && chunk !== null && chunk !== undefined && !state['objectMode']) {
            var er = new TypeError('Invalid non-string/buffer chunk');
            stream['emit']('error', er);
            process['nextTick'](function () {
                cb(er);
            });
            valid = false;
        }
        return valid;
    }
    function writeOrBuffer(stream, state, chunk, encoding, cb) {
        chunk = decodeChunk(state, chunk, encoding);
        if (Buffer['isBuffer'](chunk)) encoding = 'buffer';
        var len = state['objectMode'] ? 1 : chunk['length'];
        state['length'] += len;
        var ret = state['length'] < state['highWaterMark'];
        // we must ensure that previous needDrain will not be reset to false.
        if (!ret) state['needDrain'] = true;
        if (state['writing']) state['buffer']['push'](new WriteReq(chunk, encoding, cb));else doWrite(stream, state, len, chunk, encoding, cb);
        return ret;
    }
    function decodeChunk(state, chunk, encoding) {
        if (!state['objectMode'] && state['decodeStrings'] !== false && typeof chunk === 'string') {
            chunk = new Buffer(chunk, encoding);
        }
        return chunk;
    }
    /**
     * @constructor
     */
    function WriteReq(chunk, encoding, cb) {
        this['chunk'] = chunk;
        this['encoding'] = encoding;
        this['callback'] = cb;
    }
    function doWrite(stream, state, len, chunk, encoding, cb) {
        state['writelen'] = len;
        state['writecb'] = cb;
        state['writing'] = true;
        state['sync'] = true;
        stream['_write'](chunk, encoding, state['onwrite']);
        state['sync'] = false;
    }
    var Duplex = require('_stream_duplex');
    Duplex['prototype']['write'] = Writable['prototype']['write'];
})();
/**
 * @type {?function({url: string, forever: boolean}, function(Error, number, string))}
 */
_BrowserPollConnection.FirebaseIFrameScriptHolder.request = null;
/**
 * @param {{url: string, forever: boolean}} req
 * @param {function(string)=} onComplete
 */
_BrowserPollConnection.FirebaseIFrameScriptHolder.nodeRestRequest = function (req, onComplete) {
    if (!_BrowserPollConnection.FirebaseIFrameScriptHolder.request) _BrowserPollConnection.FirebaseIFrameScriptHolder.request = require('request');
    _BrowserPollConnection.FirebaseIFrameScriptHolder.request(req, function (error, response, body) {
        if (error) throw 'Rest request for ' + req.url + ' failed.';
        if (onComplete) onComplete(body);
    });
};
/**
 * @param {!string} url
 * @param {function()} loadCB
 */
_BrowserPollConnection.FirebaseIFrameScriptHolder.prototype.doNodeLongPoll = function (url, loadCB) {
    var self = this;
    _BrowserPollConnection.FirebaseIFrameScriptHolder.nodeRestRequest({ url: url, forever: true }, function (body) {
        self.evalBody(body);
        loadCB();
    });
};
/**
 * Evaluates the string contents of a jsonp response.
 * @param {!string} body
 */
_BrowserPollConnection.FirebaseIFrameScriptHolder.prototype.evalBody = function (body) {
    var jsonpCB;
    //jsonpCB is externed in firebase-extern.js
    eval('jsonpCB = function(' + _BrowserPollConnection.FIREBASE_LONGPOLL_COMMAND_CB_NAME + ', ' + _BrowserPollConnection.FIREBASE_LONGPOLL_DATA_CB_NAME + ') {' + body + '}');
    jsonpCB(this.commandCB, this.onMessageCB);
};
//# sourceMappingURL=nodePatches.js.map

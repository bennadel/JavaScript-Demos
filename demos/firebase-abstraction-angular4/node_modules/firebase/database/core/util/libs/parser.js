/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseURL = exports.parseRepoInfo = undefined;

var _Path = require('../Path');

var _RepoInfo = require('../../RepoInfo');

var _util = require('../util');

/**
 * @param {!string} pathString
 * @return {string}
 */
function decodePath(pathString) {
    var pathStringDecoded = '';
    var pieces = pathString.split('/');
    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].length > 0) {
            var piece = pieces[i];
            try {
                piece = decodeURIComponent(piece.replace(/\+/g, ' '));
            } catch (e) {}
            pathStringDecoded += '/' + piece;
        }
    }
    return pathStringDecoded;
}
/**
 *
 * @param {!string} dataURL
 * @return {{repoInfo: !RepoInfo, path: !Path}}
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
var parseRepoInfo = exports.parseRepoInfo = function parseRepoInfo(dataURL) {
    var parsedUrl = parseURL(dataURL),
        namespace = parsedUrl.subdomain;
    if (parsedUrl.domain === 'firebase') {
        (0, _util.fatal)(parsedUrl.host + ' is no longer supported. ' + 'Please use <YOUR FIREBASE>.firebaseio.com instead');
    }
    // Catch common error of uninitialized namespace value.
    if (!namespace || namespace == 'undefined') {
        (0, _util.fatal)('Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com');
    }
    if (!parsedUrl.secure) {
        (0, _util.warnIfPageIsSecure)();
    }
    var webSocketOnly = parsedUrl.scheme === 'ws' || parsedUrl.scheme === 'wss';
    return {
        repoInfo: new _RepoInfo.RepoInfo(parsedUrl.host, parsedUrl.secure, namespace, webSocketOnly),
        path: new _Path.Path(parsedUrl.pathString)
    };
};
/**
 *
 * @param {!string} dataURL
 * @return {{host: string, port: number, domain: string, subdomain: string, secure: boolean, scheme: string, pathString: string}}
 */
var parseURL = exports.parseURL = function parseURL(dataURL) {
    // Default to empty strings in the event of a malformed string.
    var host = '',
        domain = '',
        subdomain = '',
        pathString = '';
    // Always default to SSL, unless otherwise specified.
    var secure = true,
        scheme = 'https',
        port = 443;
    // Don't do any validation here. The caller is responsible for validating the result of parsing.
    if (typeof dataURL === 'string') {
        // Parse scheme.
        var colonInd = dataURL.indexOf('//');
        if (colonInd >= 0) {
            scheme = dataURL.substring(0, colonInd - 1);
            dataURL = dataURL.substring(colonInd + 2);
        }
        // Parse host and path.
        var slashInd = dataURL.indexOf('/');
        if (slashInd === -1) {
            slashInd = dataURL.length;
        }
        host = dataURL.substring(0, slashInd);
        pathString = decodePath(dataURL.substring(slashInd));
        var parts = host.split('.');
        if (parts.length === 3) {
            // Normalize namespaces to lowercase to share storage / connection.
            domain = parts[1];
            subdomain = parts[0].toLowerCase();
        } else if (parts.length === 2) {
            domain = parts[0];
        }
        // If we have a port, use scheme for determining if it's secure.
        colonInd = host.indexOf(':');
        if (colonInd >= 0) {
            secure = scheme === 'https' || scheme === 'wss';
            port = parseInt(host.substring(colonInd + 1), 10);
        }
    }
    return {
        host: host,
        port: port,
        domain: domain,
        subdomain: subdomain,
        secure: secure,
        scheme: scheme,
        pathString: pathString
    };
};
//# sourceMappingURL=parser.js.map

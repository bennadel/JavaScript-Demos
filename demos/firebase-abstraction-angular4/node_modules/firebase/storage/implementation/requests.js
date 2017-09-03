/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resumableUploadChunkSize = exports.ResumableUploadStatus = undefined;
exports.handlerCheck = handlerCheck;
exports.metadataHandler = metadataHandler;
exports.sharedErrorHandler = sharedErrorHandler;
exports.objectErrorHandler = objectErrorHandler;
exports.getMetadata = getMetadata;
exports.updateMetadata = updateMetadata;
exports.deleteObject = deleteObject;
exports.determineContentType_ = determineContentType_;
exports.metadataForUpload_ = metadataForUpload_;
exports.multipartUpload = multipartUpload;
exports.checkResumeHeader_ = checkResumeHeader_;
exports.createResumableUpload = createResumableUpload;
exports.getResumableUploadStatus = getResumableUploadStatus;
exports.continueResumableUpload = continueResumableUpload;

var _array = require('./array');

var array = _interopRequireWildcard(_array);

var _blob = require('./blob');

var _error = require('./error');

var errorsExports = _interopRequireWildcard(_error);

var _metadata = require('./metadata');

var MetadataUtils = _interopRequireWildcard(_metadata);

var _object = require('./object');

var object = _interopRequireWildcard(_object);

var _requestinfo = require('./requestinfo');

var _type = require('./type');

var type = _interopRequireWildcard(_type);

var _url = require('./url');

var UrlUtils = _interopRequireWildcard(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Throws the UNKNOWN FirebaseStorageError if cndn is false.
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
function handlerCheck(cndn) {
    if (!cndn) {
        throw errorsExports.unknown();
    }
}
function metadataHandler(authWrapper, mappings) {
    function handler(xhr, text) {
        var metadata = MetadataUtils.fromResourceString(authWrapper, text, mappings);
        handlerCheck(metadata !== null);
        return metadata;
    }
    return handler;
}
function sharedErrorHandler(location) {
    function errorHandler(xhr, err) {
        var newErr;
        if (xhr.getStatus() === 401) {
            newErr = errorsExports.unauthenticated();
        } else {
            if (xhr.getStatus() === 402) {
                newErr = errorsExports.quotaExceeded(location.bucket);
            } else {
                if (xhr.getStatus() === 403) {
                    newErr = errorsExports.unauthorized(location.path);
                } else {
                    newErr = err;
                }
            }
        }
        newErr.setServerResponseProp(err.serverResponseProp());
        return newErr;
    }
    return errorHandler;
}
function objectErrorHandler(location) {
    var shared = sharedErrorHandler(location);
    function errorHandler(xhr, err) {
        var newErr = shared(xhr, err);
        if (xhr.getStatus() === 404) {
            newErr = errorsExports.objectNotFound(location.path);
        }
        newErr.setServerResponseProp(err.serverResponseProp());
        return newErr;
    }
    return errorHandler;
}
function getMetadata(authWrapper, location, mappings) {
    var urlPart = location.fullServerUrl();
    var url = UrlUtils.makeNormalUrl(urlPart);
    var method = 'GET';
    var timeout = authWrapper.maxOperationRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, method, metadataHandler(authWrapper, mappings), timeout);
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function updateMetadata(authWrapper, location, metadata, mappings) {
    var urlPart = location.fullServerUrl();
    var url = UrlUtils.makeNormalUrl(urlPart);
    var method = 'PATCH';
    var body = MetadataUtils.toResourceString(metadata, mappings);
    var headers = { 'Content-Type': 'application/json; charset=utf-8' };
    var timeout = authWrapper.maxOperationRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, method, metadataHandler(authWrapper, mappings), timeout);
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function deleteObject(authWrapper, location) {
    var urlPart = location.fullServerUrl();
    var url = UrlUtils.makeNormalUrl(urlPart);
    var method = 'DELETE';
    var timeout = authWrapper.maxOperationRetryTime();
    function handler(xhr, text) {}
    var requestInfo = new _requestinfo.RequestInfo(url, method, handler, timeout);
    requestInfo.successCodes = [200, 204];
    requestInfo.errorHandler = objectErrorHandler(location);
    return requestInfo;
}
function determineContentType_(metadata, blob) {
    return metadata && metadata['contentType'] || blob && blob.type() || 'application/octet-stream';
}
function metadataForUpload_(location, blob, opt_metadata) {
    var metadata = object.clone(opt_metadata);
    metadata['fullPath'] = location.path;
    metadata['size'] = blob.size();
    if (!metadata['contentType']) {
        metadata['contentType'] = determineContentType_(null, blob);
    }
    return metadata;
}
function multipartUpload(authWrapper, location, mappings, blob, opt_metadata) {
    var urlPart = location.bucketOnlyServerUrl();
    var headers = {
        'X-Goog-Upload-Protocol': 'multipart'
    };
    function genBoundary() {
        var str = '';
        for (var i = 0; i < 2; i++) {
            str = str + Math.random().toString().slice(2);
        }
        return str;
    }
    var boundary = genBoundary();
    headers['Content-Type'] = 'multipart/related; boundary=' + boundary;
    var metadata = metadataForUpload_(location, blob, opt_metadata);
    var metadataString = MetadataUtils.toResourceString(metadata, mappings);
    var preBlobPart = '--' + boundary + '\r\n' + 'Content-Type: application/json; charset=utf-8\r\n\r\n' + metadataString + '\r\n--' + boundary + '\r\n' + 'Content-Type: ' + metadata['contentType'] + '\r\n\r\n';
    var postBlobPart = '\r\n--' + boundary + '--';
    var body = _blob.FbsBlob.getBlob(preBlobPart, blob, postBlobPart);
    if (body === null) {
        throw errorsExports.cannotSliceBlob();
    }
    var urlParams = { name: metadata['fullPath'] };
    var url = UrlUtils.makeUploadUrl(urlPart);
    var method = 'POST';
    var timeout = authWrapper.maxUploadRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, method, metadataHandler(authWrapper, mappings), timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param current The number of bytes that have been uploaded so far.
 * @param total The total number of bytes in the upload.
 * @param opt_finalized True if the server has finished the upload.
 * @param opt_metadata The upload metadata, should
 *     only be passed if opt_finalized is true.
 * @struct
 */
var ResumableUploadStatus = function () {
    function ResumableUploadStatus(current, total, finalized, metadata) {
        this.current = current;
        this.total = total;
        this.finalized = !!finalized;
        this.metadata = metadata || null;
    }
    return ResumableUploadStatus;
}();
exports.ResumableUploadStatus = ResumableUploadStatus;
function checkResumeHeader_(xhr, opt_allowed) {
    var status;
    try {
        status = xhr.getResponseHeader('X-Goog-Upload-Status');
    } catch (e) {
        handlerCheck(false);
    }
    var allowed = opt_allowed || ['active'];
    handlerCheck(array.contains(allowed, status));
    return status;
}
function createResumableUpload(authWrapper, location, mappings, blob, opt_metadata) {
    var urlPart = location.bucketOnlyServerUrl();
    var metadata = metadataForUpload_(location, blob, opt_metadata);
    var urlParams = { name: metadata['fullPath'] };
    var url = UrlUtils.makeUploadUrl(urlPart);
    var method = 'POST';
    var headers = {
        'X-Goog-Upload-Protocol': 'resumable',
        'X-Goog-Upload-Command': 'start',
        'X-Goog-Upload-Header-Content-Length': blob.size(),
        'X-Goog-Upload-Header-Content-Type': metadata['contentType'],
        'Content-Type': 'application/json; charset=utf-8'
    };
    var body = MetadataUtils.toResourceString(metadata, mappings);
    var timeout = authWrapper.maxUploadRetryTime();
    function handler(xhr, text) {
        checkResumeHeader_(xhr);
        var url;
        try {
            url = xhr.getResponseHeader('X-Goog-Upload-URL');
        } catch (e) {
            handlerCheck(false);
        }
        handlerCheck(type.isString(url));
        return url;
    }
    var requestInfo = new _requestinfo.RequestInfo(url, method, handler, timeout);
    requestInfo.urlParams = urlParams;
    requestInfo.headers = headers;
    requestInfo.body = body;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 */
function getResumableUploadStatus(authWrapper, location, url, blob) {
    var headers = { 'X-Goog-Upload-Command': 'query' };
    function handler(xhr, text) {
        var status = checkResumeHeader_(xhr, ['active', 'final']);
        var sizeString;
        try {
            sizeString = xhr.getResponseHeader('X-Goog-Upload-Size-Received');
        } catch (e) {
            handlerCheck(false);
        }
        var size = parseInt(sizeString, 10);
        handlerCheck(!isNaN(size));
        return new ResumableUploadStatus(size, blob.size(), status === 'final');
    }
    var method = 'POST';
    var timeout = authWrapper.maxUploadRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, method, handler, timeout);
    requestInfo.headers = headers;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
/**
 * Any uploads via the resumable upload API must transfer a number of bytes
 * that is a multiple of this number.
 */
var resumableUploadChunkSize = exports.resumableUploadChunkSize = 256 * 1024;
/**
 * @param url From a call to fbs.requests.createResumableUpload.
 * @param chunkSize Number of bytes to upload.
 * @param opt_status The previous status.
 *     If not passed or null, we start from the beginning.
 * @throws fbs.Error If the upload is already complete, the passed in status
 *     has a final size inconsistent with the blob, or the blob cannot be sliced
 *     for upload.
 */
function continueResumableUpload(location, authWrapper, url, blob, chunkSize, mappings, opt_status, opt_progressCallback) {
    // TODO(andysoto): standardize on internal asserts
    // assert(!(opt_status && opt_status.finalized));
    var status = new ResumableUploadStatus(0, 0);
    if (opt_status) {
        status.current = opt_status.current;
        status.total = opt_status.total;
    } else {
        status.current = 0;
        status.total = blob.size();
    }
    if (blob.size() !== status.total) {
        throw errorsExports.serverFileWrongSize();
    }
    var bytesLeft = status.total - status.current;
    var bytesToUpload = bytesLeft;
    if (chunkSize > 0) {
        bytesToUpload = Math.min(bytesToUpload, chunkSize);
    }
    var startByte = status.current;
    var endByte = startByte + bytesToUpload;
    var uploadCommand = bytesToUpload === bytesLeft ? 'upload, finalize' : 'upload';
    var headers = {
        'X-Goog-Upload-Command': uploadCommand,
        'X-Goog-Upload-Offset': status.current
    };
    var body = blob.slice(startByte, endByte);
    if (body === null) {
        throw errorsExports.cannotSliceBlob();
    }
    function handler(xhr, text) {
        // TODO(andysoto): Verify the MD5 of each uploaded range:
        // the 'x-range-md5' header comes back with status code 308 responses.
        // We'll only be able to bail out though, because you can't re-upload a
        // range that you previously uploaded.
        var uploadStatus = checkResumeHeader_(xhr, ['active', 'final']);
        var newCurrent = status.current + bytesToUpload;
        var size = blob.size();
        var metadata;
        if (uploadStatus === 'final') {
            metadata = metadataHandler(authWrapper, mappings)(xhr, text);
        } else {
            metadata = null;
        }
        return new ResumableUploadStatus(newCurrent, size, uploadStatus === 'final', metadata);
    }
    var method = 'POST';
    var timeout = authWrapper.maxUploadRetryTime();
    var requestInfo = new _requestinfo.RequestInfo(url, method, handler, timeout);
    requestInfo.headers = headers;
    requestInfo.body = body.uploadData();
    requestInfo.progressCallback = opt_progressCallback || null;
    requestInfo.errorHandler = sharedErrorHandler(location);
    return requestInfo;
}
//# sourceMappingURL=requests.js.map

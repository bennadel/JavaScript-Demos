/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Reference = undefined;

var _args = require('./implementation/args');

var args = _interopRequireWildcard(_args);

var _blob = require('./implementation/blob');

var _error = require('./implementation/error');

var errorsExports = _interopRequireWildcard(_error);

var _location = require('./implementation/location');

var _metadata = require('./implementation/metadata');

var metadata = _interopRequireWildcard(_metadata);

var _object = require('./implementation/object');

var object = _interopRequireWildcard(_object);

var _path = require('./implementation/path');

var path = _interopRequireWildcard(_path);

var _requests = require('./implementation/requests');

var requests = _interopRequireWildcard(_requests);

var _string = require('./implementation/string');

var fbsString = _interopRequireWildcard(_string);

var _type = require('./implementation/type');

var type = _interopRequireWildcard(_type);

var _task = require('./task');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Provides methods to interact with a bucket in the Firebase Storage service.
 * @param location An fbs.location, or the URL at
 *     which to base this object, in one of the following forms:
 *         gs://<bucket>/<object-path>
 *         http[s]://firebasestorage.googleapis.com/
 *                     <api-version>/b/<bucket>/o/<object-path>
 *     Any query or fragment strings will be ignored in the http[s]
 *     format. If no value is passed, the storage object will use a URL based on
 *     the project ID of the base firebase.App instance.
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
/**
 * @fileoverview Defines the Firebase Storage Reference class.
 */
var Reference = function () {
    function Reference(authWrapper, location) {
        this.authWrapper = authWrapper;
        if (location instanceof _location.Location) {
            this.location = location;
        } else {
            this.location = _location.Location.makeFromUrl(location);
        }
    }
    /**
     * @return The URL for the bucket and path this object references,
     *     in the form gs://<bucket>/<object-path>
     * @override
     */
    Reference.prototype.toString = function () {
        args.validate('toString', [], arguments);
        return 'gs://' + this.location.bucket + '/' + this.location.path;
    };
    Reference.prototype.newRef = function (authWrapper, location) {
        return new Reference(authWrapper, location);
    };
    Reference.prototype.mappings = function () {
        return metadata.getMappings();
    };
    /**
     * @return A reference to the object obtained by
     *     appending childPath, removing any duplicate, beginning, or trailing
     *     slashes.
     */
    Reference.prototype.child = function (childPath) {
        args.validate('child', [args.stringSpec()], arguments);
        var newPath = path.child(this.location.path, childPath);
        var location = new _location.Location(this.location.bucket, newPath);
        return this.newRef(this.authWrapper, location);
    };
    Object.defineProperty(Reference.prototype, "parent", {
        /**
         * @return A reference to the parent of the
         *     current object, or null if the current object is the root.
         */
        get: function get() {
            var newPath = path.parent(this.location.path);
            if (newPath === null) {
                return null;
            }
            var location = new _location.Location(this.location.bucket, newPath);
            return this.newRef(this.authWrapper, location);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "root", {
        /**
         * @return An reference to the root of this
         *     object's bucket.
         */
        get: function get() {
            var location = new _location.Location(this.location.bucket, '');
            return this.newRef(this.authWrapper, location);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "bucket", {
        get: function get() {
            return this.location.bucket;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "fullPath", {
        get: function get() {
            return this.location.path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "name", {
        get: function get() {
            return path.lastComponent(this.location.path);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "storage", {
        get: function get() {
            return this.authWrapper.service();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Uploads a blob to this object's location.
     * @param data The blob to upload.
     * @return An UploadTask that lets you control and
     *     observe the upload.
     */
    Reference.prototype.put = function (data, metadata) {
        if (metadata === void 0) {
            metadata = null;
        }
        args.validate('put', [args.uploadDataSpec(), args.metadataSpec(true)], arguments);
        this.throwIfRoot_('put');
        return new _task.UploadTask(this, this.authWrapper, this.location, this.mappings(), new _blob.FbsBlob(data), metadata);
    };
    /**
     * Uploads a string to this object's location.
     * @param string The string to upload.
     * @param opt_format The format of the string to upload.
     * @return An UploadTask that lets you control and
     *     observe the upload.
     */
    Reference.prototype.putString = function (string, format, opt_metadata) {
        if (format === void 0) {
            format = _string.StringFormat.RAW;
        }
        args.validate('putString', [args.stringSpec(), args.stringSpec(fbsString.formatValidator, true), args.metadataSpec(true)], arguments);
        this.throwIfRoot_('putString');
        var data = fbsString.dataFromString(format, string);
        var metadata = object.clone(opt_metadata);
        if (!type.isDef(metadata['contentType']) && type.isDef(data.contentType)) {
            metadata['contentType'] = data.contentType;
        }
        return new _task.UploadTask(this, this.authWrapper, this.location, this.mappings(), new _blob.FbsBlob(data.data, true), metadata);
    };
    /**
     * Deletes the object at this location.
     * @return A promise that resolves if the deletion succeeds.
     */
    Reference.prototype.delete = function () {
        args.validate('delete', [], arguments);
        this.throwIfRoot_('delete');
        var self = this;
        return this.authWrapper.getAuthToken().then(function (authToken) {
            var requestInfo = requests.deleteObject(self.authWrapper, self.location);
            return self.authWrapper.makeRequest(requestInfo, authToken).getPromise();
        });
    };
    /**
     *     A promise that resolves with the metadata for this object. If this
     *     object doesn't exist or metadata cannot be retreived, the promise is
     *     rejected.
     */
    Reference.prototype.getMetadata = function () {
        args.validate('getMetadata', [], arguments);
        this.throwIfRoot_('getMetadata');
        var self = this;
        return this.authWrapper.getAuthToken().then(function (authToken) {
            var requestInfo = requests.getMetadata(self.authWrapper, self.location, self.mappings());
            return self.authWrapper.makeRequest(requestInfo, authToken).getPromise();
        });
    };
    /**
     * Updates the metadata for this object.
     * @param metadata The new metadata for the object.
     *     Only values that have been explicitly set will be changed. Explicitly
     *     setting a value to null will remove the metadata.
     * @return A promise that resolves
     *     with the new metadata for this object.
     *     @see firebaseStorage.Reference.prototype.getMetadata
     */
    Reference.prototype.updateMetadata = function (metadata) {
        args.validate('updateMetadata', [args.metadataSpec()], arguments);
        this.throwIfRoot_('updateMetadata');
        var self = this;
        return this.authWrapper.getAuthToken().then(function (authToken) {
            var requestInfo = requests.updateMetadata(self.authWrapper, self.location, metadata, self.mappings());
            return self.authWrapper.makeRequest(requestInfo, authToken).getPromise();
        });
    };
    /**
     * @return A promise that resolves with the download
     *     URL for this object.
     */
    Reference.prototype.getDownloadURL = function () {
        args.validate('getDownloadURL', [], arguments);
        this.throwIfRoot_('getDownloadURL');
        return this.getMetadata().then(function (metadata) {
            var url = metadata['downloadURLs'][0];
            if (type.isDef(url)) {
                return url;
            } else {
                throw errorsExports.noDownloadURL();
            }
        });
    };
    Reference.prototype.throwIfRoot_ = function (name) {
        if (this.location.path === '') {
            throw errorsExports.invalidRootOperation(name);
        }
    };
    return Reference;
}();
exports.Reference = Reference;
//# sourceMappingURL=reference.js.map

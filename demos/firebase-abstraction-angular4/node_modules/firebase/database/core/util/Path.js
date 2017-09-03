/*! @license Firebase v4.3.0
Build: rev-bd8265e
Terms: https://firebase.google.com/terms/ */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidationPath = exports.Path = undefined;

var _util = require('./util');

var _utf = require('../../../utils/utf8');

/**
 * An immutable object representing a parsed path.  It's immutable so that you
 * can pass them around to other functions without worrying about them changing
 * it.
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
var Path = function () {
    /**
     * @param {string|Array.<string>} pathOrString Path string to parse,
     *      or another path, or the raw tokens array
     * @param {number=} pieceNum
     */
    function Path(pathOrString, pieceNum) {
        if (pieceNum === void 0) {
            this.pieces_ = pathOrString.split('/');
            // Remove empty pieces.
            var copyTo = 0;
            for (var i = 0; i < this.pieces_.length; i++) {
                if (this.pieces_[i].length > 0) {
                    this.pieces_[copyTo] = this.pieces_[i];
                    copyTo++;
                }
            }
            this.pieces_.length = copyTo;
            this.pieceNum_ = 0;
        } else {
            this.pieces_ = pathOrString;
            this.pieceNum_ = pieceNum;
        }
    }
    Object.defineProperty(Path, "Empty", {
        /**
         * Singleton to represent an empty path
         *
         * @const
         */
        get: function get() {
            return new Path('');
        },
        enumerable: true,
        configurable: true
    });
    Path.prototype.getFront = function () {
        if (this.pieceNum_ >= this.pieces_.length) return null;
        return this.pieces_[this.pieceNum_];
    };
    /**
     * @return {number} The number of segments in this path
     */
    Path.prototype.getLength = function () {
        return this.pieces_.length - this.pieceNum_;
    };
    /**
     * @return {!Path}
     */
    Path.prototype.popFront = function () {
        var pieceNum = this.pieceNum_;
        if (pieceNum < this.pieces_.length) {
            pieceNum++;
        }
        return new Path(this.pieces_, pieceNum);
    };
    /**
     * @return {?string}
     */
    Path.prototype.getBack = function () {
        if (this.pieceNum_ < this.pieces_.length) return this.pieces_[this.pieces_.length - 1];
        return null;
    };
    Path.prototype.toString = function () {
        var pathString = '';
        for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
            if (this.pieces_[i] !== '') pathString += '/' + this.pieces_[i];
        }
        return pathString || '/';
    };
    Path.prototype.toUrlEncodedString = function () {
        var pathString = '';
        for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
            if (this.pieces_[i] !== '') pathString += '/' + encodeURIComponent(String(this.pieces_[i]));
        }
        return pathString || '/';
    };
    /**
     * Shallow copy of the parts of the path.
     *
     * @param {number=} begin
     * @return {!Array<string>}
     */
    Path.prototype.slice = function (begin) {
        if (begin === void 0) {
            begin = 0;
        }
        return this.pieces_.slice(this.pieceNum_ + begin);
    };
    /**
     * @return {?Path}
     */
    Path.prototype.parent = function () {
        if (this.pieceNum_ >= this.pieces_.length) return null;
        var pieces = [];
        for (var i = this.pieceNum_; i < this.pieces_.length - 1; i++) {
            pieces.push(this.pieces_[i]);
        }return new Path(pieces, 0);
    };
    /**
     * @param {string|!Path} childPathObj
     * @return {!Path}
     */
    Path.prototype.child = function (childPathObj) {
        var pieces = [];
        for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
            pieces.push(this.pieces_[i]);
        }if (childPathObj instanceof Path) {
            for (var i = childPathObj.pieceNum_; i < childPathObj.pieces_.length; i++) {
                pieces.push(childPathObj.pieces_[i]);
            }
        } else {
            var childPieces = childPathObj.split('/');
            for (var i = 0; i < childPieces.length; i++) {
                if (childPieces[i].length > 0) pieces.push(childPieces[i]);
            }
        }
        return new Path(pieces, 0);
    };
    /**
     * @return {boolean} True if there are no segments in this path
     */
    Path.prototype.isEmpty = function () {
        return this.pieceNum_ >= this.pieces_.length;
    };
    /**
     * @param {!Path} outerPath
     * @param {!Path} innerPath
     * @return {!Path} The path from outerPath to innerPath
     */
    Path.relativePath = function (outerPath, innerPath) {
        var outer = outerPath.getFront(),
            inner = innerPath.getFront();
        if (outer === null) {
            return innerPath;
        } else if (outer === inner) {
            return Path.relativePath(outerPath.popFront(), innerPath.popFront());
        } else {
            throw new Error('INTERNAL ERROR: innerPath (' + innerPath + ') is not within ' + 'outerPath (' + outerPath + ')');
        }
    };
    /**
     * @param {!Path} left
     * @param {!Path} right
     * @return {number} -1, 0, 1 if left is less, equal, or greater than the right.
     */
    Path.comparePaths = function (left, right) {
        var leftKeys = left.slice();
        var rightKeys = right.slice();
        for (var i = 0; i < leftKeys.length && i < rightKeys.length; i++) {
            var cmp = (0, _util.nameCompare)(leftKeys[i], rightKeys[i]);
            if (cmp !== 0) return cmp;
        }
        if (leftKeys.length === rightKeys.length) return 0;
        return leftKeys.length < rightKeys.length ? -1 : 1;
    };
    /**
     *
     * @param {Path} other
     * @return {boolean} true if paths are the same.
     */
    Path.prototype.equals = function (other) {
        if (this.getLength() !== other.getLength()) {
            return false;
        }
        for (var i = this.pieceNum_, j = other.pieceNum_; i <= this.pieces_.length; i++, j++) {
            if (this.pieces_[i] !== other.pieces_[j]) {
                return false;
            }
        }
        return true;
    };
    /**
     *
     * @param {!Path} other
     * @return {boolean} True if this path is a parent (or the same as) other
     */
    Path.prototype.contains = function (other) {
        var i = this.pieceNum_;
        var j = other.pieceNum_;
        if (this.getLength() > other.getLength()) {
            return false;
        }
        while (i < this.pieces_.length) {
            if (this.pieces_[i] !== other.pieces_[j]) {
                return false;
            }
            ++i;
            ++j;
        }
        return true;
    };
    return Path;
}(); // end Path
exports.Path = Path;
/**
 * Dynamic (mutable) path used to count path lengths.
 *
 * This class is used to efficiently check paths for valid
 * length (in UTF8 bytes) and depth (used in path validation).
 *
 * Throws Error exception if path is ever invalid.
 *
 * The definition of a path always begins with '/'.
 */

var ValidationPath = function () {
    /**
     * @param {!Path} path Initial Path.
     * @param {string} errorPrefix_ Prefix for any error messages.
     */
    function ValidationPath(path, errorPrefix_) {
        this.errorPrefix_ = errorPrefix_;
        /** @type {!Array<string>} */
        this.parts_ = path.slice();
        /** @type {number} Initialize to number of '/' chars needed in path. */
        this.byteLength_ = Math.max(1, this.parts_.length);
        for (var i = 0; i < this.parts_.length; i++) {
            this.byteLength_ += (0, _utf.stringLength)(this.parts_[i]);
        }
        this.checkValid_();
    }
    Object.defineProperty(ValidationPath, "MAX_PATH_DEPTH", {
        /** @const {number} Maximum key depth. */
        get: function get() {
            return 32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationPath, "MAX_PATH_LENGTH_BYTES", {
        /** @const {number} Maximum number of (UTF8) bytes in a Firebase path. */
        get: function get() {
            return 768;
        },
        enumerable: true,
        configurable: true
    });
    /** @param {string} child */
    ValidationPath.prototype.push = function (child) {
        // Count the needed '/'
        if (this.parts_.length > 0) {
            this.byteLength_ += 1;
        }
        this.parts_.push(child);
        this.byteLength_ += (0, _utf.stringLength)(child);
        this.checkValid_();
    };
    ValidationPath.prototype.pop = function () {
        var last = this.parts_.pop();
        this.byteLength_ -= (0, _utf.stringLength)(last);
        // Un-count the previous '/'
        if (this.parts_.length > 0) {
            this.byteLength_ -= 1;
        }
    };
    ValidationPath.prototype.checkValid_ = function () {
        if (this.byteLength_ > ValidationPath.MAX_PATH_LENGTH_BYTES) {
            throw new Error(this.errorPrefix_ + 'has a key path longer than ' + ValidationPath.MAX_PATH_LENGTH_BYTES + ' bytes (' + this.byteLength_ + ').');
        }
        if (this.parts_.length > ValidationPath.MAX_PATH_DEPTH) {
            throw new Error(this.errorPrefix_ + 'path specified exceeds the maximum depth that can be written (' + ValidationPath.MAX_PATH_DEPTH + ') or object contains a cycle ' + this.toErrorString());
        }
    };
    /**
     * String for use in error messages - uses '.' notation for path.
     *
     * @return {string}
     */
    ValidationPath.prototype.toErrorString = function () {
        if (this.parts_.length == 0) {
            return '';
        }
        return "in property '" + this.parts_.join('.') + "'";
    };
    return ValidationPath;
}();
exports.ValidationPath = ValidationPath;
//# sourceMappingURL=Path.js.map

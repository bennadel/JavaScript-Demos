/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper, Map, MapWrapper, StringMapWrapper, isListLikeIterable, iterateListLike } from '../src/facade/collection';
import { isBlank } from '../src/facade/lang';
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @experimental
 */
export var Headers = (function () {
    function Headers(headers) {
        var _this = this;
        if (headers instanceof Headers) {
            this._headersMap = new Map(headers._headersMap);
            return;
        }
        this._headersMap = new Map();
        if (isBlank(headers)) {
            return;
        }
        // headers instanceof StringMap
        StringMapWrapper.forEach(headers, function (v, k) {
            _this._headersMap.set(normalize(k), isListLikeIterable(v) ? v : [v]);
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    Headers.fromResponseHeaderString = function (headersString) {
        var headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var index = line.indexOf(':');
            if (index > 0) {
                var key = line.substring(0, index);
                var value = line.substring(index + 1).trim();
                headers.set(key, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    Headers.prototype.append = function (name, value) {
        name = normalize(name);
        var mapName = this._headersMap.get(name);
        var list = isListLikeIterable(mapName) ? mapName : [];
        list.push(value);
        this._headersMap.set(name, list);
    };
    /**
     * Deletes all header values for the given name.
     */
    Headers.prototype.delete = function (name) { this._headersMap.delete(normalize(name)); };
    Headers.prototype.forEach = function (fn) {
        this._headersMap.forEach(fn);
    };
    /**
     * Returns first header that matches given name.
     */
    Headers.prototype.get = function (header) { return ListWrapper.first(this._headersMap.get(normalize(header))); };
    /**
     * Check for existence of header by given name.
     */
    Headers.prototype.has = function (header) { return this._headersMap.has(normalize(header)); };
    /**
     * Provides names of set headers
     */
    Headers.prototype.keys = function () { return MapWrapper.keys(this._headersMap); };
    /**
     * Sets or overrides header value for given name.
     */
    Headers.prototype.set = function (header, value) {
        var list = [];
        if (isListLikeIterable(value)) {
            var pushValue = value.join(',');
            list.push(pushValue);
        }
        else {
            list.push(value);
        }
        this._headersMap.set(normalize(header), list);
    };
    /**
     * Returns values of all headers.
     */
    Headers.prototype.values = function () { return MapWrapper.values(this._headersMap); };
    /**
     * Returns string of all headers.
     */
    Headers.prototype.toJSON = function () {
        var serializableHeaders = {};
        this._headersMap.forEach(function (values, name) {
            var list = [];
            iterateListLike(values, function (val /** TODO #9100 */) { return list = ListWrapper.concat(list, val.split(',')); });
            serializableHeaders[normalize(name)] = list;
        });
        return serializableHeaders;
    };
    /**
     * Returns list of header values for a given name.
     */
    Headers.prototype.getAll = function (header) {
        var headers = this._headersMap.get(normalize(header));
        return isListLikeIterable(headers) ? headers : [];
    };
    /**
     * This method is not implemented.
     */
    Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
    return Headers;
}());
// "HTTP character sets are identified by case-insensitive tokens"
// Spec at https://tools.ietf.org/html/rfc2616
// This implementation is same as NodeJS.
// see https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_message_headers
function normalize(name) {
    return name.toLowerCase();
}
//# sourceMappingURL=headers.js.map
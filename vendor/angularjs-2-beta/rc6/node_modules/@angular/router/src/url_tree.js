/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PRIMARY_OUTLET } from './shared';
import { forEach, shallowEqual } from './utils/collection';
export function createEmptyUrlTree() {
    return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
}
export function containsTree(container, containee, exact) {
    if (exact) {
        return equalSegmentGroups(container.root, containee.root);
    }
    else {
        return containsSegmentGroup(container.root, containee.root);
    }
}
function equalSegmentGroups(container, containee) {
    if (!equalPath(container.segments, containee.segments))
        return false;
    if (container.numberOfChildren !== containee.numberOfChildren)
        return false;
    for (var c in containee.children) {
        if (!container.children[c])
            return false;
        if (!equalSegmentGroups(container.children[c], containee.children[c]))
            return false;
    }
    return true;
}
function containsSegmentGroup(container, containee) {
    return containsSegmentGroupHelper(container, containee, containee.segments);
}
function containsSegmentGroupHelper(container, containee, containeePaths) {
    if (container.segments.length > containeePaths.length) {
        var current = container.segments.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
            return false;
        if (containee.hasChildren())
            return false;
        return true;
    }
    else if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths))
            return false;
        for (var c in containee.children) {
            if (!container.children[c])
                return false;
            if (!containsSegmentGroup(container.children[c], containee.children[c]))
                return false;
        }
        return true;
    }
    else {
        var current = containeePaths.slice(0, container.segments.length);
        var next = containeePaths.slice(container.segments.length);
        if (!equalPath(container.segments, current))
            return false;
        if (!container.children[PRIMARY_OUTLET])
            return false;
        return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next);
    }
}
/**
 * A URL in the tree form.
 *
 * @stable
 */
export var UrlTree = (function () {
    /**
     * @internal
     */
    function UrlTree(root, queryParams, fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    UrlTree.prototype.toString = function () { return new DefaultUrlSerializer().serialize(this); };
    return UrlTree;
}());
/**
 * @stable
 */
export var UrlSegmentGroup = (function () {
    function UrlSegmentGroup(segments, children) {
        var _this = this;
        this.segments = segments;
        this.children = children;
        this.parent = null;
        forEach(children, function (v, k) { return v.parent = _this; });
    }
    /**
     * Return true if the segment has child segments
     */
    UrlSegmentGroup.prototype.hasChildren = function () { return this.numberOfChildren > 0; };
    Object.defineProperty(UrlSegmentGroup.prototype, "numberOfChildren", {
        /**
         * Returns the number of child sements.
         */
        get: function () { return Object.keys(this.children).length; },
        enumerable: true,
        configurable: true
    });
    UrlSegmentGroup.prototype.toString = function () { return serializePaths(this); };
    return UrlSegmentGroup;
}());
/**
 * @stable
 */
export var UrlSegment = (function () {
    function UrlSegment(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    UrlSegment.prototype.toString = function () { return serializePath(this); };
    return UrlSegment;
}());
export function equalSegments(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
        if (!shallowEqual(a[i].parameters, b[i].parameters))
            return false;
    }
    return true;
}
export function equalPath(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
    }
    return true;
}
export function mapChildrenIntoArray(segment, fn) {
    var res = [];
    forEach(segment.children, function (child, childOutlet) {
        if (childOutlet === PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    forEach(segment.children, function (child, childOutlet) {
        if (childOutlet !== PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    return res;
}
/**
 * Defines a way to serialize/deserialize a url tree.
 *
 * @stable
 */
export var UrlSerializer = (function () {
    function UrlSerializer() {
    }
    return UrlSerializer;
}());
/**
 * A default implementation of the serialization.
 *
 * @stable
 */
export var DefaultUrlSerializer = (function () {
    function DefaultUrlSerializer() {
    }
    DefaultUrlSerializer.prototype.parse = function (url) {
        var p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    };
    DefaultUrlSerializer.prototype.serialize = function (tree) {
        var segment = "/" + serializeSegment(tree.root, true);
        var query = serializeQueryParams(tree.queryParams);
        var fragment = tree.fragment !== null && tree.fragment !== undefined ? "#" + encodeURI(tree.fragment) : '';
        return "" + segment + query + fragment;
    };
    return DefaultUrlSerializer;
}());
export function serializePaths(segment) {
    return segment.segments.map(function (p) { return serializePath(p); }).join('/');
}
function serializeSegment(segment, root) {
    if (segment.hasChildren() && root) {
        var primary = segment.children[PRIMARY_OUTLET] ?
            serializeSegment(segment.children[PRIMARY_OUTLET], false) :
            '';
        var children_1 = [];
        forEach(segment.children, function (v, k) {
            if (k !== PRIMARY_OUTLET) {
                children_1.push(k + ":" + serializeSegment(v, false));
            }
        });
        if (children_1.length > 0) {
            return primary + "(" + children_1.join('//') + ")";
        }
        else {
            return "" + primary;
        }
    }
    else if (segment.hasChildren() && !root) {
        var children = mapChildrenIntoArray(segment, function (v, k) {
            if (k === PRIMARY_OUTLET) {
                return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
            }
            else {
                return [(k + ":" + serializeSegment(v, false))];
            }
        });
        return serializePaths(segment) + "/(" + children.join('//') + ")";
    }
    else {
        return serializePaths(segment);
    }
}
export function encode(s) {
    return encodeURIComponent(s);
}
export function decode(s) {
    return decodeURIComponent(s);
}
export function serializePath(path) {
    return "" + encode(path.path) + serializeParams(path.parameters);
}
function serializeParams(params) {
    return pairs(params).map(function (p) { return (";" + encode(p.first) + "=" + encode(p.second)); }).join('');
}
function serializeQueryParams(params) {
    var strs = pairs(params).map(function (p) { return (encode(p.first) + "=" + encode(p.second)); });
    return strs.length > 0 ? "?" + strs.join("&") : '';
}
var Pair = (function () {
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    return Pair;
}());
function pairs(obj) {
    var res = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push(new Pair(prop, obj[prop]));
        }
    }
    return res;
}
var SEGMENT_RE = /^[^\/\(\)\?;=&#]+/;
function matchSegments(str) {
    SEGMENT_RE.lastIndex = 0;
    var match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_RE = /^[^=\?&#]+/;
function matchQueryParams(str) {
    QUERY_PARAM_RE.lastIndex = 0;
    var match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = /^[^\?&#]+/;
function matchUrlQueryParamValue(str) {
    QUERY_PARAM_VALUE_RE.lastIndex = 0;
    var match = str.match(QUERY_PARAM_VALUE_RE);
    return match ? match[0] : '';
}
var UrlParser = (function () {
    function UrlParser(url) {
        this.url = url;
        this.remaining = url;
    }
    UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
    UrlParser.prototype.capture = function (str) {
        if (!this.remaining.startsWith(str)) {
            throw new Error("Expected \"" + str + "\".");
        }
        this.remaining = this.remaining.substring(str.length);
    };
    UrlParser.prototype.parseRootSegment = function () {
        if (this.remaining.startsWith('/')) {
            this.capture('/');
        }
        if (this.remaining === '' || this.remaining.startsWith('?') || this.remaining.startsWith('#')) {
            return new UrlSegmentGroup([], {});
        }
        else {
            return new UrlSegmentGroup([], this.parseChildren());
        }
    };
    UrlParser.prototype.parseChildren = function () {
        if (this.remaining.length == 0) {
            return {};
        }
        if (this.peekStartsWith('/')) {
            this.capture('/');
        }
        var paths = [];
        if (!this.peekStartsWith('(')) {
            paths.push(this.parseSegments());
        }
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
            this.capture('/');
            paths.push(this.parseSegments());
        }
        var children = {};
        if (this.peekStartsWith('/(')) {
            this.capture('/');
            children = this.parseParens(true);
        }
        var res = {};
        if (this.peekStartsWith('(')) {
            res = this.parseParens(false);
        }
        if (paths.length > 0 || Object.keys(children).length > 0) {
            res[PRIMARY_OUTLET] = new UrlSegmentGroup(paths, children);
        }
        return res;
    };
    UrlParser.prototype.parseSegments = function () {
        var path = matchSegments(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
            throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
        }
        this.capture(path);
        var matrixParams = {};
        if (this.peekStartsWith(';')) {
            matrixParams = this.parseMatrixParams();
        }
        return new UrlSegment(decode(path), matrixParams);
    };
    UrlParser.prototype.parseQueryParams = function () {
        var params = {};
        if (this.peekStartsWith('?')) {
            this.capture('?');
            this.parseQueryParam(params);
            while (this.remaining.length > 0 && this.peekStartsWith('&')) {
                this.capture('&');
                this.parseQueryParam(params);
            }
        }
        return params;
    };
    UrlParser.prototype.parseFragment = function () {
        if (this.peekStartsWith('#')) {
            return decodeURI(this.remaining.substring(1));
        }
        else {
            return null;
        }
    };
    UrlParser.prototype.parseMatrixParams = function () {
        var params = {};
        while (this.remaining.length > 0 && this.peekStartsWith(';')) {
            this.capture(';');
            this.parseParam(params);
        }
        return params;
    };
    UrlParser.prototype.parseParam = function (params) {
        var key = matchSegments(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = '';
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchSegments(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    };
    UrlParser.prototype.parseQueryParam = function (params) {
        var key = matchQueryParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = '';
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchUrlQueryParamValue(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    };
    UrlParser.prototype.parseParens = function (allowPrimary) {
        var segments = {};
        this.capture('(');
        while (!this.peekStartsWith(')') && this.remaining.length > 0) {
            var path = matchSegments(this.remaining);
            var next = this.remaining[path.length];
            // if is is not one of these characters, then the segment was unescaped
            // or the group was not closed
            if (next !== '/' && next !== ')' && next !== ';') {
                throw new Error("Cannot parse url '" + this.url + "'");
            }
            var outletName = void 0;
            if (path.indexOf(':') > -1) {
                outletName = path.substr(0, path.indexOf(':'));
                this.capture(outletName);
                this.capture(':');
            }
            else if (allowPrimary) {
                outletName = PRIMARY_OUTLET;
            }
            var children = this.parseChildren();
            segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] :
                new UrlSegmentGroup([], children);
            if (this.peekStartsWith('//')) {
                this.capture('//');
            }
        }
        this.capture(')');
        return segments;
    };
    return UrlParser;
}());
//# sourceMappingURL=url_tree.js.map
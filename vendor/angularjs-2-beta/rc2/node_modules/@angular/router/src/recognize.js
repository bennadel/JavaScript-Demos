"use strict";
var core_1 = require('@angular/core');
var constants_1 = require('./constants');
var core_private_1 = require('./core_private');
var collection_1 = require('./facade/collection');
var lang_1 = require('./facade/lang');
var promise_1 = require('./facade/promise');
var metadata_1 = require('./metadata/metadata');
var segments_1 = require('./segments');
function recognize(componentResolver, rootComponent, url, existingTree) {
    var matched = new _MatchResult(rootComponent, [url.root], {}, segments_1.rootNode(url).children, []);
    return _constructSegment(componentResolver, matched, segments_1.rootNode(existingTree))
        .then(function (roots) { return new segments_1.RouteTree(roots[0]); });
}
exports.recognize = recognize;
function _recognize(componentResolver, parentComponent, url, existingSegments) {
    var metadata = _readMetadata(parentComponent); // should read from the factory instead
    if (lang_1.isBlank(metadata)) {
        throw new core_1.BaseException("Component '" + lang_1.stringify(parentComponent) + "' does not have route configuration");
    }
    var match;
    try {
        match = _match(metadata, url);
    }
    catch (e) {
        return promise_1.PromiseWrapper.reject(e, null);
    }
    var segmentsWithRightOutlet = existingSegments.filter(function (r) { return r.value.outlet == match.outlet; });
    var segmentWithRightOutlet = segmentsWithRightOutlet.length > 0 ? segmentsWithRightOutlet[0] : null;
    var main = _constructSegment(componentResolver, match, segmentWithRightOutlet);
    var aux = _recognizeMany(componentResolver, parentComponent, match.aux, existingSegments)
        .then(_checkOutletNameUniqueness);
    return promise_1.PromiseWrapper.all([main, aux]).then(collection_1.ListWrapper.flatten);
}
function _recognizeMany(componentResolver, parentComponent, urls, existingSegments) {
    var recognized = urls.map(function (u) { return _recognize(componentResolver, parentComponent, u, existingSegments); });
    return promise_1.PromiseWrapper.all(recognized).then(collection_1.ListWrapper.flatten);
}
function _constructSegment(componentResolver, matched, existingSegment) {
    return componentResolver.resolveComponent(matched.component).then(function (factory) {
        var segment = _createOrReuseSegment(matched, factory, existingSegment);
        var existingChildren = lang_1.isPresent(existingSegment) ? existingSegment.children : [];
        if (matched.leftOverUrl.length > 0) {
            return _recognizeMany(componentResolver, factory.componentType, matched.leftOverUrl, existingChildren)
                .then(function (children) { return [new segments_1.TreeNode(segment, children)]; });
        }
        else {
            return _recognizeLeftOvers(componentResolver, factory.componentType, existingChildren)
                .then(function (children) { return [new segments_1.TreeNode(segment, children)]; });
        }
    });
}
function _createOrReuseSegment(matched, factory, segmentNode) {
    var segment = lang_1.isPresent(segmentNode) ? segmentNode.value : null;
    if (lang_1.isPresent(segment) && segments_1.equalUrlSegments(segment.urlSegments, matched.consumedUrlSegments) &&
        collection_1.StringMapWrapper.equals(segment.parameters, matched.parameters) &&
        segment.outlet == matched.outlet && factory.componentType == segment.type) {
        return segment;
    }
    else {
        return new segments_1.RouteSegment(matched.consumedUrlSegments, matched.parameters, matched.outlet, factory.componentType, factory);
    }
}
function _recognizeLeftOvers(componentResolver, parentComponent, existingSegments) {
    return componentResolver.resolveComponent(parentComponent).then(function (factory) {
        var metadata = _readMetadata(factory.componentType);
        if (lang_1.isBlank(metadata)) {
            return [];
        }
        var r = metadata.routes.filter(function (r) { return r.path == '' || r.path == '/'; });
        if (r.length === 0) {
            return promise_1.PromiseWrapper.resolve([]);
        }
        else {
            var segmentsWithMatchingOutlet = existingSegments.filter(function (r) { return r.value.outlet == constants_1.DEFAULT_OUTLET_NAME; });
            var segmentWithMatchingOutlet_1 = segmentsWithMatchingOutlet.length > 0 ? segmentsWithMatchingOutlet[0] : null;
            var existingChildren = lang_1.isPresent(segmentWithMatchingOutlet_1) ? segmentWithMatchingOutlet_1.children : [];
            return _recognizeLeftOvers(componentResolver, r[0].component, existingChildren)
                .then(function (children) {
                return componentResolver.resolveComponent(r[0].component).then(function (factory) {
                    var segment = _createOrReuseSegment(new _MatchResult(r[0].component, [], {}, [], []), factory, segmentWithMatchingOutlet_1);
                    return [new segments_1.TreeNode(segment, children)];
                });
            });
        }
    });
}
function _match(metadata, url) {
    for (var _i = 0, _a = metadata.routes; _i < _a.length; _i++) {
        var r = _a[_i];
        var matchingResult = _matchWithParts(r, url);
        if (lang_1.isPresent(matchingResult)) {
            return matchingResult;
        }
    }
    var availableRoutes = metadata.routes.map(function (r) { return ("'" + r.path + "'"); }).join(', ');
    throw new core_1.BaseException("Cannot match any routes. Current segment: '" + url.value + "'. Available routes: [" + availableRoutes + "].");
}
function _matchWithParts(route, url) {
    var path = route.path.startsWith('/') ? route.path.substring(1) : route.path;
    if (path == '*') {
        return new _MatchResult(route.component, [], null, [], []);
    }
    var parts = path.split('/');
    var positionalParams = {};
    var consumedUrlSegments = [];
    var lastParent = null;
    var lastSegment = null;
    var current = url;
    for (var i = 0; i < parts.length; ++i) {
        if (lang_1.isBlank(current))
            return null;
        var p_1 = parts[i];
        var isLastSegment = i === parts.length - 1;
        var isLastParent = i === parts.length - 2;
        var isPosParam = p_1.startsWith(':');
        if (!isPosParam && p_1 != current.value.segment)
            return null;
        if (isLastSegment) {
            lastSegment = current;
        }
        if (isLastParent) {
            lastParent = current;
        }
        if (isPosParam) {
            positionalParams[p_1.substring(1)] = current.value.segment;
        }
        consumedUrlSegments.push(current.value);
        current = collection_1.ListWrapper.first(current.children);
    }
    var p = lastSegment.value.parameters;
    var parameters = collection_1.StringMapWrapper.merge(p, positionalParams);
    var axuUrlSubtrees = lang_1.isPresent(lastParent) ? lastParent.children.slice(1) : [];
    return new _MatchResult(route.component, consumedUrlSegments, parameters, lastSegment.children, axuUrlSubtrees);
}
function _checkOutletNameUniqueness(nodes) {
    var names = {};
    nodes.forEach(function (n) {
        var segmentWithSameOutletName = names[n.value.outlet];
        if (lang_1.isPresent(segmentWithSameOutletName)) {
            var p = segmentWithSameOutletName.stringifiedUrlSegments;
            var c = n.value.stringifiedUrlSegments;
            throw new core_1.BaseException("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
    });
    return nodes;
}
var _MatchResult = (function () {
    function _MatchResult(component, consumedUrlSegments, parameters, leftOverUrl, aux) {
        this.component = component;
        this.consumedUrlSegments = consumedUrlSegments;
        this.parameters = parameters;
        this.leftOverUrl = leftOverUrl;
        this.aux = aux;
    }
    Object.defineProperty(_MatchResult.prototype, "outlet", {
        get: function () {
            return this.consumedUrlSegments.length === 0 || lang_1.isBlank(this.consumedUrlSegments[0].outlet) ?
                constants_1.DEFAULT_OUTLET_NAME :
                this.consumedUrlSegments[0].outlet;
        },
        enumerable: true,
        configurable: true
    });
    return _MatchResult;
}());
function _readMetadata(componentType) {
    var metadata = core_private_1.reflector.annotations(componentType).filter(function (f) { return f instanceof metadata_1.RoutesMetadata; });
    return collection_1.ListWrapper.first(metadata);
}
//# sourceMappingURL=recognize.js.map
"use strict";
var core_1 = require('@angular/core');
var constants_1 = require('./constants');
var async_1 = require('./facade/async');
var collection_1 = require('./facade/collection');
var lang_1 = require('./facade/lang');
var lifecycle_reflector_1 = require('./lifecycle_reflector');
var link_1 = require('./link');
var recognize_1 = require('./recognize');
var segments_1 = require('./segments');
var RouterOutletMap = (function () {
    function RouterOutletMap() {
        /** @internal */
        this._outlets = {};
    }
    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
    return RouterOutletMap;
}());
exports.RouterOutletMap = RouterOutletMap;
/**
 * The `Router` is responsible for mapping URLs to components.
 *
 * You can see the state of the router by inspecting the read-only fields `router.urlTree`
 * and `router.routeTree`.
 */
var Router = (function () {
    /**
     * @internal
     */
    function Router(_rootComponent, _rootComponentType, _componentResolver, _urlSerializer, _routerOutletMap, _location) {
        this._rootComponent = _rootComponent;
        this._rootComponentType = _rootComponentType;
        this._componentResolver = _componentResolver;
        this._urlSerializer = _urlSerializer;
        this._routerOutletMap = _routerOutletMap;
        this._location = _location;
        this._changes = new async_1.EventEmitter();
        this._routeTree = segments_1.createEmptyRouteTree(this._rootComponentType);
        this._setUpLocationChangeListener();
        this.navigateByUrl(this._location.path());
    }
    Object.defineProperty(Router.prototype, "urlTree", {
        /**
         * Returns the current url tree.
         */
        get: function () { return this._urlTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "routeTree", {
        /**
         * Returns the current route tree.
         */
        get: function () { return this._routeTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "changes", {
        /**
         * An observable or url changes from the router.
         */
        get: function () { return this._changes; },
        enumerable: true,
        configurable: true
    });
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     * ```
     */
    Router.prototype.navigateByUrl = function (url) {
        return this._navigate(this._urlSerializer.parse(url));
    };
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no segment is provided, the navigation is absolute.
     *
     * ### Usage
     *
     * ```
     * router.navigate(['team', 33, 'team', '11], segment);
     * ```
     */
    Router.prototype.navigate = function (commands, segment) {
        return this._navigate(this.createUrlTree(commands, segment));
    };
    /**
     * @internal
     */
    Router.prototype.dispose = function () { async_1.ObservableWrapper.dispose(this._locationSubscription); };
    /**
     * Applies an array of commands to the current url tree and creates
     * a new url tree.
     *
     * When given a segment, applies the given commands starting from the segment.
     * When not given a segment, applies the given command starting from the root.
     *
     * ### Usage
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static fragments like this
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // assuming the current url is `/team/33/user/11` and the segment points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], segment);
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], segment);
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], segment);
     * ```
     */
    Router.prototype.createUrlTree = function (commands, segment) {
        var s = lang_1.isPresent(segment) ? segment : this._routeTree.root;
        return link_1.link(s, this._routeTree, this.urlTree, commands);
    };
    /**
     * Serializes a {@link UrlTree} into a string.
     */
    Router.prototype.serializeUrl = function (url) { return this._urlSerializer.serialize(url); };
    Router.prototype._setUpLocationChangeListener = function () {
        var _this = this;
        this._locationSubscription = this._location.subscribe(function (change) { _this._navigate(_this._urlSerializer.parse(change['url']), change['pop']); });
    };
    Router.prototype._navigate = function (url, preventPushState) {
        var _this = this;
        this._urlTree = url;
        return recognize_1.recognize(this._componentResolver, this._rootComponentType, url, this._routeTree)
            .then(function (currTree) {
            return new _ActivateSegments(currTree, _this._routeTree)
                .activate(_this._routerOutletMap, _this._rootComponent)
                .then(function (updated) {
                if (updated) {
                    _this._routeTree = currTree;
                    if (lang_1.isBlank(preventPushState) || !preventPushState) {
                        var path = _this._urlSerializer.serialize(_this._urlTree);
                        if (_this._location.isCurrentPathEqualTo(path)) {
                            _this._location.replaceState(path);
                        }
                        else {
                            _this._location.go(path);
                        }
                    }
                    _this._changes.emit(null);
                }
            });
        });
    };
    return Router;
}());
exports.Router = Router;
var _ActivateSegments = (function () {
    function _ActivateSegments(currTree, prevTree) {
        this.currTree = currTree;
        this.prevTree = prevTree;
        this.deactivations = [];
        this.performMutation = true;
    }
    _ActivateSegments.prototype.activate = function (parentOutletMap, rootComponent) {
        var _this = this;
        var prevRoot = lang_1.isPresent(this.prevTree) ? segments_1.rootNode(this.prevTree) : null;
        var currRoot = segments_1.rootNode(this.currTree);
        return this.canDeactivate(currRoot, prevRoot, parentOutletMap, rootComponent).then(function (res) {
            _this.performMutation = true;
            if (res) {
                _this.activateChildSegments(currRoot, prevRoot, parentOutletMap, [rootComponent]);
            }
            return res;
        });
    };
    _ActivateSegments.prototype.canDeactivate = function (currRoot, prevRoot, outletMap, rootComponent) {
        var _this = this;
        this.performMutation = false;
        this.activateChildSegments(currRoot, prevRoot, outletMap, [rootComponent]);
        var allPaths = async_1.PromiseWrapper.all(this.deactivations.map(function (r) { return _this.checkCanDeactivatePath(r); }));
        return allPaths.then(function (values) { return values.filter(function (v) { return v; }).length === values.length; });
    };
    _ActivateSegments.prototype.checkCanDeactivatePath = function (path) {
        var _this = this;
        var curr = async_1.PromiseWrapper.resolve(true);
        var _loop_1 = function(p) {
            curr = curr.then(function (_) {
                if (lifecycle_reflector_1.hasLifecycleHook('routerCanDeactivate', p)) {
                    return p.routerCanDeactivate(_this.prevTree, _this.currTree);
                }
                else {
                    return _;
                }
            });
        };
        for (var _i = 0, _a = collection_1.ListWrapper.reversed(path); _i < _a.length; _i++) {
            var p = _a[_i];
            _loop_1(p);
        }
        return curr;
    };
    _ActivateSegments.prototype.activateChildSegments = function (currNode, prevNode, outletMap, components) {
        var _this = this;
        var prevChildren = lang_1.isPresent(prevNode) ? prevNode.children.reduce(function (m, c) {
            m[c.value.outlet] = c;
            return m;
        }, {}) : {};
        currNode.children.forEach(function (c) {
            _this.activateSegments(c, prevChildren[c.value.outlet], outletMap, components);
            collection_1.StringMapWrapper.delete(prevChildren, c.value.outlet);
        });
        collection_1.StringMapWrapper.forEach(prevChildren, function (v /** TODO #9100 */, k /** TODO #9100 */) {
            return _this.deactivateOutlet(outletMap._outlets[k], components);
        });
    };
    _ActivateSegments.prototype.activateSegments = function (currNode, prevNode, parentOutletMap, components) {
        var curr = currNode.value;
        var prev = lang_1.isPresent(prevNode) ? prevNode.value : null;
        var outlet = this.getOutlet(parentOutletMap, currNode.value);
        if (curr === prev) {
            this.activateChildSegments(currNode, prevNode, outlet.outletMap, components.concat([outlet.component]));
        }
        else {
            this.deactivateOutlet(outlet, components);
            if (this.performMutation) {
                var outletMap = new RouterOutletMap();
                var component = this.activateNewSegments(outletMap, curr, prev, outlet);
                this.activateChildSegments(currNode, prevNode, outletMap, components.concat([component]));
            }
        }
    };
    _ActivateSegments.prototype.activateNewSegments = function (outletMap, curr, prev, outlet) {
        var resolved = core_1.ReflectiveInjector.resolve([{ provide: RouterOutletMap, useValue: outletMap }, { provide: segments_1.RouteSegment, useValue: curr }]);
        var ref = outlet.activate(segments_1.routeSegmentComponentFactory(curr), resolved, outletMap);
        if (lifecycle_reflector_1.hasLifecycleHook('routerOnActivate', ref.instance)) {
            ref.instance.routerOnActivate(curr, prev, this.currTree, this.prevTree);
        }
        return ref.instance;
    };
    _ActivateSegments.prototype.getOutlet = function (outletMap, segment) {
        var outlet = outletMap._outlets[segment.outlet];
        if (lang_1.isBlank(outlet)) {
            if (segment.outlet == constants_1.DEFAULT_OUTLET_NAME) {
                throw new core_1.BaseException("Cannot find default outlet");
            }
            else {
                throw new core_1.BaseException("Cannot find the outlet " + segment.outlet);
            }
        }
        return outlet;
    };
    _ActivateSegments.prototype.deactivateOutlet = function (outlet, components) {
        var _this = this;
        if (lang_1.isPresent(outlet) && outlet.isActivated) {
            collection_1.StringMapWrapper.forEach(outlet.outletMap._outlets, function (v /** TODO #9100 */, k /** TODO #9100 */) {
                return _this.deactivateOutlet(v, components);
            });
            if (this.performMutation) {
                outlet.deactivate();
            }
            else {
                this.deactivations.push(components.concat([outlet.component]));
            }
        }
    };
    return _ActivateSegments;
}());
//# sourceMappingURL=router.js.map
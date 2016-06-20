import { BaseException, ReflectiveInjector } from '@angular/core';
import { DEFAULT_OUTLET_NAME } from './constants';
import { EventEmitter, ObservableWrapper, PromiseWrapper } from './facade/async';
import { ListWrapper, StringMapWrapper } from './facade/collection';
import { isBlank, isPresent } from './facade/lang';
import { hasLifecycleHook } from './lifecycle_reflector';
import { link } from './link';
import { recognize } from './recognize';
import { RouteSegment, createEmptyRouteTree, rootNode, routeSegmentComponentFactory } from './segments';
export class RouterOutletMap {
    constructor() {
        /** @internal */
        this._outlets = {};
    }
    registerOutlet(name, outlet) { this._outlets[name] = outlet; }
}
/**
 * The `Router` is responsible for mapping URLs to components.
 *
 * You can see the state of the router by inspecting the read-only fields `router.urlTree`
 * and `router.routeTree`.
 */
export class Router {
    /**
     * @internal
     */
    constructor(_rootComponent, _rootComponentType, _componentResolver, _urlSerializer, _routerOutletMap, _location) {
        this._rootComponent = _rootComponent;
        this._rootComponentType = _rootComponentType;
        this._componentResolver = _componentResolver;
        this._urlSerializer = _urlSerializer;
        this._routerOutletMap = _routerOutletMap;
        this._location = _location;
        this._changes = new EventEmitter();
        this._routeTree = createEmptyRouteTree(this._rootComponentType);
        this._setUpLocationChangeListener();
        this.navigateByUrl(this._location.path());
    }
    /**
     * Returns the current url tree.
     */
    get urlTree() { return this._urlTree; }
    /**
     * Returns the current route tree.
     */
    get routeTree() { return this._routeTree; }
    /**
     * An observable or url changes from the router.
     */
    get changes() { return this._changes; }
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     * ```
     */
    navigateByUrl(url) {
        return this._navigate(this._urlSerializer.parse(url));
    }
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
    navigate(commands, segment) {
        return this._navigate(this.createUrlTree(commands, segment));
    }
    /**
     * @internal
     */
    dispose() { ObservableWrapper.dispose(this._locationSubscription); }
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
    createUrlTree(commands, segment) {
        let s = isPresent(segment) ? segment : this._routeTree.root;
        return link(s, this._routeTree, this.urlTree, commands);
    }
    /**
     * Serializes a {@link UrlTree} into a string.
     */
    serializeUrl(url) { return this._urlSerializer.serialize(url); }
    _setUpLocationChangeListener() {
        this._locationSubscription = this._location.subscribe((change) => { this._navigate(this._urlSerializer.parse(change['url']), change['pop']); });
    }
    _navigate(url, preventPushState) {
        this._urlTree = url;
        return recognize(this._componentResolver, this._rootComponentType, url, this._routeTree)
            .then(currTree => {
            return new _ActivateSegments(currTree, this._routeTree)
                .activate(this._routerOutletMap, this._rootComponent)
                .then(updated => {
                if (updated) {
                    this._routeTree = currTree;
                    if (isBlank(preventPushState) || !preventPushState) {
                        let path = this._urlSerializer.serialize(this._urlTree);
                        if (this._location.isCurrentPathEqualTo(path)) {
                            this._location.replaceState(path);
                        }
                        else {
                            this._location.go(path);
                        }
                    }
                    this._changes.emit(null);
                }
            });
        });
    }
}
class _ActivateSegments {
    constructor(currTree, prevTree) {
        this.currTree = currTree;
        this.prevTree = prevTree;
        this.deactivations = [];
        this.performMutation = true;
    }
    activate(parentOutletMap, rootComponent) {
        let prevRoot = isPresent(this.prevTree) ? rootNode(this.prevTree) : null;
        let currRoot = rootNode(this.currTree);
        return this.canDeactivate(currRoot, prevRoot, parentOutletMap, rootComponent).then(res => {
            this.performMutation = true;
            if (res) {
                this.activateChildSegments(currRoot, prevRoot, parentOutletMap, [rootComponent]);
            }
            return res;
        });
    }
    canDeactivate(currRoot, prevRoot, outletMap, rootComponent) {
        this.performMutation = false;
        this.activateChildSegments(currRoot, prevRoot, outletMap, [rootComponent]);
        let allPaths = PromiseWrapper.all(this.deactivations.map(r => this.checkCanDeactivatePath(r)));
        return allPaths.then((values) => values.filter(v => v).length === values.length);
    }
    checkCanDeactivatePath(path) {
        let curr = PromiseWrapper.resolve(true);
        for (let p of ListWrapper.reversed(path)) {
            curr = curr.then(_ => {
                if (hasLifecycleHook('routerCanDeactivate', p)) {
                    return p.routerCanDeactivate(this.prevTree, this.currTree);
                }
                else {
                    return _;
                }
            });
        }
        return curr;
    }
    activateChildSegments(currNode, prevNode, outletMap, components) {
        let prevChildren = isPresent(prevNode) ? prevNode.children.reduce((m, c) => {
            m[c.value.outlet] = c;
            return m;
        }, {}) : {};
        currNode.children.forEach(c => {
            this.activateSegments(c, prevChildren[c.value.outlet], outletMap, components);
            StringMapWrapper.delete(prevChildren, c.value.outlet);
        });
        StringMapWrapper.forEach(prevChildren, (v /** TODO #9100 */, k /** TODO #9100 */) => this.deactivateOutlet(outletMap._outlets[k], components));
    }
    activateSegments(currNode, prevNode, parentOutletMap, components) {
        let curr = currNode.value;
        let prev = isPresent(prevNode) ? prevNode.value : null;
        let outlet = this.getOutlet(parentOutletMap, currNode.value);
        if (curr === prev) {
            this.activateChildSegments(currNode, prevNode, outlet.outletMap, components.concat([outlet.component]));
        }
        else {
            this.deactivateOutlet(outlet, components);
            if (this.performMutation) {
                let outletMap = new RouterOutletMap();
                let component = this.activateNewSegments(outletMap, curr, prev, outlet);
                this.activateChildSegments(currNode, prevNode, outletMap, components.concat([component]));
            }
        }
    }
    activateNewSegments(outletMap, curr, prev, outlet) {
        let resolved = ReflectiveInjector.resolve([{ provide: RouterOutletMap, useValue: outletMap }, { provide: RouteSegment, useValue: curr }]);
        let ref = outlet.activate(routeSegmentComponentFactory(curr), resolved, outletMap);
        if (hasLifecycleHook('routerOnActivate', ref.instance)) {
            ref.instance.routerOnActivate(curr, prev, this.currTree, this.prevTree);
        }
        return ref.instance;
    }
    getOutlet(outletMap, segment) {
        let outlet = outletMap._outlets[segment.outlet];
        if (isBlank(outlet)) {
            if (segment.outlet == DEFAULT_OUTLET_NAME) {
                throw new BaseException(`Cannot find default outlet`);
            }
            else {
                throw new BaseException(`Cannot find the outlet ${segment.outlet}`);
            }
        }
        return outlet;
    }
    deactivateOutlet(outlet, components) {
        if (isPresent(outlet) && outlet.isActivated) {
            StringMapWrapper.forEach(outlet.outletMap._outlets, (v /** TODO #9100 */, k /** TODO #9100 */) => this.deactivateOutlet(v, components));
            if (this.performMutation) {
                outlet.deactivate();
            }
            else {
                this.deactivations.push(components.concat([outlet.component]));
            }
        }
    }
}
//# sourceMappingURL=router.js.map
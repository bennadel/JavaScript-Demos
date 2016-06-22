import { ComponentFactory, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Route } from './config';
import { Params } from './shared';
import { UrlPathWithParams, UrlSegment, UrlTree } from './url_tree';
import { Tree, TreeNode } from './utils/tree';
export declare class RouterState extends Tree<ActivatedRoute> {
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    snapshot: RouterStateSnapshot;
    constructor(root: TreeNode<ActivatedRoute>, queryParams: Observable<Params>, fragment: Observable<string>, snapshot: RouterStateSnapshot);
    toString(): string;
}
export declare function createEmptyState(urlTree: UrlTree, rootComponent: Type): RouterState;
export declare class ActivatedRoute {
    url: Observable<UrlPathWithParams[]>;
    params: Observable<Params>;
    outlet: string;
    component: Type | string;
    _futureSnapshot: ActivatedRouteSnapshot;
    snapshot: ActivatedRouteSnapshot;
    constructor(url: Observable<UrlPathWithParams[]>, params: Observable<Params>, outlet: string, component: Type | string, futureSnapshot: ActivatedRouteSnapshot);
    toString(): string;
}
export declare class ActivatedRouteSnapshot {
    url: UrlPathWithParams[];
    params: Params;
    outlet: string;
    component: Type | string;
    _resolvedComponentFactory: ComponentFactory<any>;
    _routeConfig: Route;
    _urlSegment: UrlSegment;
    _lastPathIndex: number;
    constructor(url: UrlPathWithParams[], params: Params, outlet: string, component: Type | string, routeConfig: Route, urlSegment: UrlSegment, lastPathIndex: number);
    toString(): string;
}
export declare class RouterStateSnapshot extends Tree<ActivatedRouteSnapshot> {
    url: string;
    queryParams: Params;
    fragment: string;
    constructor(url: string, root: TreeNode<ActivatedRouteSnapshot>, queryParams: Params, fragment: string);
    toString(): string;
}
export declare function advanceActivatedRoute(route: ActivatedRoute): void;

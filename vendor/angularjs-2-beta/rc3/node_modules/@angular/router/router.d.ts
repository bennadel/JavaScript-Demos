import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/observable/from';
import { Location } from '@angular/common';
import { ComponentResolver, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterConfig } from './config';
import { RouterOutletMap } from './router_outlet_map';
import { ActivatedRoute, RouterState, RouterStateSnapshot } from './router_state';
import { Params } from './shared';
import { UrlSerializer } from './url_serializer';
import { UrlTree } from './url_tree';
export interface NavigationExtras {
    relativeTo?: ActivatedRoute;
    queryParams?: Params;
    fragment?: string;
}
export declare class NavigationStart {
    id: number;
    url: string;
    constructor(id: number, url: string);
    toString(): string;
}
export declare class NavigationEnd {
    id: number;
    url: string;
    urlAfterRedirects: string;
    constructor(id: number, url: string, urlAfterRedirects: string);
    toString(): string;
}
export declare class NavigationCancel {
    id: number;
    url: string;
    constructor(id: number, url: string);
    toString(): string;
}
export declare class NavigationError {
    id: number;
    url: string;
    error: any;
    constructor(id: number, url: string, error: any);
    toString(): string;
}
export declare class RoutesRecognized {
    id: number;
    url: string;
    urlAfterRedirects: string;
    state: RouterStateSnapshot;
    constructor(id: number, url: string, urlAfterRedirects: string, state: RouterStateSnapshot);
    toString(): string;
}
export declare type Event = NavigationStart | NavigationEnd | NavigationCancel | NavigationError;
export declare class Router {
    private rootComponentType;
    private resolver;
    private urlSerializer;
    private outletMap;
    private location;
    private injector;
    private currentUrlTree;
    private currentRouterState;
    private locationSubscription;
    private routerEvents;
    private navigationId;
    private config;
    constructor(rootComponentType: Type, resolver: ComponentResolver, urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, injector: Injector, config: RouterConfig);
    initialNavigation(): void;
    routerState: RouterState;
    url: string;
    events: Observable<Event>;
    resetConfig(config: RouterConfig): void;
    dispose(): void;
    createUrlTree(commands: any[], {relativeTo, queryParams, fragment}?: NavigationExtras): UrlTree;
    navigateByUrl(url: string | UrlTree): Promise<boolean>;
    navigate(commands: any[], extras?: NavigationExtras): Promise<boolean>;
    serializeUrl(url: UrlTree): string;
    parseUrl(url: string): UrlTree;
    private scheduleNavigation(url, preventPushState);
    private setUpLocationChangeListener();
    private runNavigate(url, preventPushState, id);
}

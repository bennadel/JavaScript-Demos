import { Location } from '@angular/common';
import { ApplicationRef, ComponentResolver } from '@angular/core';
import { Router, RouterOutletMap } from './router';
import { RouterUrlSerializer } from './router_url_serializer';
import { RouteSegment } from './segments';
/**
 * The Platform agnostic ROUTER PROVIDERS
 */
export declare const ROUTER_PROVIDERS_COMMON: any[];
export declare function routerFactory(app: ApplicationRef, componentResolver: ComponentResolver, urlSerializer: RouterUrlSerializer, routerOutletMap: RouterOutletMap, location: Location): Router;
export declare function routeSegmentFactory(router: Router): RouteSegment;

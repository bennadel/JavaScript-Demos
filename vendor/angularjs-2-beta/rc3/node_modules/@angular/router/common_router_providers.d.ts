import { Location } from '@angular/common';
import { ApplicationRef, ComponentResolver, Injector, OpaqueToken } from '@angular/core';
import { RouterConfig } from './config';
import { Router } from './router';
import { RouterOutletMap } from './router_outlet_map';
import { UrlSerializer } from './url_serializer';
export declare const ROUTER_CONFIG: OpaqueToken;
export declare const ROUTER_OPTIONS: OpaqueToken;
export interface ExtraOptions {
    enableTracing?: boolean;
}
export declare function setupRouter(ref: ApplicationRef, resolver: ComponentResolver, urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, injector: Injector, config: RouterConfig, opts: ExtraOptions): Router;
export declare function setupRouterInitializer(injector: Injector): () => any;
export declare function provideRouter(_config: RouterConfig, _opts: ExtraOptions): any[];

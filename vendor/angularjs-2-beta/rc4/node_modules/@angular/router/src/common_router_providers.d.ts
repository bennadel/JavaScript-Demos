/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Location } from '@angular/common';
import { ApplicationRef, ComponentResolver, Injector, OpaqueToken } from '@angular/core';
import { RouterConfig } from './config';
import { Router } from './router';
import { RouterOutletMap } from './router_outlet_map';
import { UrlSerializer } from './url_tree';
export declare const ROUTER_CONFIG: OpaqueToken;
export declare const ROUTER_OPTIONS: OpaqueToken;
/**
 * @experimental
 */
export interface ExtraOptions {
    enableTracing?: boolean;
}
export declare function setupRouter(ref: ApplicationRef, resolver: ComponentResolver, urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, injector: Injector, config: RouterConfig, opts: ExtraOptions): Router;
export declare function setupRouterInitializer(injector: Injector): () => any;
/**
 * An array of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const config = [
 *   {path: 'home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(config)]);
 * ```
 *
 * @stable
 */
export declare function provideRouter(_config: RouterConfig, _opts: ExtraOptions): any[];

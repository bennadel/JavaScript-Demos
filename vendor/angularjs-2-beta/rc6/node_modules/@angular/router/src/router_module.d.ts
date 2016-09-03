/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HashLocationStrategy, Location, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { ApplicationRef, Compiler, Injector, ModuleWithProviders, NgModuleFactoryLoader, OpaqueToken, Provider } from '@angular/core';
import { Route, Routes } from './config';
import { ErrorHandler, Router } from './router';
import { RouterOutletMap } from './router_outlet_map';
import { ActivatedRoute } from './router_state';
import { UrlSerializer } from './url_tree';
/**
 * @stable
 */
export declare const ROUTER_CONFIGURATION: OpaqueToken;
export declare const ROUTER_FORROOT_GUARD: OpaqueToken;
export declare const ROUTER_PROVIDERS: Provider[];
/**
 * Router module.
 *
 * When registered at the root, it should be used as follows:
 *
 * ### Example
 *
 * ```
 * bootstrap(AppCmp, {imports: [RouterModule.forRoot(ROUTES)]});
 * ```
 *
 * For submodules and lazy loaded submodules it should be used as follows:
 *
 * ### Example
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forChild(CHILD_ROUTES)]
 * })
 * class Lazy {}
 * ```
 *
 * @stable
 */
export declare class RouterModule {
    constructor(guard: any);
    static forRoot(routes: Routes, config?: ExtraOptions): ModuleWithProviders;
    static forChild(routes: Routes): ModuleWithProviders;
}
export declare function provideLocationStrategy(platformLocationStrategy: PlatformLocation, baseHref: string, options?: ExtraOptions): HashLocationStrategy | PathLocationStrategy;
export declare function provideForRootGuard(router: Router): any;
/**
 * @stable
 */
export declare function provideRoutes(routes: Routes): any;
/**
 * Extra options used to configure the router.
 *
 * Set `enableTracing` to log router events to the console.
 * Set 'useHash' to true to enable HashLocationStrategy.
 * Set `errorHandler` to enable a custom ErrorHandler.
 *
 * @stable
 */
export interface ExtraOptions {
    enableTracing?: boolean;
    useHash?: boolean;
    initialNavigation?: boolean;
    errorHandler?: ErrorHandler;
}
export declare function setupRouter(ref: ApplicationRef, urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, injector: Injector, loader: NgModuleFactoryLoader, compiler: Compiler, config: Route[][], opts?: ExtraOptions): Router;
export declare function rootRoute(router: Router): ActivatedRoute;
export declare function initialRouterNavigation(router: Router, opts: ExtraOptions): () => void;
export declare function provideRouterInitializer(): {
    provide: OpaqueToken;
    multi: boolean;
    useFactory: (router: Router, opts: ExtraOptions) => () => void;
    deps: (OpaqueToken | typeof Router)[];
};

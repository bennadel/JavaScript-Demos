/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Location } from '@angular/common';
import { Compiler, Injector, ModuleWithProviders, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { Route, Router, RouterOutletMap, Routes, UrlSerializer } from '@angular/router';
/**
 * A spy for {@link NgModuleFactoryLoader} that allows tests to simulate the loading of ng module
 * factories.
 *
 * @stable
 */
export declare class SpyNgModuleFactoryLoader implements NgModuleFactoryLoader {
    private compiler;
    stubbedModules: {
        [path: string]: any;
    };
    constructor(compiler: Compiler);
    load(path: string): Promise<NgModuleFactory<any>>;
}
/**
 * Router setup factory function used for testing.
 *
 * @stable
 */
export declare function setupTestingRouter(urlSerializer: UrlSerializer, outletMap: RouterOutletMap, location: Location, loader: NgModuleFactoryLoader, compiler: Compiler, injector: Injector, routes: Route[][]): Router;
/**
 * A module setting up the router that should be used for testing.
 * It provides spy implementations of Location, LocationStrategy, and NgModuleFactoryLoader.
 *
 * # Example:
 *
 * ```
 * beforeEach(() => {
 *   TestBed.configureTestModule({
 *     modules: [
 *       RouterTestingModule.withRoutes(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}])]
 *       )
 *     ]
 *   });
 * });
 * ```
 *
 * @stable
 */
export declare class RouterTestingModule {
    static withRoutes(routes: Routes): ModuleWithProviders;
}

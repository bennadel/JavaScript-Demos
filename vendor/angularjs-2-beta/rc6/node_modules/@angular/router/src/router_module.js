/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_BASE_HREF, HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, APP_BOOTSTRAP_LISTENER, ApplicationRef, Compiler, Inject, Injector, NgModule, NgModuleFactoryLoader, OpaqueToken, Optional, SkipSelf, SystemJsNgModuleLoader } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from './directives/router_link';
import { RouterLinkActive } from './directives/router_link_active';
import { RouterOutlet } from './directives/router_outlet';
import { Router } from './router';
import { ROUTES } from './router_config_loader';
import { RouterOutletMap } from './router_outlet_map';
import { ActivatedRoute } from './router_state';
import { DefaultUrlSerializer, UrlSerializer } from './url_tree';
import { flatten } from './utils/collection';
/**
 * @stable
 */
var ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive];
/**
 * @stable
 */
export var ROUTER_CONFIGURATION = new OpaqueToken('ROUTER_CONFIGURATION');
export var ROUTER_FORROOT_GUARD = new OpaqueToken('ROUTER_FORROOT_GUARD');
var pathLocationStrategy = {
    provide: LocationStrategy,
    useClass: PathLocationStrategy
};
var hashLocationStrategy = {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
};
export var ROUTER_PROVIDERS = [
    Location, { provide: UrlSerializer, useClass: DefaultUrlSerializer }, {
        provide: Router,
        useFactory: setupRouter,
        deps: [
            ApplicationRef, UrlSerializer, RouterOutletMap, Location, Injector, NgModuleFactoryLoader,
            Compiler, ROUTES, ROUTER_CONFIGURATION
        ]
    },
    RouterOutletMap, { provide: ActivatedRoute, useFactory: rootRoute, deps: [Router] },
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
    { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: false } }
];
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
export var RouterModule = (function () {
    function RouterModule(guard) {
    }
    RouterModule.forRoot = function (routes, config) {
        return {
            ngModule: RouterModule,
            providers: [
                ROUTER_PROVIDERS, provideRoutes(routes), {
                    provide: ROUTER_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[Router, new Optional(), new SkipSelf()]]
                },
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} }, {
                    provide: LocationStrategy,
                    useFactory: provideLocationStrategy,
                    deps: [
                        PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], ROUTER_CONFIGURATION
                    ]
                },
                provideRouterInitializer()
            ]
        };
    };
    RouterModule.forChild = function (routes) {
        return { ngModule: RouterModule, providers: [provideRoutes(routes)] };
    };
    RouterModule.decorators = [
        { type: NgModule, args: [{ declarations: ROUTER_DIRECTIVES, exports: ROUTER_DIRECTIVES },] },
    ];
    /** @nocollapse */
    RouterModule.ctorParameters = [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ROUTER_FORROOT_GUARD,] },] },
    ];
    return RouterModule;
}());
export function provideLocationStrategy(platformLocationStrategy, baseHref, options) {
    if (options === void 0) { options = {}; }
    return options.useHash ? new HashLocationStrategy(platformLocationStrategy, baseHref) :
        new PathLocationStrategy(platformLocationStrategy, baseHref);
}
export function provideForRootGuard(router) {
    if (router) {
        throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
    }
    return 'guarded';
}
/**
 * @stable
 */
export function provideRoutes(routes) {
    return [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: routes },
        { provide: ROUTES, multi: true, useValue: routes }
    ];
}
export function setupRouter(ref, urlSerializer, outletMap, location, injector, loader, compiler, config, opts) {
    if (opts === void 0) { opts = {}; }
    if (ref.componentTypes.length == 0) {
        throw new Error('Bootstrap at least one component before injecting Router.');
    }
    var componentType = ref.componentTypes[0];
    var r = new Router(componentType, urlSerializer, outletMap, location, injector, loader, compiler, flatten(config));
    if (opts.errorHandler) {
        r.errorHandler = opts.errorHandler;
    }
    if (opts.enableTracing) {
        r.events.subscribe(function (e) {
            console.group("Router Event: " + e.constructor.name);
            console.log(e.toString());
            console.log(e);
            console.groupEnd();
        });
    }
    return r;
}
export function rootRoute(router) {
    return router.routerState.root;
}
export function initialRouterNavigation(router, opts) {
    return function () {
        if (opts.initialNavigation === false) {
            router.setUpLocationChangeListener();
        }
        else {
            router.initialNavigation();
        }
    };
}
export function provideRouterInitializer() {
    return {
        provide: APP_BOOTSTRAP_LISTENER,
        multi: true,
        useFactory: initialRouterNavigation,
        deps: [Router, ROUTER_CONFIGURATION]
    };
}
//# sourceMappingURL=router_module.js.map
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { ROUTER_PROVIDERS as ROUTER_SERVICE_PROVIDERS } from './router';
import { ROUTER_INSTRUCTION_PROVIDERS } from './router-instruction';
import { REDIRECT_PROVIDERS } from './redirect';
import { ROUTES } from './route';
import { GUARD_PROVIDERS } from './guard';
import { MATCH_ROUTE_PROVIDERS } from './route-traverser';
import { COMPONENT_RENDERER_PROVIDERS } from './component-renderer';
import { PARAMS_PROVIDERS } from './params';
import { RESOURCE_LOADER_PROVIDERS } from './resource-loader';
import { LinkTo } from './link-to';
import { LinkActive } from './link-active';
import { RouteView } from './route-view';
// Export all router providers
export const ROUTER_PROVIDERS = [
    COMPONENT_RENDERER_PROVIDERS,
    GUARD_PROVIDERS,
    MATCH_ROUTE_PROVIDERS,
    PARAMS_PROVIDERS,
    REDIRECT_PROVIDERS,
    RESOURCE_LOADER_PROVIDERS,
    ROUTER_INSTRUCTION_PROVIDERS,
    ROUTER_SERVICE_PROVIDERS
];
// Export all router directives
export const ROUTER_DIRECTIVES = [
    LinkTo,
    LinkActive,
    RouteView
];
// Export ROUTES opaque token and location strategy services
export { ROUTES, LocationStrategy, HashLocationStrategy, PathLocationStrategy };
// Export utility function for setting up providers
export function provideRouter(routes, locationStrategy = PathLocationStrategy) {
    return [
        provide(LocationStrategy, { useClass: locationStrategy }),
        provide(ROUTES, { useValue: routes }),
        provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true }),
        ROUTER_PROVIDERS
    ];
}
export { Router } from './router';
export { RouteParams, QueryParams } from './params';
export { ROUTER_HOOKS, INSTRUCTION_HOOKS, LOCATION_CHANGES, RouterInstruction } from './router-instruction';
export { PRE_RENDER_HOOKS, POST_RENDER_HOOKS } from './component-renderer';
export { TRAVERSAL_HOOKS } from './route-traverser';
export { LinkTo } from './link-to';
export { LinkActive, LINK_ACTIVE_OPTIONS } from './link-active';
export { RouteView } from './route-view';
//# sourceMappingURL=index.js.map
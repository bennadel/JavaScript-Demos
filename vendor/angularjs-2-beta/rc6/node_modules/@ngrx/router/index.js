"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
exports.LocationStrategy = common_1.LocationStrategy;
exports.PathLocationStrategy = common_1.PathLocationStrategy;
exports.HashLocationStrategy = common_1.HashLocationStrategy;
// Providers
var router_1 = require('./router');
var router_instruction_1 = require('./router-instruction');
var redirect_1 = require('./redirect');
var route_1 = require('./route');
exports.ROUTES = route_1.ROUTES;
var guard_1 = require('./guard');
var route_traverser_1 = require('./route-traverser');
var component_renderer_1 = require('./component-renderer');
var params_1 = require('./params');
var resource_loader_1 = require('./resource-loader');
// Directives
var link_to_1 = require('./link-to');
var link_active_1 = require('./link-active');
var route_view_1 = require('./route-view');
// Export all router providers
exports.ROUTER_PROVIDERS = [
    component_renderer_1.COMPONENT_RENDERER_PROVIDERS,
    guard_1.GUARD_PROVIDERS,
    route_traverser_1.MATCH_ROUTE_PROVIDERS,
    params_1.PARAMS_PROVIDERS,
    redirect_1.REDIRECT_PROVIDERS,
    resource_loader_1.RESOURCE_LOADER_PROVIDERS,
    router_instruction_1.ROUTER_INSTRUCTION_PROVIDERS,
    router_1.ROUTER_PROVIDERS
];
// Export all router directives
exports.ROUTER_DIRECTIVES = [
    link_to_1.LinkTo,
    link_active_1.LinkActive,
    route_view_1.RouteView
];
// Export ROUTES opaque token and location strategy services
// Export utility function for setting up providers
function provideRouter(routes, locationStrategy) {
    if (locationStrategy === void 0) { locationStrategy = common_1.PathLocationStrategy; }
    return [
        core_1.provide(common_1.LocationStrategy, { useClass: locationStrategy }),
        core_1.provide(route_1.ROUTES, { useValue: routes }),
        core_1.provide(core_1.PLATFORM_DIRECTIVES, { useValue: exports.ROUTER_DIRECTIVES, multi: true }),
        exports.ROUTER_PROVIDERS
    ];
}
exports.provideRouter = provideRouter;
var router_2 = require('./router');
exports.Router = router_2.Router;
var params_2 = require('./params');
exports.RouteParams = params_2.RouteParams;
exports.QueryParams = params_2.QueryParams;
var router_instruction_2 = require('./router-instruction');
exports.ROUTER_HOOKS = router_instruction_2.ROUTER_HOOKS;
exports.INSTRUCTION_HOOKS = router_instruction_2.INSTRUCTION_HOOKS;
exports.LOCATION_CHANGES = router_instruction_2.LOCATION_CHANGES;
exports.RouterInstruction = router_instruction_2.RouterInstruction;
var component_renderer_2 = require('./component-renderer');
exports.PRE_RENDER_HOOKS = component_renderer_2.PRE_RENDER_HOOKS;
exports.POST_RENDER_HOOKS = component_renderer_2.POST_RENDER_HOOKS;
var route_traverser_2 = require('./route-traverser');
exports.TRAVERSAL_HOOKS = route_traverser_2.TRAVERSAL_HOOKS;
var link_to_2 = require('./link-to');
exports.LinkTo = link_to_2.LinkTo;
var link_active_2 = require('./link-active');
exports.LinkActive = link_active_2.LinkActive;
exports.LINK_ACTIVE_OPTIONS = link_active_2.LINK_ACTIVE_OPTIONS;
var route_view_2 = require('./route-view');
exports.RouteView = route_view_2.RouteView;
//# sourceMappingURL=index.js.map
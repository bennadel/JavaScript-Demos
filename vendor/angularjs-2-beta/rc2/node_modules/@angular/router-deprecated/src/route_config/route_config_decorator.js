"use strict";
var core_private_1 = require('../../core_private');
var route_config_impl_1 = require('./route_config_impl');
var route_config_impl_2 = require('./route_config_impl');
exports.AsyncRoute = route_config_impl_2.AsyncRoute;
exports.AuxRoute = route_config_impl_2.AuxRoute;
exports.Redirect = route_config_impl_2.Redirect;
exports.Route = route_config_impl_2.Route;
// Copied from RouteConfig in route_config_impl.
/**
 * The `RouteConfig` decorator defines routes for a given component.
 *
 * It takes an array of {@link RouteDefinition}s.
 */
exports.RouteConfig = core_private_1.makeDecorator(route_config_impl_1.RouteConfig);
//# sourceMappingURL=route_config_decorator.js.map
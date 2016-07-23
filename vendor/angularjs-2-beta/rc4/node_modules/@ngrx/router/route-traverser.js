"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
* This is a fork of react-router's MatchRoute. Instead of async callbacks, it
* uses observables to perform async traversal of a route trie. It is expanded
* to run route guards as part of the traversal process
*/
require('rxjs/add/observable/of');
require('rxjs/add/observable/from');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/let');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/concatMap');
require('rxjs/add/operator/take');
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var queryString = require('query-string');
var resource_loader_1 = require('./resource-loader');
var match_pattern_1 = require('./match-pattern');
var route_1 = require('./route');
var hooks_1 = require('./hooks');
exports.TRAVERSAL_HOOKS = new core_1.OpaqueToken('@ngrx/router Traversal Hooks');
;
var RouteTraverser = (function () {
    function RouteTraverser(_loader, _routes, _hooks) {
        if (_hooks === void 0) { _hooks = []; }
        this._loader = _loader;
        this._routes = _routes;
        this._hooks = _hooks;
    }
    /**
    * Asynchronously matches the given location to a set of routes. The state
    * object will have the following properties:
    *
    * - routes       An array of routes that matched, in hierarchical order
    * - params       An object of URL parameters
    */
    RouteTraverser.prototype.find = function (change) {
        var _a = change.path.split('?'), pathname = _a[0], query = _a[1];
        var queryParams = queryString.parse(query);
        return this._matchRoutes(queryParams, change, pathname);
    };
    RouteTraverser.prototype._matchRoutes = function (queryParams, locationChange, pathname, remainingPathname, routes, routeParamNames, routeParamValues) {
        var _this = this;
        if (remainingPathname === void 0) { remainingPathname = pathname; }
        if (routes === void 0) { routes = this._routes; }
        if (routeParamNames === void 0) { routeParamNames = []; }
        if (routeParamValues === void 0) { routeParamValues = []; }
        return Observable_1.Observable.from(routes)
            .concatMap(function (route) { return _this._matchRouteDeep(route, queryParams, locationChange, pathname, remainingPathname, routeParamNames, routeParamValues); })
            .catch(function (error) {
            console.error('Error During Traversal', error);
            return Observable_1.Observable.of(null);
        })
            .filter(function (match) { return !!match; })
            .take(1);
    };
    RouteTraverser.prototype._matchRouteDeep = function (route, queryParams, locationChange, pathname, remainingPathname, paramNames, paramValues) {
        var _this = this;
        var pattern = route.path || '';
        return Observable_1.Observable.of(route)
            .filter(function () { return remainingPathname !== null; })
            .do(function () {
            var matched = match_pattern_1.matchPattern(pattern, remainingPathname);
            remainingPathname = matched.remainingPathname;
            paramNames = paramNames.concat(matched.paramNames);
            paramValues = paramValues.concat(matched.paramValues);
        })
            .filter(function () { return remainingPathname !== null; })
            .map(function () {
            return {
                route: route,
                queryParams: queryParams,
                locationChange: locationChange,
                routeParams: match_pattern_1.makeParams(paramNames, paramValues),
                isTerminal: remainingPathname === '' && !!route.path
            };
        })
            .let(hooks_1.composeHooks(this._hooks))
            .filter(function (_a) {
            var route = _a.route;
            return !!route;
        })
            .mergeMap(function (_a) {
            var route = _a.route, routeParams = _a.routeParams, queryParams = _a.queryParams, isTerminal = _a.isTerminal;
            if (isTerminal) {
                var match_1 = {
                    routes: [route],
                    routeParams: routeParams,
                    queryParams: queryParams,
                    locationChange: locationChange
                };
                return Observable_1.Observable.of(route)
                    .mergeMap(function (route) { return _this._loadIndex(route); })
                    .map(function (index) {
                    if (!!index) {
                        match_1.routes.push(index);
                    }
                    return match_1;
                });
            }
            return Observable_1.Observable.of(route)
                .mergeMap(function (route) { return _this._loadChildRoutes(route); })
                .mergeMap(function (childRoutes) { return _this._matchRoutes(queryParams, locationChange, pathname, remainingPathname, childRoutes, paramNames, paramValues); })
                .map(function (match) {
                if (!!match) {
                    match.routes.unshift(route);
                    return match;
                }
                return null;
            });
        });
    };
    RouteTraverser.prototype._loadChildRoutes = function (route) {
        return this._loader.load(route.children, route.loadChildren, []);
    };
    RouteTraverser.prototype._loadIndex = function (route) {
        return this._loader.load(route.index, route.loadIndex, null);
    };
    RouteTraverser = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(route_1.ROUTES)),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(exports.TRAVERSAL_HOOKS)), 
        __metadata('design:paramtypes', [resource_loader_1.ResourceLoader, Array, Array])
    ], RouteTraverser);
    return RouteTraverser;
}());
exports.RouteTraverser = RouteTraverser;
exports.MATCH_ROUTE_PROVIDERS = [
    new core_1.Provider(RouteTraverser, { useClass: RouteTraverser })
];
//# sourceMappingURL=route-traverser.js.map
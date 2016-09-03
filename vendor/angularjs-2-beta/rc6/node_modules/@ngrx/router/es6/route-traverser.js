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
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { OpaqueToken, Provider, Inject, Injectable, Optional } from '@angular/core';
import * as queryString from 'query-string';
import { ResourceLoader } from './resource-loader';
import { matchPattern, makeParams } from './match-pattern';
import { ROUTES } from './route';
import { composeHooks } from './hooks';
export const TRAVERSAL_HOOKS = new OpaqueToken('@ngrx/router Traversal Hooks');
;
export let RouteTraverser = class RouteTraverser {
    constructor(_loader, _routes, _hooks = []) {
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
    find(change) {
        const [pathname, query] = change.path.split('?');
        const queryParams = queryString.parse(query);
        return this._matchRoutes(queryParams, change, pathname);
    }
    _matchRoutes(queryParams, locationChange, pathname, remainingPathname = pathname, routes = this._routes, routeParamNames = [], routeParamValues = []) {
        return Observable.from(routes)
            .concatMap(route => this._matchRouteDeep(route, queryParams, locationChange, pathname, remainingPathname, routeParamNames, routeParamValues))
            .catch(error => {
            console.error('Error During Traversal', error);
            return Observable.of(null);
        })
            .filter(match => !!match)
            .take(1);
    }
    _matchRouteDeep(route, queryParams, locationChange, pathname, remainingPathname, paramNames, paramValues) {
        const pattern = route.path || '';
        return Observable.of(route)
            .filter(() => remainingPathname !== null)
            .do(() => {
            const matched = matchPattern(pattern, remainingPathname);
            remainingPathname = matched.remainingPathname;
            paramNames = [...paramNames, ...matched.paramNames];
            paramValues = [...paramValues, ...matched.paramValues];
        })
            .filter(() => remainingPathname !== null)
            .map(() => {
            return {
                route,
                queryParams,
                locationChange,
                routeParams: makeParams(paramNames, paramValues),
                isTerminal: remainingPathname === '' && !!route.path
            };
        })
            .let(composeHooks(this._hooks))
            .filter(({ route }) => !!route)
            .mergeMap(({ route, routeParams, queryParams, isTerminal }) => {
            if (isTerminal) {
                const match = {
                    routes: [route],
                    routeParams,
                    queryParams,
                    locationChange
                };
                return Observable.of(route)
                    .mergeMap(route => this._loadIndex(route))
                    .map(index => {
                    if (!!index) {
                        match.routes.push(index);
                    }
                    return match;
                });
            }
            return Observable.of(route)
                .mergeMap(route => this._loadChildRoutes(route))
                .mergeMap(childRoutes => this._matchRoutes(queryParams, locationChange, pathname, remainingPathname, childRoutes, paramNames, paramValues))
                .map(match => {
                if (!!match) {
                    match.routes.unshift(route);
                    return match;
                }
                return null;
            });
        });
    }
    _loadChildRoutes(route) {
        return this._loader.load(route.children, route.loadChildren, []);
    }
    _loadIndex(route) {
        return this._loader.load(route.index, route.loadIndex, null);
    }
};
RouteTraverser = __decorate([
    Injectable(),
    __param(1, Inject(ROUTES)),
    __param(2, Optional()),
    __param(2, Inject(TRAVERSAL_HOOKS)), 
    __metadata('design:paramtypes', [ResourceLoader, Array, Array])
], RouteTraverser);
export const MATCH_ROUTE_PROVIDERS = [
    new Provider(RouteTraverser, { useClass: RouteTraverser })
];
//# sourceMappingURL=route-traverser.js.map
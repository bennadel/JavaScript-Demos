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
 * Guards are services that can protect routes from being traversed. They
 * are implemented using traversal hooks
 *
 * A guard's `protectRoute` method is called when the router begins traversing a
 * route configuration file. It returns `true` or `false` to let the router know
 * if it should consider the route a candidate. Using guards, you can auth
 * protect routes, run data fetching, etc.
 *
 * A limitation of guards is that they must be provided in the same place you
 * provide the router.
 */
require('rxjs/add/observable/merge');
require('rxjs/add/observable/of');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/every');
require('rxjs/add/operator/observeOn');
var async_1 = require('rxjs/scheduler/async');
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var route_traverser_1 = require('./route-traverser');
var GuardHook = (function () {
    function GuardHook(_injector) {
        this._injector = _injector;
    }
    GuardHook.prototype.resolveGuard = function (token) {
        var guard = this._injector.get(token, null);
        if (guard === null) {
            guard = this._injector.resolveAndInstantiate(token);
        }
        return guard;
    };
    GuardHook.prototype.apply = function (route$) {
        var _this = this;
        return route$.mergeMap(function (candidate) {
            var route = candidate.route;
            if (!!route.guards && Array.isArray(route.guards) && route.guards.length > 0) {
                var guards = route.guards.map(function (token) { return _this.resolveGuard(token); });
                var activated = guards.map(function (guard) { return guard.protectRoute(candidate); });
                return Observable_1.Observable.merge.apply(Observable_1.Observable, activated)
                    .observeOn(async_1.async)
                    .every(function (value) { return !!value; })
                    .map(function (passed) {
                    if (passed) {
                        return candidate;
                    }
                    return Object.assign({}, candidate, { route: null });
                });
            }
            return Observable_1.Observable.of(candidate);
        });
    };
    GuardHook = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(core_1.Injector)), 
        __metadata('design:paramtypes', [core_1.ReflectiveInjector])
    ], GuardHook);
    return GuardHook;
}());
exports.GuardHook = GuardHook;
exports.GUARD_PROVIDERS = [
    new core_1.Provider(route_traverser_1.TRAVERSAL_HOOKS, { useClass: GuardHook, multi: true })
];
//# sourceMappingURL=guard.js.map
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
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/observeOn';
import { async } from 'rxjs/scheduler/async';
import { Observable } from 'rxjs/Observable';
import { Inject, Injectable, Provider, Injector, ReflectiveInjector } from '@angular/core';
import { TRAVERSAL_HOOKS } from './route-traverser';
export let GuardHook = class GuardHook {
    constructor(_injector) {
        this._injector = _injector;
    }
    resolveGuard(token) {
        let guard = this._injector.get(token, null);
        if (guard === null) {
            guard = this._injector.resolveAndInstantiate(token);
        }
        return guard;
    }
    apply(route$) {
        return route$.mergeMap(candidate => {
            const { route } = candidate;
            if (!!route.guards && Array.isArray(route.guards) && route.guards.length > 0) {
                const guards = route.guards.map(token => this.resolveGuard(token));
                const activated = guards.map(guard => guard.protectRoute(candidate));
                return Observable.merge(...activated)
                    .observeOn(async)
                    .every(value => !!value)
                    .map(passed => {
                    if (passed) {
                        return candidate;
                    }
                    return Object.assign({}, candidate, { route: null });
                });
            }
            return Observable.of(candidate);
        });
    }
};
GuardHook = __decorate([
    Injectable(),
    __param(0, Inject(Injector)), 
    __metadata('design:paramtypes', [ReflectiveInjector])
], GuardHook);
export const GUARD_PROVIDERS = [
    new Provider(TRAVERSAL_HOOKS, { useClass: GuardHook, multi: true })
];
//# sourceMappingURL=guard.js.map
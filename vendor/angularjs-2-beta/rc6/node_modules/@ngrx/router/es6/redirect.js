var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/filter';
import { Provider, Injectable } from '@angular/core';
import { Router } from './router';
import { INSTRUCTION_HOOKS } from './router-instruction';
import { formatPattern } from './match-pattern';
export let RedirectHook = class RedirectHook {
    constructor(router) {
        this.router = router;
    }
    apply(next$) {
        return next$
            .filter(next => {
            const last = next.routes[next.routes.length - 1];
            if (last.redirectTo) {
                this._handleRedirect(last, next);
                return false;
            }
            return true;
        });
    }
    _handleRedirect(route, next) {
        const { routeParams, queryParams } = next;
        let pathname;
        if (route.redirectTo.charAt(0) === '/') {
            pathname = formatPattern(route.redirectTo, routeParams);
        }
        else {
            const routeIndex = next.routes.indexOf(route);
            const parentPattern = this._getRoutePattern(next.routes, routeIndex - 1);
            const pattern = parentPattern.replace(/\/*$/, '/') + route.redirectTo;
            pathname = formatPattern(pattern, routeParams);
        }
        this.router.replace(pathname, queryParams);
    }
    _getRoutePattern(routes, routeIndex) {
        let parentPattern = '';
        for (let i = routeIndex; i >= 0; i--) {
            const route = routes[i];
            const pattern = route.path || '';
            parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
        }
        return parentPattern;
    }
};
RedirectHook = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Router])
], RedirectHook);
export const REDIRECT_PROVIDERS = [
    new Provider(INSTRUCTION_HOOKS, { useClass: RedirectHook })
];
//# sourceMappingURL=redirect.js.map
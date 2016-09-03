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
/**
 * Redirection happens in middleware. This is a fork of react-router's
 * Redirect component
 */
require('rxjs/add/operator/filter');
var core_1 = require('@angular/core');
var router_1 = require('./router');
var router_instruction_1 = require('./router-instruction');
var match_pattern_1 = require('./match-pattern');
var RedirectHook = (function () {
    function RedirectHook(router) {
        this.router = router;
    }
    RedirectHook.prototype.apply = function (next$) {
        var _this = this;
        return next$
            .filter(function (next) {
            var last = next.routes[next.routes.length - 1];
            if (last.redirectTo) {
                _this._handleRedirect(last, next);
                return false;
            }
            return true;
        });
    };
    RedirectHook.prototype._handleRedirect = function (route, next) {
        var routeParams = next.routeParams, queryParams = next.queryParams;
        var pathname;
        if (route.redirectTo.charAt(0) === '/') {
            pathname = match_pattern_1.formatPattern(route.redirectTo, routeParams);
        }
        else {
            var routeIndex = next.routes.indexOf(route);
            var parentPattern = this._getRoutePattern(next.routes, routeIndex - 1);
            var pattern = parentPattern.replace(/\/*$/, '/') + route.redirectTo;
            pathname = match_pattern_1.formatPattern(pattern, routeParams);
        }
        this.router.replace(pathname, queryParams);
    };
    RedirectHook.prototype._getRoutePattern = function (routes, routeIndex) {
        var parentPattern = '';
        for (var i = routeIndex; i >= 0; i--) {
            var route = routes[i];
            var pattern = route.path || '';
            parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
        }
        return parentPattern;
    };
    RedirectHook = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], RedirectHook);
    return RedirectHook;
}());
exports.RedirectHook = RedirectHook;
exports.REDIRECT_PROVIDERS = [
    new core_1.Provider(router_instruction_1.INSTRUCTION_HOOKS, { useClass: RedirectHook })
];
//# sourceMappingURL=redirect.js.map
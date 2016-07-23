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
 * As implemented this component is fairly complex. It listens to the RouteSet
 * and renders the first component in the set's list. When rendering the
 * component, it re-provides RouteSet modified to include the shortened list
 * of components. Exposes a very powerful render middleware hook that could
 * be used in the future for data resolving.
 */
require('rxjs/add/operator/do');
require('rxjs/add/operator/map');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var route_1 = require('./route');
var router_instruction_1 = require('./router-instruction');
var component_renderer_1 = require('./component-renderer');
var RouteView = (function () {
    function RouteView(_name, _routerInstruction$, _injector, _renderer, _ref) {
        this._name = _name;
        this._routerInstruction$ = _routerInstruction$;
        this._injector = _injector;
        this._renderer = _renderer;
        this._ref = _ref;
        this._routerInstructionProvider = new core_1.Provider(router_instruction_1.RouterInstruction, {
            useValue: this._routerInstruction$.map(function (set) {
                return {
                    locationChange: set.locationChange,
                    routes: set.routes.slice().slice(1),
                    routeParams: set.routeParams,
                    queryParams: set.queryParams
                };
            })
        });
    }
    RouteView.prototype.ngOnInit = function () {
        var _this = this;
        this._sub = this._routerInstruction$
            .map(function (set) {
            var route = set.routes[0];
            var components = route_1.getNamedComponents(route, _this._name);
            return { route: route, components: components };
        })
            .distinctUntilChanged(function (prev, next) {
            return prev.components.component === next.components.component
                && prev.components.loadComponent === next.components.loadComponent;
        })
            .do(function (ins) { return _this._cleanPreviousRef(); })
            .filter(function (_a) {
            var components = _a.components;
            return !!components.component || !!components.loadComponent;
        })
            .switchMap(function (_a) {
            var route = _a.route, components = _a.components;
            return _this._renderer.render(route, components, _this._injector, _this._ref, [_this._routerInstructionProvider]);
        })
            .subscribe(function (ref) { return _this._prev = ref; });
    };
    RouteView.prototype.ngOnDestroy = function () {
        this._cleanPreviousRef();
        this._sub.unsubscribe();
    };
    RouteView.prototype._cleanPreviousRef = function () {
        if (this._prev) {
            this._prev.destroy();
            this._prev = null;
        }
    };
    RouteView = __decorate([
        core_1.Component({
            selector: 'route-view',
            providers: [],
            template: ""
        }),
        __param(0, core_1.Attribute('name')), 
        __metadata('design:paramtypes', [String, router_instruction_1.RouterInstruction, core_1.Injector, component_renderer_1.ComponentRenderer, core_1.ViewContainerRef])
    ], RouteView);
    return RouteView;
}());
exports.RouteView = RouteView;
//# sourceMappingURL=route-view.js.map
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
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Component, Injector, ViewContainerRef, Attribute, Provider } from '@angular/core';
import { getNamedComponents } from './route';
import { RouterInstruction } from './router-instruction';
import { ComponentRenderer } from './component-renderer';
export let RouteView = class RouteView {
    constructor(_name, _routerInstruction$, _injector, _renderer, _ref) {
        this._name = _name;
        this._routerInstruction$ = _routerInstruction$;
        this._injector = _injector;
        this._renderer = _renderer;
        this._ref = _ref;
        this._routerInstructionProvider = new Provider(RouterInstruction, {
            useValue: this._routerInstruction$.map(set => {
                return {
                    locationChange: set.locationChange,
                    routes: [...set.routes].slice(1),
                    routeParams: set.routeParams,
                    queryParams: set.queryParams
                };
            })
        });
    }
    ngOnInit() {
        this._sub = this._routerInstruction$
            .map(set => {
            const route = set.routes[0];
            const components = getNamedComponents(route, this._name);
            return { route, components };
        })
            .distinctUntilChanged((prev, next) => {
            return prev.components.component === next.components.component
                && prev.components.loadComponent === next.components.loadComponent;
        })
            .do(ins => this._cleanPreviousRef())
            .filter(({ components }) => !!components.component || !!components.loadComponent)
            .switchMap(({ route, components }) => this._renderer.render(route, components, this._injector, this._ref, [this._routerInstructionProvider]))
            .subscribe((ref) => this._prev = ref);
    }
    ngOnDestroy() {
        this._cleanPreviousRef();
        this._sub.unsubscribe();
    }
    _cleanPreviousRef() {
        if (this._prev) {
            this._prev.destroy();
            this._prev = null;
        }
    }
};
RouteView = __decorate([
    Component({
        selector: 'route-view',
        providers: [],
        template: ``
    }),
    __param(0, Attribute('name')), 
    __metadata('design:paramtypes', [String, RouterInstruction, Injector, ComponentRenderer, ViewContainerRef])
], RouteView);
//# sourceMappingURL=route-view.js.map
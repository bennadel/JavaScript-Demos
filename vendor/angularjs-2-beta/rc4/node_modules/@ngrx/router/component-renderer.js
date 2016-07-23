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
require('rxjs/add/observable/of');
require('rxjs/add/operator/let');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var resource_loader_1 = require('./resource-loader');
var hooks_1 = require('./hooks');
exports.PRE_RENDER_HOOKS = new core_1.OpaqueToken('@ngrx/router Pre-Render Hooks');
exports.POST_RENDER_HOOKS = new core_1.OpaqueToken('@ngrx/router Post-Render Hooks');
var ComponentRenderer = (function () {
    function ComponentRenderer(_loader, _compiler, _preRenderHooks, _postRenderHooks) {
        this._loader = _loader;
        this._compiler = _compiler;
        this._preRenderHooks = _preRenderHooks;
        this._postRenderHooks = _postRenderHooks;
    }
    ComponentRenderer.prototype.render = function (route, components, injector, ref, providers) {
        var _this = this;
        return Observable_1.Observable.of(route)
            .mergeMap(function (route) { return _this._loadComponent(components); })
            .map(function (component) {
            return { component: component, injector: injector, providers: providers };
        })
            .let(hooks_1.composeHooks(this._preRenderHooks))
            .mergeMap(function (instruction) {
            var instructionInjector = core_1.ReflectiveInjector.resolveAndCreate(instruction.providers, injector);
            var component = instruction.component;
            return _this._compiler.resolveComponent(component)
                .then(function (comp) { return ref.createComponent(comp, null, instructionInjector); });
        })
            .let(hooks_1.composeHooks(this._postRenderHooks));
    };
    ComponentRenderer.prototype._loadComponent = function (route) {
        return this._loader.load(route.component, route.loadComponent);
    };
    ComponentRenderer = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(exports.PRE_RENDER_HOOKS)),
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(exports.POST_RENDER_HOOKS)), 
        __metadata('design:paramtypes', [resource_loader_1.ResourceLoader, core_1.ComponentResolver, Array, Array])
    ], ComponentRenderer);
    return ComponentRenderer;
}());
exports.ComponentRenderer = ComponentRenderer;
exports.COMPONENT_RENDERER_PROVIDERS = [
    new core_1.Provider(ComponentRenderer, { useClass: ComponentRenderer })
];
//# sourceMappingURL=component-renderer.js.map
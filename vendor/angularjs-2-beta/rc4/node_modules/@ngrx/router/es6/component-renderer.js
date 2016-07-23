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
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ComponentResolver, ReflectiveInjector, Injectable, Inject, Provider, OpaqueToken, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResourceLoader } from './resource-loader';
import { composeHooks } from './hooks';
export const PRE_RENDER_HOOKS = new OpaqueToken('@ngrx/router Pre-Render Hooks');
export const POST_RENDER_HOOKS = new OpaqueToken('@ngrx/router Post-Render Hooks');
export let ComponentRenderer = class ComponentRenderer {
    constructor(_loader, _compiler, _preRenderHooks, _postRenderHooks) {
        this._loader = _loader;
        this._compiler = _compiler;
        this._preRenderHooks = _preRenderHooks;
        this._postRenderHooks = _postRenderHooks;
    }
    render(route, components, injector, ref, providers) {
        return Observable.of(route)
            .mergeMap(route => this._loadComponent(components))
            .map(component => {
            return { component, injector, providers };
        })
            .let(composeHooks(this._preRenderHooks))
            .mergeMap(instruction => {
            const instructionInjector = ReflectiveInjector.resolveAndCreate(instruction.providers, injector);
            const component = instruction.component;
            return this._compiler.resolveComponent(component)
                .then(comp => ref.createComponent(comp, null, instructionInjector));
        })
            .let(composeHooks(this._postRenderHooks));
    }
    _loadComponent(route) {
        return this._loader.load(route.component, route.loadComponent);
    }
};
ComponentRenderer = __decorate([
    Injectable(),
    __param(2, Optional()),
    __param(2, Inject(PRE_RENDER_HOOKS)),
    __param(3, Optional()),
    __param(3, Inject(POST_RENDER_HOOKS)), 
    __metadata('design:paramtypes', [ResourceLoader, ComponentResolver, Array, Array])
], ComponentRenderer);
export const COMPONENT_RENDERER_PROVIDERS = [
    new Provider(ComponentRenderer, { useClass: ComponentRenderer })
];
//# sourceMappingURL=component-renderer.js.map
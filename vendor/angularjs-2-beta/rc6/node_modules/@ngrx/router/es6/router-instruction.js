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
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/observeOn';
import '@ngrx/core/add/operator/enterZone';
import { Observable } from 'rxjs/Observable';
import { asap } from 'rxjs/scheduler/asap';
import { Provider, OpaqueToken, Inject, Optional, Injectable, NgZone } from '@angular/core';
import { Router } from './router';
import { RouteTraverser } from './route-traverser';
import { composeHooks } from './hooks';
export const ROUTER_HOOKS = new OpaqueToken('@ngrx/router Router Hooks');
export const INSTRUCTION_HOOKS = new OpaqueToken('@ngrx/router Instruction Hooks');
export const LOCATION_CHANGES = new OpaqueToken('@ngrx/router Location Changes');
export class RouterInstruction extends Observable {
}
export let RouterInstructionFactory = class RouterInstructionFactory {
    constructor(_locationChanges$, _traverser, _ngZone, _routerHooks = [], _instructionHooks = []) {
        this._locationChanges$ = _locationChanges$;
        this._traverser = _traverser;
        this._ngZone = _ngZone;
        this._routerHooks = _routerHooks;
        this._instructionHooks = _instructionHooks;
    }
    create() {
        return this._locationChanges$
            .observeOn(asap)
            .distinctUntilChanged((prev, next) => prev.path === next.path)
            .let(composeHooks(this._routerHooks))
            .switchMap(change => this._traverser.find(change))
            .filter(match => !!match)
            .let(composeHooks(this._instructionHooks))
            .enterZone(this._ngZone)
            .publishReplay(1)
            .refCount();
    }
};
RouterInstructionFactory = __decorate([
    Injectable(),
    __param(0, Inject(LOCATION_CHANGES)),
    __param(3, Optional()),
    __param(3, Inject(ROUTER_HOOKS)),
    __param(4, Optional()),
    __param(4, Inject(INSTRUCTION_HOOKS)), 
    __metadata('design:paramtypes', [Observable, RouteTraverser, NgZone, Array, Array])
], RouterInstructionFactory);
export const ROUTER_INSTRUCTION_PROVIDERS = [
    new Provider(RouterInstruction, {
        deps: [RouterInstructionFactory],
        useFactory(rif) {
            return rif.create();
        }
    }),
    new Provider(RouterInstructionFactory, { useClass: RouterInstructionFactory }),
    new Provider(LOCATION_CHANGES, { useExisting: Router })
];
//# sourceMappingURL=router-instruction.js.map
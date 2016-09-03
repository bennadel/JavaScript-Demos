"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
 * RouteSet is a projection of the current location. It maps location changes
 * into parsed route params and a list of components to render
 */
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/publishReplay');
require('rxjs/add/operator/let');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/observeOn');
require('@ngrx/core/add/operator/enterZone');
var Observable_1 = require('rxjs/Observable');
var asap_1 = require('rxjs/scheduler/asap');
var core_1 = require('@angular/core');
var router_1 = require('./router');
var route_traverser_1 = require('./route-traverser');
var hooks_1 = require('./hooks');
exports.ROUTER_HOOKS = new core_1.OpaqueToken('@ngrx/router Router Hooks');
exports.INSTRUCTION_HOOKS = new core_1.OpaqueToken('@ngrx/router Instruction Hooks');
exports.LOCATION_CHANGES = new core_1.OpaqueToken('@ngrx/router Location Changes');
var RouterInstruction = (function (_super) {
    __extends(RouterInstruction, _super);
    function RouterInstruction() {
        _super.apply(this, arguments);
    }
    return RouterInstruction;
}(Observable_1.Observable));
exports.RouterInstruction = RouterInstruction;
var RouterInstructionFactory = (function () {
    function RouterInstructionFactory(_locationChanges$, _traverser, _ngZone, _routerHooks, _instructionHooks) {
        if (_routerHooks === void 0) { _routerHooks = []; }
        if (_instructionHooks === void 0) { _instructionHooks = []; }
        this._locationChanges$ = _locationChanges$;
        this._traverser = _traverser;
        this._ngZone = _ngZone;
        this._routerHooks = _routerHooks;
        this._instructionHooks = _instructionHooks;
    }
    RouterInstructionFactory.prototype.create = function () {
        var _this = this;
        return this._locationChanges$
            .observeOn(asap_1.asap)
            .distinctUntilChanged(function (prev, next) { return prev.path === next.path; })
            .let(hooks_1.composeHooks(this._routerHooks))
            .switchMap(function (change) { return _this._traverser.find(change); })
            .filter(function (match) { return !!match; })
            .let(hooks_1.composeHooks(this._instructionHooks))
            .enterZone(this._ngZone)
            .publishReplay(1)
            .refCount();
    };
    RouterInstructionFactory = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(exports.LOCATION_CHANGES)),
        __param(3, core_1.Optional()),
        __param(3, core_1.Inject(exports.ROUTER_HOOKS)),
        __param(4, core_1.Optional()),
        __param(4, core_1.Inject(exports.INSTRUCTION_HOOKS)), 
        __metadata('design:paramtypes', [Observable_1.Observable, route_traverser_1.RouteTraverser, core_1.NgZone, Array, Array])
    ], RouterInstructionFactory);
    return RouterInstructionFactory;
}());
exports.RouterInstructionFactory = RouterInstructionFactory;
exports.ROUTER_INSTRUCTION_PROVIDERS = [
    new core_1.Provider(RouterInstruction, {
        deps: [RouterInstructionFactory],
        useFactory: function (rif) {
            return rif.create();
        }
    }),
    new core_1.Provider(RouterInstructionFactory, { useClass: RouterInstructionFactory }),
    new core_1.Provider(exports.LOCATION_CHANGES, { useExisting: router_1.Router })
];
//# sourceMappingURL=router-instruction.js.map
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
var core_1 = require('@angular/core');
var link_to_1 = require('./link-to');
var router_1 = require('./router');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/mergeAll');
exports.LINK_ACTIVE_OPTIONS = {
    exact: true
};
/**
 * The LinkActive directive toggles classes on elements that contain an active linkTo directive
 *
 * <a linkActive="active" linkTo="/home/page">Home Page</a>
 * <ol>
 *  <li linkActive="active" *ngFor="var link of links">
 *    <a [linkTo]="'/link/' + link.id">{{ link.title }}</a>
 *  </li>
 * </ol>
 */
var LinkActive = (function () {
    function LinkActive(links, element, router$, renderer, defaultActiveOptions) {
        this.links = links;
        this.element = element;
        this.router$ = router$;
        this.renderer = renderer;
        this.defaultActiveOptions = defaultActiveOptions;
        this.activeClass = 'active';
        this._activeOptions = { exact: true };
    }
    LinkActive.prototype.ngOnInit = function () {
        var _this = this;
        this.links.changes.subscribe(function (_) {
            _this.subscribeLinks();
        });
    };
    LinkActive.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.defaultActiveOptions && !this.activeOptions) {
            this._activeOptions = this.defaultActiveOptions;
        }
        else if (this.activeOptions) {
            this._activeOptions = this.activeOptions;
        }
        this._routerSub = this.router$
            .map(function (_a) {
            var path = _a.path;
            return _this.router$.prepareExternalUrl(path || '/');
        })
            .subscribe(function (path) {
            _this.checkActive(path);
        });
    };
    LinkActive.prototype.checkActive = function (path) {
        var _this = this;
        var active = this.links.reduce(function (active, current) {
            var _a = current.linkHref.split('?'), href = _a[0], query = _a[1];
            if (_this._activeOptions.exact) {
                return active ? active : href === path;
            }
            else {
                return active ? active : path.startsWith(href);
            }
        }, false);
        var activeClasses = this.activeClass.split(' ');
        activeClasses.forEach(function (activeClass) {
            _this.renderer.setElementClass(_this.element.nativeElement, activeClass, active);
        });
    };
    LinkActive.prototype.subscribeLinks = function () {
        var _this = this;
        if (this._linksSub) {
            this._linksSub.unsubscribe();
        }
        var observables = this.links.map(function (link) {
            return link.hrefUpdated;
        });
        this._linksSub = Observable_1.Observable.from(observables)
            .mergeAll()
            .subscribe(function (_) {
            _this.checkActive(_this.router$.prepareExternalUrl(_this.router$.path() || '/'));
        });
    };
    LinkActive.prototype.ngOnDestroy = function () {
        if (this._routerSub) {
            this._routerSub.unsubscribe();
        }
        if (this._linksSub) {
            this._linksSub.unsubscribe();
        }
    };
    __decorate([
        core_1.Input('linkActive'), 
        __metadata('design:type', String)
    ], LinkActive.prototype, "activeClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LinkActive.prototype, "activeOptions", void 0);
    LinkActive = __decorate([
        core_1.Directive({ selector: '[linkActive]' }),
        __param(0, core_1.Query(link_to_1.LinkTo)),
        __param(4, core_1.Optional()),
        __param(4, core_1.Inject(exports.LINK_ACTIVE_OPTIONS)), 
        __metadata('design:paramtypes', [core_1.QueryList, core_1.ElementRef, router_1.Router, core_1.Renderer, Object])
    ], LinkActive);
    return LinkActive;
}());
exports.LinkActive = LinkActive;
//# sourceMappingURL=link-active.js.map
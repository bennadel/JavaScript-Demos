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
var core_1 = require('@angular/core');
var router_1 = require('./router');
/**
 * The LinkTo directive links to routes in your app
 *
 * Links are pushed to the `Router` service to trigger a route change.
 * Query params can be represented as an object or a string of names/values
 *
 * <a linkTo="/home/page" [queryParams]="{ id: 123 }">Home Page</a>
 * <a [linkTo]="'/pages' + page.id">Page 1</a>
 */
var LinkTo = (function () {
    function LinkTo(_router) {
        this._router = _router;
        this.hrefUpdated = new core_1.EventEmitter();
    }
    Object.defineProperty(LinkTo.prototype, "linkTo", {
        set: function (href) {
            this._href = href;
            this._updateHref();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkTo.prototype, "queryParams", {
        set: function (params) {
            this._query = params;
            this._updateHref();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles click events on the associated link
     * Prevents default action for non-combination click events without a target
     */
    LinkTo.prototype.onClick = function (event) {
        if (!this._comboClick(event) && !this.target) {
            this._router.go(this._href, this._query);
            event.preventDefault();
        }
    };
    LinkTo.prototype._updateHref = function () {
        var path = this._cleanUpHref(this._href);
        this.linkHref = this._router.prepareExternalUrl(path, this._query);
        this.hrefUpdated.emit(this.linkHref);
    };
    /**
     * Determines whether the click event happened with a combination of other keys
     */
    LinkTo.prototype._comboClick = function (event) {
        var buttonEvent = event.which || event.button;
        return (buttonEvent > 1 || event.ctrlKey || event.metaKey || event.shiftKey);
    };
    LinkTo.prototype._cleanUpHref = function (href) {
        if (href === void 0) { href = ''; }
        // Check for trailing slashes in the path
        while (href.length > 1 && href.substr(-1) === '/') {
            // Remove trailing slashes
            href = href.substring(0, href.length - 1);
        }
        return href;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LinkTo.prototype, "target", void 0);
    __decorate([
        core_1.HostBinding('attr.href'), 
        __metadata('design:type', Object)
    ], LinkTo.prototype, "linkHref", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], LinkTo.prototype, "linkTo", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], LinkTo.prototype, "queryParams", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LinkTo.prototype, "hrefUpdated", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LinkTo.prototype, "onClick", null);
    LinkTo = __decorate([
        core_1.Directive({ selector: '[linkTo]' }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LinkTo);
    return LinkTo;
}());
exports.LinkTo = LinkTo;
//# sourceMappingURL=link-to.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from './router';
/**
 * The LinkTo directive links to routes in your app
 *
 * Links are pushed to the `Router` service to trigger a route change.
 * Query params can be represented as an object or a string of names/values
 *
 * <a linkTo="/home/page" [queryParams]="{ id: 123 }">Home Page</a>
 * <a [linkTo]="'/pages' + page.id">Page 1</a>
 */
export let LinkTo = class LinkTo {
    constructor(_router) {
        this._router = _router;
        this.hrefUpdated = new EventEmitter();
    }
    set linkTo(href) {
        this._href = href;
        this._updateHref();
    }
    set queryParams(params) {
        this._query = params;
        this._updateHref();
    }
    /**
     * Handles click events on the associated link
     * Prevents default action for non-combination click events without a target
     */
    onClick(event) {
        if (!this._comboClick(event) && !this.target) {
            this._router.go(this._href, this._query);
            event.preventDefault();
        }
    }
    _updateHref() {
        let path = this._cleanUpHref(this._href);
        this.linkHref = this._router.prepareExternalUrl(path, this._query);
        this.hrefUpdated.emit(this.linkHref);
    }
    /**
     * Determines whether the click event happened with a combination of other keys
     */
    _comboClick(event) {
        let buttonEvent = event.which || event.button;
        return (buttonEvent > 1 || event.ctrlKey || event.metaKey || event.shiftKey);
    }
    _cleanUpHref(href = '') {
        // Check for trailing slashes in the path
        while (href.length > 1 && href.substr(-1) === '/') {
            // Remove trailing slashes
            href = href.substring(0, href.length - 1);
        }
        return href;
    }
};
__decorate([
    Input(), 
    __metadata('design:type', String)
], LinkTo.prototype, "target", void 0);
__decorate([
    HostBinding('attr.href'), 
    __metadata('design:type', Object)
], LinkTo.prototype, "linkHref", void 0);
__decorate([
    Input(), 
    __metadata('design:type', String), 
    __metadata('design:paramtypes', [String])
], LinkTo.prototype, "linkTo", null);
__decorate([
    Input(), 
    __metadata('design:type', Object), 
    __metadata('design:paramtypes', [Object])
], LinkTo.prototype, "queryParams", null);
__decorate([
    Output(), 
    __metadata('design:type', EventEmitter)
], LinkTo.prototype, "hrefUpdated", void 0);
__decorate([
    HostListener('click', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], LinkTo.prototype, "onClick", null);
LinkTo = __decorate([
    Directive({ selector: '[linkTo]' }), 
    __metadata('design:paramtypes', [Router])
], LinkTo);
//# sourceMappingURL=link-to.js.map
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
import { Directive, ElementRef, Input, Query, QueryList, Renderer, Optional, Inject } from '@angular/core';
import { LinkTo } from './link-to';
import { Router } from './router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeAll';
export const LINK_ACTIVE_OPTIONS = {
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
export let LinkActive = class LinkActive {
    constructor(links, element, router$, renderer, defaultActiveOptions) {
        this.links = links;
        this.element = element;
        this.router$ = router$;
        this.renderer = renderer;
        this.defaultActiveOptions = defaultActiveOptions;
        this.activeClass = 'active';
        this._activeOptions = { exact: true };
    }
    ngOnInit() {
        this.links.changes.subscribe(_ => {
            this.subscribeLinks();
        });
    }
    ngAfterViewInit() {
        if (this.defaultActiveOptions && !this.activeOptions) {
            this._activeOptions = this.defaultActiveOptions;
        }
        else if (this.activeOptions) {
            this._activeOptions = this.activeOptions;
        }
        this._routerSub = this.router$
            .map(({ path }) => this.router$.prepareExternalUrl(path || '/'))
            .subscribe(path => {
            this.checkActive(path);
        });
    }
    checkActive(path) {
        let active = this.links.reduce((active, current) => {
            let [href, query] = current.linkHref.split('?');
            if (this._activeOptions.exact) {
                return active ? active : href === path;
            }
            else {
                return active ? active : path.startsWith(href);
            }
        }, false);
        let activeClasses = this.activeClass.split(' ');
        activeClasses.forEach((activeClass) => {
            this.renderer.setElementClass(this.element.nativeElement, activeClass, active);
        });
    }
    subscribeLinks() {
        if (this._linksSub) {
            this._linksSub.unsubscribe();
        }
        let observables = this.links.map(link => {
            return link.hrefUpdated;
        });
        this._linksSub = Observable.from(observables)
            .mergeAll()
            .subscribe(_ => {
            this.checkActive(this.router$.prepareExternalUrl(this.router$.path() || '/'));
        });
    }
    ngOnDestroy() {
        if (this._routerSub) {
            this._routerSub.unsubscribe();
        }
        if (this._linksSub) {
            this._linksSub.unsubscribe();
        }
    }
};
__decorate([
    Input('linkActive'), 
    __metadata('design:type', String)
], LinkActive.prototype, "activeClass", void 0);
__decorate([
    Input(), 
    __metadata('design:type', Object)
], LinkActive.prototype, "activeOptions", void 0);
LinkActive = __decorate([
    Directive({ selector: '[linkActive]' }),
    __param(0, Query(LinkTo)),
    __param(4, Optional()),
    __param(4, Inject(LINK_ACTIVE_OPTIONS)), 
    __metadata('design:paramtypes', [QueryList, ElementRef, Router, Renderer, Object])
], LinkActive);
//# sourceMappingURL=link-active.js.map
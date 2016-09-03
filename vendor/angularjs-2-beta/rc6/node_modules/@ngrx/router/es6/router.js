var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LocationStrategy, PlatformLocation } from '@angular/common';
import { BrowserPlatformLocation } from '@angular/platform-browser';
import { Injectable, provide } from '@angular/core';
import { stringify as stringifyQueryParams } from 'query-string';
import { SyncSubject } from '@ngrx/core/SyncSubject';
export let Router = class Router extends SyncSubject {
    constructor(platformStrategy) {
        super({ path: _path(platformStrategy), type: 'push' });
        this.platformStrategy = platformStrategy;
        platformStrategy.onPopState(event => this._update('pop'));
        this._baseHref = _getBaseHref(platformStrategy);
    }
    _update(type) {
        this.next({ path: this.path(), type });
    }
    /**
     * Returns the normalized URL path.
     */
    path() {
        return _path(this.platformStrategy);
    }
    /**
     * Given a string representing a URL, returns the normalized URL path without leading or
     * trailing slashes
     */
    normalize(url) {
        return _normalize(this._baseHref, url);
    }
    /**
     * Given a string representing a URL, returns the platform-specific external URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing. This method will also add a hash if `HashLocationStrategy` is
     * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     */
    prepareExternalUrl(url, query = '') {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this.platformStrategy.prepareExternalUrl(url + _normalizeQueryParams(_normalizeQuery(query)));
    }
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     */
    go(path, query = '') {
        this.platformStrategy.pushState(null, '', path, _normalizeQuery(query));
        this._update('push');
    }
    /**
     * Changes the browsers URL to the normalized version of the given URL, and replaces
     * the top item on the platform's history stack.
     */
    replace(path, query = '') {
        this.platformStrategy.replaceState(null, '', path, _normalizeQuery(query));
        this._update('replace');
    }
    /**
     * Changes the browsers query parameters. Replaces the top item on the platform's
     * history stack
     */
    search(query = '') {
        const [pathname] = this.path().split('?');
        this.replace(pathname, query);
    }
    /**
     * Navigates forward in the platform's history.
     */
    forward() {
        this.platformStrategy.forward();
    }
    /**
     * Navigates back in the platform's history.
     */
    back() {
        this.platformStrategy.back();
    }
};
Router = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [LocationStrategy])
], Router);
function _path(location) {
    return _normalize(_getBaseHref(location), location.path());
}
function _normalize(baseHref, url) {
    return _stripTrailingSlash(_stripBaseHref(baseHref, _stripIndexHtml(url)));
}
function _getBaseHref(platformStrategy) {
    const browserBaseHref = platformStrategy.getBaseHref();
    return _stripTrailingSlash(_stripIndexHtml(browserBaseHref));
}
function _stripBaseHref(baseHref, url) {
    if (baseHref.length > 0 && url.startsWith(baseHref)) {
        return url.substring(baseHref.length);
    }
    return url;
}
function _stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
        // '/index.html'.length == 11
        return url.substring(0, url.length - 11);
    }
    return url;
}
function _stripTrailingSlash(url) {
    if (/\/$/g.test(url)) {
        url = url.substring(0, url.length - 1);
    }
    return url;
}
function _normalizeQuery(query) {
    return typeof query === 'string' ? query : stringifyQueryParams(query);
}
function _normalizeQueryParams(params) {
    return (params.length > 0 && params.substring(0, 1) !== '?') ? ('?' + params) : params;
}
export const ROUTER_PROVIDERS = [
    provide(Router, { useClass: Router }),
    provide(PlatformLocation, { useClass: BrowserPlatformLocation })
];
//# sourceMappingURL=router.js.map
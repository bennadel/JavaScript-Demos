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
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var query_string_1 = require('query-string');
var SyncSubject_1 = require('@ngrx/core/SyncSubject');
var Router = (function (_super) {
    __extends(Router, _super);
    function Router(platformStrategy) {
        var _this = this;
        _super.call(this, { path: _path(platformStrategy), type: 'push' });
        this.platformStrategy = platformStrategy;
        platformStrategy.onPopState(function (event) { return _this._update('pop'); });
        this._baseHref = _getBaseHref(platformStrategy);
    }
    Router.prototype._update = function (type) {
        this.next({ path: this.path(), type: type });
    };
    /**
     * Returns the normalized URL path.
     */
    Router.prototype.path = function () {
        return _path(this.platformStrategy);
    };
    /**
     * Given a string representing a URL, returns the normalized URL path without leading or
     * trailing slashes
     */
    Router.prototype.normalize = function (url) {
        return _normalize(this._baseHref, url);
    };
    /**
     * Given a string representing a URL, returns the platform-specific external URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing. This method will also add a hash if `HashLocationStrategy` is
     * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     */
    Router.prototype.prepareExternalUrl = function (url, query) {
        if (query === void 0) { query = ''; }
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this.platformStrategy.prepareExternalUrl(url + _normalizeQueryParams(_normalizeQuery(query)));
    };
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     */
    Router.prototype.go = function (path, query) {
        if (query === void 0) { query = ''; }
        this.platformStrategy.pushState(null, '', path, _normalizeQuery(query));
        this._update('push');
    };
    /**
     * Changes the browsers URL to the normalized version of the given URL, and replaces
     * the top item on the platform's history stack.
     */
    Router.prototype.replace = function (path, query) {
        if (query === void 0) { query = ''; }
        this.platformStrategy.replaceState(null, '', path, _normalizeQuery(query));
        this._update('replace');
    };
    /**
     * Changes the browsers query parameters. Replaces the top item on the platform's
     * history stack
     */
    Router.prototype.search = function (query) {
        if (query === void 0) { query = ''; }
        var pathname = this.path().split('?')[0];
        this.replace(pathname, query);
    };
    /**
     * Navigates forward in the platform's history.
     */
    Router.prototype.forward = function () {
        this.platformStrategy.forward();
    };
    /**
     * Navigates back in the platform's history.
     */
    Router.prototype.back = function () {
        this.platformStrategy.back();
    };
    Router = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [common_1.LocationStrategy])
    ], Router);
    return Router;
}(SyncSubject_1.SyncSubject));
exports.Router = Router;
function _path(location) {
    return _normalize(_getBaseHref(location), location.path());
}
function _normalize(baseHref, url) {
    return _stripTrailingSlash(_stripBaseHref(baseHref, _stripIndexHtml(url)));
}
function _getBaseHref(platformStrategy) {
    var browserBaseHref = platformStrategy.getBaseHref();
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
    return typeof query === 'string' ? query : query_string_1.stringify(query);
}
function _normalizeQueryParams(params) {
    return (params.length > 0 && params.substring(0, 1) !== '?') ? ('?' + params) : params;
}
exports.ROUTER_PROVIDERS = [
    core_1.provide(Router, { useClass: Router }),
    core_1.provide(common_1.PlatformLocation, { useClass: platform_browser_1.BrowserPlatformLocation })
];
//# sourceMappingURL=router.js.map
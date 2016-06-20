"use strict";
var common_1 = require('@angular/common');
var testing_1 = require('@angular/common/testing');
var core_1 = require('@angular/core');
var router_1 = require('../src/router');
var router_url_serializer_1 = require('../src/router_url_serializer');
var segments_1 = require('../src/segments');
var FakeAppRootCmp = (function () {
    function FakeAppRootCmp() {
    }
    /** @nocollapse */
    FakeAppRootCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'fake-app-root-comp', template: "<span></span>" },] },
    ];
    return FakeAppRootCmp;
}());
function routerFactory(componentResolver, urlSerializer, routerOutletMap, location) {
    return new router_1.Router(null, FakeAppRootCmp, componentResolver, urlSerializer, routerOutletMap, location);
}
exports.ROUTER_FAKE_PROVIDERS = [
    router_1.RouterOutletMap,
    /* @ts2dart_Provider */ { provide: common_1.Location, useClass: testing_1.SpyLocation },
    /* @ts2dart_Provider */ { provide: router_url_serializer_1.RouterUrlSerializer, useClass: router_url_serializer_1.DefaultRouterUrlSerializer },
    /* @ts2dart_Provider */ {
        provide: router_1.Router,
        useFactory: routerFactory,
        deps: /*@ts2dart_const*/ [core_1.ComponentResolver, router_url_serializer_1.RouterUrlSerializer, router_1.RouterOutletMap, common_1.Location]
    },
    /*@ts2dart_Provider*/ {
        provide: segments_1.RouteSegment,
        useFactory: function (r /** TODO #9100 */) { return r.routeTree.root; },
        deps: [router_1.Router]
    }
];
//# sourceMappingURL=router_testing_providers.js.map
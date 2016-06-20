import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, ComponentResolver } from '@angular/core';
import { Router, RouterOutletMap } from '../src/router';
import { DefaultRouterUrlSerializer, RouterUrlSerializer } from '../src/router_url_serializer';
import { RouteSegment } from '../src/segments';
class FakeAppRootCmp {
}
/** @nocollapse */
FakeAppRootCmp.decorators = [
    { type: Component, args: [{ selector: 'fake-app-root-comp', template: `<span></span>` },] },
];
function routerFactory(componentResolver, urlSerializer, routerOutletMap, location) {
    return new Router(null, FakeAppRootCmp, componentResolver, urlSerializer, routerOutletMap, location);
}
export const ROUTER_FAKE_PROVIDERS = [
    RouterOutletMap,
    /* @ts2dart_Provider */ { provide: Location, useClass: SpyLocation },
    /* @ts2dart_Provider */ { provide: RouterUrlSerializer, useClass: DefaultRouterUrlSerializer },
    /* @ts2dart_Provider */ {
        provide: Router,
        useFactory: routerFactory,
        deps: /*@ts2dart_const*/ [ComponentResolver, RouterUrlSerializer, RouterOutletMap, Location]
    },
    /*@ts2dart_Provider*/ {
        provide: RouteSegment,
        useFactory: (r /** TODO #9100 */) => r.routeTree.root,
        deps: [Router]
    }
];
//# sourceMappingURL=router_testing_providers.js.map
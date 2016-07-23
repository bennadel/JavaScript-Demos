"use strict";
var core_1 = require('@angular/core');
exports.ROUTES = new core_1.OpaqueToken('@ngrx/router Init Routes');
function getNamedComponents(route, name) {
    if (!route) {
        return { component: null, loadComponent: null };
    }
    if (!name) {
        return { component: route.component, loadComponent: route.loadComponent };
    }
    var components = route.components || {};
    var loadComponents = route.loadComponents || {};
    return { component: components[name], loadComponent: loadComponents[name] };
}
exports.getNamedComponents = getNamedComponents;
//# sourceMappingURL=route.js.map
import { OpaqueToken } from '@angular/core';
export const ROUTES = new OpaqueToken('@ngrx/router Init Routes');
export function getNamedComponents(route, name) {
    if (!route) {
        return { component: null, loadComponent: null };
    }
    if (!name) {
        return { component: route.component, loadComponent: route.loadComponent };
    }
    const components = route.components || {};
    const loadComponents = route.loadComponents || {};
    return { component: components[name], loadComponent: loadComponents[name] };
}
//# sourceMappingURL=route.js.map
import { ComponentFactory, ComponentRef, ResolvedReflectiveProvider, ViewContainerRef } from '@angular/core';
import { RouterOutletMap } from '../router';
/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <router-outlet></router-outlet>
 * ```
 *
 * Outlets can be named.
 *
 * ```
 * <router-outlet name="right"></router-outlet>
 * ```
 */
export declare class RouterOutlet {
    private _location;
    private _activated;
    outletMap: RouterOutletMap;
    constructor(parentOutletMap: RouterOutletMap, _location: ViewContainerRef, name: string);
    deactivate(): void;
    /**
     * Returns the loaded component.
     */
    readonly component: Object;
    /**
     * Returns true is the outlet is not empty.
     */
    readonly isActivated: boolean;
    /**
     * Called by the Router to instantiate a new component.
     */
    activate(factory: ComponentFactory<any>, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): ComponentRef<any>;
}

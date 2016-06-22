import { ComponentFactory, ResolvedReflectiveProvider, ViewContainerRef } from '@angular/core';
import { RouterOutletMap } from '../router_outlet_map';
import { ActivatedRoute } from '../router_state';
export declare class RouterOutlet {
    private location;
    private activated;
    private _activatedRoute;
    outletMap: RouterOutletMap;
    constructor(parentOutletMap: RouterOutletMap, location: ViewContainerRef, name: string);
    isActivated: boolean;
    component: Object;
    activatedRoute: ActivatedRoute;
    deactivate(): void;
    activate(factory: ComponentFactory<any>, activatedRoute: ActivatedRoute, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void;
}

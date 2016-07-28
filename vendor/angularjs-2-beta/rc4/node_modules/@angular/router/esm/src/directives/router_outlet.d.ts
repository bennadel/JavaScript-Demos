/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ResolvedReflectiveProvider } from '@angular/core';
import { RouterOutletMap } from '../router_outlet_map';
import { ActivatedRoute } from '../router_state';
/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name="left"></router-outlet>
 * <router-outlet name="right"></router-outlet>
 * ```
 *
 * @stable
 */
export declare class RouterOutlet {
    private location;
    private componentFactoryResolver;
    private activated;
    private _activatedRoute;
    outletMap: RouterOutletMap;
    readonly isActivated: boolean;
    readonly component: Object;
    readonly activatedRoute: ActivatedRoute;
    deactivate(): void;
    activate(activatedRoute: ActivatedRoute, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void;
}

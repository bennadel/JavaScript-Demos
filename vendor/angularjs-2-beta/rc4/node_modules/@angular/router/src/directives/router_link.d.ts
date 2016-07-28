/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationStrategy } from '@angular/common';
import { OnChanges } from '@angular/core';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
import { UrlTree } from '../url_tree';
/**
 * The RouterLink directive lets you link to specific parts of your app.
 *
 * Consider the following route configuration:

 * ```
 * [{ path: 'user/:name', component: UserCmp }]
 * ```
 *
 * When linking to this `User` route, you can write:
 *
 * ```
 * <a [routerLink]="/user/bob">link to user component</a>
 * ```
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 * Multiple static segments can be merged into one (e.g., `['/team/11/user', userName, {details:
 true}]`).
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 * instead look in the children of the current activated route.
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 * You can set query params and fragment as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">link to user
 component</a>
 * ```
 *
 * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
 *
 * @stable
 */
export declare class RouterLink {
    private router;
    private route;
    private locationStrategy;
    private commands;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    urlTree: UrlTree;
    constructor(router: Router, route: ActivatedRoute, locationStrategy: LocationStrategy);
    routerLink: any[] | string;
    onClick(button: number, ctrlKey: boolean, metaKey: boolean): boolean;
}
/**
 * See {@link RouterLink} for more information.
 * @stable
 */
export declare class RouterLinkWithHref implements OnChanges {
    private router;
    private route;
    private locationStrategy;
    target: string;
    private commands;
    queryParams: {
        [k: string]: any;
    };
    fragment: string;
    href: string;
    urlTree: UrlTree;
    routerLink: any[] | string;
    ngOnChanges(changes: {}): any;
    onClick(button: number, ctrlKey: boolean, metaKey: boolean): boolean;
    private updateTargetUrlAndHref();
}

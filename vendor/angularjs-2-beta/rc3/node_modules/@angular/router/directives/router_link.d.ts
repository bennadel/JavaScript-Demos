import { LocationStrategy } from '@angular/common';
import { OnChanges } from '@angular/core';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
import { UrlTree } from '../url_tree';
export declare class RouterLink implements OnChanges {
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
    constructor(router: Router, route: ActivatedRoute, locationStrategy: LocationStrategy);
    routerLink: any[] | string;
    ngOnChanges(changes: {}): any;
    onClick(button: number, ctrlKey: boolean, metaKey: boolean): boolean;
    private updateTargetUrlAndHref();
}

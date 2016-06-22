import { AfterContentInit, ElementRef, OnChanges, OnDestroy, Renderer } from '@angular/core';
import { Router } from '../router';
export declare class RouterLinkActive implements OnChanges, OnDestroy, AfterContentInit {
    private router;
    private element;
    private renderer;
    private links;
    private classes;
    private subscription;
    private routerLinkActiveOptions;
    constructor(router: Router, element: ElementRef, renderer: Renderer);
    ngAfterContentInit(): void;
    routerLinkActive: string[] | string;
    ngOnChanges(changes: {}): any;
    ngOnDestroy(): any;
    private update();
}

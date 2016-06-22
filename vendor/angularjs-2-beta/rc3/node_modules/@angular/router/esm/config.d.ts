import { Type } from '@angular/core';
export declare type RouterConfig = Route[];
export interface Route {
    path?: string;
    terminal?: boolean;
    component?: Type | string;
    outlet?: string;
    canActivate?: any[];
    canDeactivate?: any[];
    redirectTo?: string;
    children?: Route[];
}
export declare function validateConfig(config: RouterConfig): void;

import { ComponentResolver } from '@angular/core';
import { Type } from './facade/lang';
import { RouteTree, UrlTree } from './segments';
export declare function recognize(componentResolver: ComponentResolver, rootComponent: Type, url: UrlTree, existingTree: RouteTree): Promise<RouteTree>;

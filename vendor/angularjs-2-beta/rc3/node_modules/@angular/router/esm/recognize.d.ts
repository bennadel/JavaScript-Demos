import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterConfig } from './config';
import { RouterStateSnapshot } from './router_state';
import { UrlTree } from './url_tree';
export declare function recognize(rootComponentType: Type, config: RouterConfig, urlTree: UrlTree, url: string): Observable<RouterStateSnapshot>;

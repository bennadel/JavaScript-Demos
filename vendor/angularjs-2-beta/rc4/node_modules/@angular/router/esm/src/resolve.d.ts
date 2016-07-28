/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ComponentResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from './router_state';
export declare function resolve(resolver: ComponentResolver, state: RouterStateSnapshot): Observable<RouterStateSnapshot>;

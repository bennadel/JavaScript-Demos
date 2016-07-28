/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Observable } from 'rxjs/Observable';
import { RouterConfig } from './config';
import { UrlTree } from './url_tree';
export declare function applyRedirects(urlTree: UrlTree, config: RouterConfig): Observable<UrlTree>;

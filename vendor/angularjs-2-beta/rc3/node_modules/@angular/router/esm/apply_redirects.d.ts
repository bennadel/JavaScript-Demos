import { Observable } from 'rxjs/Observable';
import { RouterConfig } from './config';
import { UrlTree } from './url_tree';
export declare function applyRedirects(urlTree: UrlTree, config: RouterConfig): Observable<UrlTree>;

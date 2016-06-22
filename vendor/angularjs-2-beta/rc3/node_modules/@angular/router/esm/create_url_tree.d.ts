import { ActivatedRoute } from './router_state';
import { Params } from './shared';
import { UrlTree } from './url_tree';
export declare function createUrlTree(route: ActivatedRoute, urlTree: UrlTree, commands: any[], queryParams: Params, fragment: string): UrlTree;

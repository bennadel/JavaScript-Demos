import { ExtraOptions } from './common_router_providers';
import { RouterConfig } from './config';
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const router = [
 *   {path: 'home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(router, {enableTracing: true})]);
 * ```
 *
 * @experimental
 */
export declare function provideRouter(config: RouterConfig, opts?: ExtraOptions): any[];

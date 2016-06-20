import { Type } from '../../facade/lang';
import { RouteData } from '../../instruction';
import { RouteHandler } from './route_handler';
export declare class AsyncRouteHandler implements RouteHandler {
    private _loader;
    componentType: Type;
    data: RouteData;
    constructor(_loader: () => Promise<Type>, data?: {
        [key: string]: any;
    });
    resolveComponentType(): Promise<Type>;
}

import { Type } from '../../facade/lang';
import { RouteData } from '../../instruction';
import { RouteHandler } from './route_handler';
export declare class SyncRouteHandler implements RouteHandler {
    componentType: Type;
    data: RouteData;
    constructor(componentType: Type, data?: {
        [key: string]: any;
    });
    resolveComponentType(): Promise<any>;
}

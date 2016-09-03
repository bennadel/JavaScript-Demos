import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Provider } from '@angular/core';
import { RouterInstruction } from './router-instruction';
export class RouteParams extends Observable {
}
export class QueryParams extends Observable {
}
function createRouteParams(set$) {
    return set$.map(next => next.routeParams);
}
function createQueryParams(set$) {
    return set$.map(next => next.queryParams);
}
export const PARAMS_PROVIDERS = [
    new Provider(RouteParams, {
        deps: [RouterInstruction],
        useFactory: createRouteParams
    }),
    new Provider(QueryParams, {
        deps: [RouterInstruction],
        useFactory: createQueryParams
    })
];
//# sourceMappingURL=params.js.map
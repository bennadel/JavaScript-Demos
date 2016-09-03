"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('rxjs/add/operator/map');
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
var router_instruction_1 = require('./router-instruction');
var RouteParams = (function (_super) {
    __extends(RouteParams, _super);
    function RouteParams() {
        _super.apply(this, arguments);
    }
    return RouteParams;
}(Observable_1.Observable));
exports.RouteParams = RouteParams;
var QueryParams = (function (_super) {
    __extends(QueryParams, _super);
    function QueryParams() {
        _super.apply(this, arguments);
    }
    return QueryParams;
}(Observable_1.Observable));
exports.QueryParams = QueryParams;
function createRouteParams(set$) {
    return set$.map(function (next) { return next.routeParams; });
}
function createQueryParams(set$) {
    return set$.map(function (next) { return next.queryParams; });
}
exports.PARAMS_PROVIDERS = [
    new core_1.Provider(RouteParams, {
        deps: [router_instruction_1.RouterInstruction],
        useFactory: createRouteParams
    }),
    new core_1.Provider(QueryParams, {
        deps: [router_instruction_1.RouterInstruction],
        useFactory: createQueryParams
    })
];
//# sourceMappingURL=params.js.map
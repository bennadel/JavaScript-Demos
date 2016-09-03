"use strict";
var compose_1 = require('@ngrx/core/compose');
exports.identity = {
    apply: function (input$) {
        return input$;
    }
};
function composeHooks(hooks) {
    var allHooks = !hooks ? [exports.identity] : [exports.identity].concat(hooks);
    var resolved = allHooks.map(function (hook) { return function (input$) { return hook.apply(input$); }; });
    return compose_1.compose.apply(void 0, resolved);
}
exports.composeHooks = composeHooks;
//# sourceMappingURL=hooks.js.map
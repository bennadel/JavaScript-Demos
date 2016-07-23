import { compose } from '@ngrx/core/compose';
export const identity = {
    apply(input$) {
        return input$;
    }
};
export function composeHooks(hooks) {
    const allHooks = !hooks ? [identity] : [identity, ...hooks];
    const resolved = allHooks.map(hook => (input$) => hook.apply(input$));
    return compose(...resolved);
}
//# sourceMappingURL=hooks.js.map
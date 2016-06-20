import { Type } from '@angular/core';
import { reflector } from '../../core_private';
import { CanActivate } from './lifecycle_annotations_impl';
export function hasLifecycleHook(e, type /** TODO #9100 */) {
    if (!(type instanceof Type))
        return false;
    return e.name in type.prototype;
}
export function getCanActivateHook(type /** TODO #9100 */) {
    var annotations = reflector.annotations(type);
    for (let i = 0; i < annotations.length; i += 1) {
        let annotation = annotations[i];
        if (annotation instanceof CanActivate) {
            return annotation.fn;
        }
    }
    return null;
}
//# sourceMappingURL=route_lifecycle_reflector.js.map
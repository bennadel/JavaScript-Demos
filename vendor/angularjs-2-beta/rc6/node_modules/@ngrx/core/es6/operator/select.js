import { pluck } from 'rxjs/operator/pluck';
import { map } from 'rxjs/operator/map';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
export function select(pathOrMapFn, ...paths) {
    let mapped$;
    if (typeof pathOrMapFn === 'string') {
        mapped$ = pluck.call(this, pathOrMapFn, ...paths);
    }
    else if (typeof pathOrMapFn === 'function') {
        mapped$ = map.call(this, pathOrMapFn);
    }
    else {
        throw new TypeError(`Unexpected type ${typeof pathOrMapFn} in select operator,`
            + ` expected 'string' or 'function'`);
    }
    return distinctUntilChanged.call(mapped$);
}
//# sourceMappingURL=select.js.map
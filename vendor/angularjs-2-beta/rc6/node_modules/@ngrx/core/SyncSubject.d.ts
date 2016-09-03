import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
export declare class SyncSubject<T> extends Subject<T> {
    private _value;
    constructor(_value: T);
    protected _subscribe(subscriber: Subscriber<T>): TeardownLogic;
    protected _next(value: T): void;
    protected _error(err: any): void;
}

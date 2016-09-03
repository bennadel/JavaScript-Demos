import { Subject } from 'rxjs/Subject';
export class SyncSubject extends Subject {
    constructor(_value) {
        super();
        this._value = _value;
    }
    _subscribe(subscriber) {
        const subscription = super._subscribe(subscriber);
        if (subscription && !subscription.isUnsubscribed) {
            subscriber.next(this._value);
        }
        return subscription;
    }
    _next(value) {
        super._next(this._value = value);
    }
    _error(err) {
        this.hasErrored = true;
        super._error(this.errorValue = err);
    }
}
//# sourceMappingURL=SyncSubject.js.map
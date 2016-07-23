import { Subscriber } from 'rxjs/Subscriber';
export function enterZone(zone) {
    return this.lift(new EnterZoneOperator(zone));
}
export class EnterZoneOperator {
    constructor(_zone) {
        this._zone = _zone;
    }
    call(subscriber, source) {
        return source._subscribe(new EnterZoneSubscriber(subscriber, this._zone));
    }
}
class EnterZoneSubscriber extends Subscriber {
    constructor(destination, _zone) {
        super(destination);
        this._zone = _zone;
    }
    _next(value) {
        this._zone.run(() => this.destination.next(value));
    }
}
//# sourceMappingURL=enterZone.js.map
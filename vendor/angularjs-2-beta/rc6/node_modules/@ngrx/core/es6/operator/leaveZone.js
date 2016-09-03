import { Subscriber } from 'rxjs/Subscriber';
export function leaveZone(zone) {
    return this.lift(new LeaveZoneOperator(zone));
}
export class LeaveZoneOperator {
    constructor(_zone) {
        this._zone = _zone;
    }
    call(subscriber, source) {
        return source._subscribe(new LeaveZoneSubscriber(subscriber, this._zone));
    }
}
class LeaveZoneSubscriber extends Subscriber {
    constructor(destination, _zone) {
        super(destination);
        this._zone = _zone;
    }
    _next(value) {
        this._zone.runOutsideAngular(() => this.destination.next(value));
    }
}
//# sourceMappingURL=leaveZone.js.map
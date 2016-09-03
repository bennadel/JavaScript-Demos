"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require('rxjs/Subject');
var SyncSubject = (function (_super) {
    __extends(SyncSubject, _super);
    function SyncSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    SyncSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.isUnsubscribed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    SyncSubject.prototype._next = function (value) {
        _super.prototype._next.call(this, this._value = value);
    };
    SyncSubject.prototype._error = function (err) {
        this.hasErrored = true;
        _super.prototype._error.call(this, this.errorValue = err);
    };
    return SyncSubject;
}(Subject_1.Subject));
exports.SyncSubject = SyncSubject;
//# sourceMappingURL=SyncSubject.js.map
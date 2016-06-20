"use strict";
var core_1 = require('@angular/core');
var constants_1 = require('../constants');
var lang_1 = require('../facade/lang');
var router_1 = require('../router');
var RouterOutlet = (function () {
    function RouterOutlet(parentOutletMap, _location, name) {
        this._location = _location;
        parentOutletMap.registerOutlet(lang_1.isBlank(name) ? constants_1.DEFAULT_OUTLET_NAME : name, this);
    }
    RouterOutlet.prototype.deactivate = function () {
        this._activated.destroy();
        this._activated = null;
    };
    Object.defineProperty(RouterOutlet.prototype, "component", {
        /**
         * Returns the loaded component.
         */
        get: function () { return lang_1.isPresent(this._activated) ? this._activated.instance : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        /**
         * Returns true is the outlet is not empty.
         */
        get: function () { return lang_1.isPresent(this._activated); },
        enumerable: true,
        configurable: true
    });
    /**
     * Called by the Router to instantiate a new component.
     */
    RouterOutlet.prototype.activate = function (factory, providers, outletMap) {
        this.outletMap = outletMap;
        var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this._location.parentInjector);
        this._activated = this._location.createComponent(factory, this._location.length, inj, []);
        return this._activated;
    };
    /** @nocollapse */
    RouterOutlet.decorators = [
        { type: core_1.Directive, args: [{ selector: 'router-outlet' },] },
    ];
    /** @nocollapse */
    RouterOutlet.ctorParameters = [
        { type: router_1.RouterOutletMap, },
        { type: core_1.ViewContainerRef, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['name',] },] },
    ];
    return RouterOutlet;
}());
exports.RouterOutlet = RouterOutlet;
//# sourceMappingURL=router_outlet.js.map
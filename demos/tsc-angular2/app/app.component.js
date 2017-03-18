"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
// Import these modules to create side-effects.
require("rxjs/add/observable/of");
var AppComponent = (function () {
    // I initialize the app component.
    function AppComponent() {
        this.movies = Observable_1.Observable.of([
            "O Brother, Where Art Thou?",
            "Home for the Holidays",
            "The Firm",
            "Broadcast News",
            "Raising Arizona"
        ]);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-app",
        styleUrls: ["./app.component.css"],
        template: "\n\t\t<p>\n\t\t\tBest <strong>Holly Hunter</strong> movies:\n\t\t</p>\n\n\t\t<ul>\n\t\t\t<li *ngFor=\"let movie of movies | async\">\n\t\t\t\t{{ movie }}\n\t\t\t</li>\n\t\t</ul>\n\n\t\t<p>\n\t\t\t<em>This demo was built with the TSC compiler, v2.2.1.</em>\n\t\t</p>\n\t"
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
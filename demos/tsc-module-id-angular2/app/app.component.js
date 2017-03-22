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
            "Elysium",
            "Inside Man",
            "Contact",
            "Maverick",
            "Little Man Tate",
            "The Silence of the Lambs"
        ]);
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        styleUrls: ["./app.component.css"],
        templateUrl: "./app.component.htm"
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
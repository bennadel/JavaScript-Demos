webpackJsonp([2,3],{

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var platform_browser_1 = __webpack_require__(181);
var core_1 = __webpack_require__(0);
// Import the application components and services.
var app_component_1 = __webpack_require__(310);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        imports: [platform_browser_1.BrowserModule],
        declarations: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 296:
/***/ (function(module, exports) {

module.exports = "\n:host {\n\tdisplay: block ;\n\tfont-size: 16px ;\n}\n\n:host >>> a {\n\tcolor: red ;\n\tcursor: pointer ;\n\ttext-decoration: underline ;\n\tuser-select: none ;\n\t\t-moz-user-select: none ;\n\t\t-webkit-user-select: none ;\n}\n\n:host >>> hr {\n\tmargin: 30px 0px 30px 0px ;\n}\n\nstrong {\n\tbackground-color: gold ;\n}\n"

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
// Import the application components and services.
var zembed_service_1 = __webpack_require__(315);
var AppComponent = (function () {
    // I initialize the app component.
    function AppComponent() {
        // Try consuming the zEmbed() object as an invocable Function.
        zembed_service_1.zEmbed(function () {
            // ...
        });
        // Try consuming the zEmbed object as an API surface area.
        zembed_service_1.zEmbed.show();
        zembed_service_1.zEmbed.hide();
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        styles: [__webpack_require__(296)],
        template: "\n\t\t<p>\n\t\t\t<em>Experimenting with Namespace declaration merging.</em>\n\t\t</p>\n\t"
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;


/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Import the core angular services.
var platform_browser_dynamic_1 = __webpack_require__(73);
// Import the root module for bootstrapping.
var app_module_1 = __webpack_require__(200);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The zEmbed object for the Zendesk web widget has a dual nature. It is both an 
// invocable Function and, later on its life-cycle, an object with properties that 
// represent the API. In TypeScript, we can model this kind of duality by using 
// "Declaration Merging". This feature allows two or more separate declarations to 
// aggregate the overall definition of a particular value. One of the supported
// merge operations is a "Function" and a "Namespace" merge.

Object.defineProperty(exports, "__esModule", { value: true });
// Here, the original zEmbed() function is acting as the "Function" in our TypeScript
// declaration merge.
function zEmbed(callback) {
    console.log("zEmbed() provided with callback...");
}
exports.zEmbed = zEmbed;
// ... then, we can create a Namespace that declared the Properties on our zEmbed 
// Function. The exported properties in this namespace will actual be injected into
// the zEmbed() "value declaration" above.
(function (zEmbed) {
    // Exports as zEmbed.hide().
    function hide() {
        console.log("zEmbed.hide() called...");
    }
    zEmbed.hide = hide;
    // Exports as zEmbed.show().
    function show() {
        console.log("zEmbed.show() called...");
    }
    zEmbed.show = show;
})(zEmbed = exports.zEmbed || (exports.zEmbed = {}));


/***/ })

},[313]);
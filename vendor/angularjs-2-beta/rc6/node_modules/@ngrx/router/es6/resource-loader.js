var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Provider } from '@angular/core';
export let ResourceLoader = class ResourceLoader {
    load(sync, async, defaultValue) {
        if (!!sync) {
            return Promise.resolve(sync);
        }
        else if (!!async) {
            return Promise.resolve(async());
        }
        return Promise.resolve(defaultValue);
    }
};
ResourceLoader = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], ResourceLoader);
export const RESOURCE_LOADER_PROVIDERS = [
    new Provider(ResourceLoader, { useClass: ResourceLoader })
];
//# sourceMappingURL=resource-loader.js.map

// Import vendor modules.
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideZoneChangeDetection } from "@angular/core";
import { withComponentInputBinding } from "@angular/router";
import { withHashLocation } from "@angular/router";
import { withRouterConfig } from "@angular/router";

// Import app modules.
import { routes } from "./app.routes";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({
			eventCoalescing: true
		}),
		provideRouter(
			routes,
			withHashLocation(),
			withComponentInputBinding(),
			withRouterConfig({
				paramsInheritanceStrategy: "always"
			})
		)
	]
};

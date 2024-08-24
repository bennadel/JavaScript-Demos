
// Import vendor modules.
import { ApplicationConfig } from "@angular/core";
import { provideZoneChangeDetection } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({
			eventCoalescing: true
		})
	]
};

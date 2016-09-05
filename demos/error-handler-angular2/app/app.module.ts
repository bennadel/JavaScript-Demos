
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { ErrorLogService } from "./error-log.service";
import { LOGGING_ERROR_HANDLER_PROVIDERS } from "./logging-error-handler";
import { LOGGING_ERROR_HANDLER_OPTIONS } from "./logging-error-handler";

@NgModule({
	bootstrap: [ AppComponent ],
	imports: [ 
		BrowserModule,
		HttpModule 
	],
	declarations: [ AppComponent ],
	providers: [
		ErrorLogService,

		// CAUTION: This providers collection overrides the CORE ErrorHandler with our
		// custom version of the service that logs errors to the ErrorLogService.
		LOGGING_ERROR_HANDLER_PROVIDERS,

		// OPTIONAL: By default, our custom LoggingErrorHandler has behavior around 
		// rethrowing and / or unwrapping errors. In order to facilitate dependency-
		// injection instead of resorting to the use of a Factory for instantiation, 
		// these options can be overridden in the providers collection.
		{
			provide: LOGGING_ERROR_HANDLER_OPTIONS,
			useValue: {
				rethrowError: false,
				unwrapError: false
			}
		}
	]
})
export class AppModule {
	// ... nothing to do here.
}

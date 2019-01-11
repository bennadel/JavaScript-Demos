
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AppConfig } from "./app.config";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// The contextual page request has embedded configuration data into the JavaScript
// execution context using the window.appConfig key. Since we don't want to couple the
// rest of our Angular application to this implementation detail, we're going to map
// this config object onto an injectable Type that also provides us with type-safety.
export function getAppConfig() : AppConfig {

	var config: AppConfig = ( <any>window ).appConfig;

	// Assert that the page request provided the configuration.
	if ( ! config ) {

		throw( new Error( "Application bootstrapping could not locate 'window.appConfig' value." ) );

	}

	return( config );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		// Provide the AppConfig as an injectable Type for the rest of the application
		// components and services.
		{
			provide: AppConfig,
			useFactory: getAppConfig
		}
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

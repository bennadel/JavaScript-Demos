
// Import the core angular services.
import { APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AppConfig } from "./app-config.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [
		// The APP_INITIALIZER multi-provider allows for additional asynchronous
		// configuration to take place during the bootstrapping process. These
		// initializers will "block" the application until the returned Promises are
		// resolved, which allows us to make a request to the remote server in order to
		// gather user-specific or environment-specific configuration values that are NOT
		// available at compile-time.
		{
			provide: APP_INITIALIZER,
			useFactory: function( appConfig: AppConfig ) {

				async function asyncInitializer() : Promise<void> {

					// The .loadRemoteConfig() method will trigger an AJAX request that
					// will populate the AppConfig instance. This way, it will contain
					// the remote configuration data by the time that it gets injected
					// into other Providers and Classes.
					await appConfig.loadRemoteConfig();

				}

				// NOTE: The factory function returns the asynchronous FUNCTION - it does
				// not execute the function directly.
				return( asyncInitializer );

			},
			deps: [ AppConfig ],
			multi: true
		}
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

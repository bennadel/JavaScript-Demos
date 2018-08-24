
// Import the core angular services.
import { APP_INITIALIZER } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Provider } from "@angular/core";

// Import the application components and services.
import { IP_INFO_API_KEY } from "./geocode.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I am the interface for the Config object that will be loaded off disk. This object
// will be made available to Provider Factory functions such that other Providers can
// then be dynamically configured during the application bootstrapping process.
interface Config {
	ipInfo: {
		apiToken: string;
	}
}

@Injectable({
	providedIn: "root"
})
export class AppInitializer {

	public config: Config | null;

	private httpClient: HttpClient;

	// I initialize the app initializer.
	constructor( httpClient: HttpClient ) {

		this.httpClient = httpClient;

		// We will be loading the configuration from a known location on the server.
		// Once it is loaded, this property will be used to dynamically define other
		// injectables in the application providers.
		this.config = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I load the remote config file into the config property.
	public async loadConfig() : Promise<void> {

		try {

			this.config = await this.httpClient
				.get<Config>( "./app.config.json" )
				.toPromise()
			;

			console.group( "Configuration Loaded" );
			console.log( this.config );
			console.groupEnd();

		} catch ( error ) {

			console.group( "Configuration Failed" );
			console.error( error );
			console.groupEnd();

			// NOTE: Throwing this error will prevent the application from bootstrapping.
			throw( error );
			
		}

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var APP_INITIALIZER_PROVIDERS: Provider[] = [
	// In Angular, the Providers are evaluated in a LAZY FASHION. This means that they
	// are not created until they are actually required by the application. This works
	// to our benefit because it means that we can use Factory Functions to define some
	// of the providers using data that isn't necessarily available at compile-time. In
	// this case, our "APP_INITIALIZER" will be evaluated first, which will block the
	// rest of the bootstrapping process. Then, once the APP_INITIALIZER is evaluated,
	// and application bootstrapping is allowed to continue, we'll have the data needed
	// to configure the rest of the dynamic providers.
	{
		provide: APP_INITIALIZER,
		useFactory: function( appInitializer: AppInitializer ) {

			return(
				function() : Promise<void> {

					// The application will "block" until this promise is resolved.
					return( appInitializer.loadConfig() );

				}
			);

		},
		deps: [ AppInitializer ],
		multi: true
	},
	// Providers aren't evaluated in Angular until they are required. Which means that
	// as long as !!!! NOTHING MAKES EAGER USE OF THE GEOCODESERVICE !!!!, then we can
	// safely define the IP_INFO_API_KEY after the APP_INITIALIZER has run.
	{
		provide: IP_INFO_API_KEY,
		useFactory: function( appInitializer: AppInitializer ) {

			return( appInitializer.config.ipInfo.apiToken );

		},
		deps: [ AppInitializer ]
	}
];


// Import the core angular services.
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class AppConfig {

	// In the properties list, we're using the "DEFINITE ASSIGNMENT ASSERTION" (!) so
	// that we don't have to provide default values for all of the properties that are
	// going to be overwritten by the remote configuration data. As part of the
	// Application Bootstrapping logic, we know that this class will never be used until
	// the .loadRemoteConfig() method runs and the results have been appended to the
	// instance. As such, by the time the rest of the classes inject the AppConfig, these
	// data structures will all have been created / populated.
	public featureFlags!: {
		"feature-a": boolean;
		"feature-b": boolean;
		"feature-c": boolean;
	};

	private httpClient: HttpClient;

	// I initialize the app initializer.
	constructor( httpClient: HttpClient ) {

		this.httpClient = httpClient;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I load the remote configuration file into the instance.
	// --
	// CAUTION: This method is being called as part of the application bootstrapping
	// process. Changes to this logic here may affect the ability for the Angular
	// application to start.
	public async loadRemoteConfig() : Promise<void> {

		try {

			var remoteConfig = await this.httpClient
				.get<AppConfig>( "assets/api/config.json" )
				.toPromise()
			;

			// The intention here is for the remote configuration payload to have the
			// same structure as the AppConfig object. As such, we should just be able to
			// merge the remote structure into the local structure and all of the
			// "definite assignment assertions" will come into fruition.
			Object.assign( this, remoteConfig );

			console.group( "Remote Configuration Loaded" );
			console.log( remoteConfig );
			console.groupEnd();

		} catch ( error ) {

			console.group( "Remote Configuration Failed" );
			console.error( error );
			console.groupEnd();

			// NOTE: Throwing this error will prevent the application from bootstrapping.
			throw( error );

		}

	}

}

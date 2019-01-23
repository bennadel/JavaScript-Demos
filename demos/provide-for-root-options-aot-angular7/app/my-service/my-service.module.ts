
// Import the core angular services.
import { InjectionToken } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { MyService } from "./my-service.service";
import { MyServiceOptions } from "./my-service.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Re-export services, treating the module like a "barrel".
export { MyService };
export { MyServiceOptions };

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule()
export class MyServiceModule {
	
	// I setup the module providers for the root application.
	static forRoot( options?: ModuleOptions ) : ModuleWithProviders {

		return({
			ngModule: MyServiceModule,
			providers: [
				// In order to translate the raw, optional OPTIONS argument into an 
				// instance of the MyServiceOptions TYPE, we have to first provide it as
				// an injectable so that we can inject it into our FACTORY FUNCTION.
				{
					provide: FOR_ROOT_OPTIONS_TOKEN,
					useValue: options
				},
				// Once we've provided the OPTIONS as an injectable, we can use a FACTORY
				// FUNCTION to then take that raw configuration object and use it to
				// configure an instance of the MyServiceOptions TYPE (which will be
				// implicitly consumed by the MyService constructor).
				{
					provide: MyServiceOptions,
					useFactory: provideMyServiceOptions,
					deps: [ FOR_ROOT_OPTIONS_TOKEN ]
				}

				// NOTE: We don't have to explicitly provide the MyService class here
				// since it will automatically be picked-up using the "providedIn"
				// Injectable() meta-data.
			]
		});

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I define the shape of the optional configuration data passed to the forRoot() method.
export interface ModuleOptions {
	retryCount?: number;
	retryInterval?: number;
}

// I am the token that makes the raw options available to the following factory function.
// --
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
export var FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ModuleOptions>( "forRoot() MyService configuration." );

// I translate the given raw OPTIONS into an instance of the MyServiceOptions TYPE. This
// will allows the MyService class to be instantiated and injected with a fully-formed
// configuration class instead of having to deal with the Inject() meta-data and a half-
// baked set of configuration options.
// --
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
export function provideMyServiceOptions( options?: ModuleOptions ) : MyServiceOptions {

	var myServiceOptions = new MyServiceOptions();

	// If the optional options were provided via the .forRoot() static method, then apply
	// them to the MyServiceOptions Type provider.
	if ( options ) {

		if ( typeof( options.retryCount ) === "number" ) {

			myServiceOptions.retryCount = options.retryCount;

		}

		if ( typeof( options.retryInterval ) === "number" ) {

			myServiceOptions.retryInterval = options.retryInterval;

		}

	}

	return( myServiceOptions );

}

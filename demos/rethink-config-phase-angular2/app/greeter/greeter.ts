
// Import the core angular services.
import { Inject } from "@angular/core";
import { OpaqueToken } from "@angular/core";

// Import the application components and services.
import { IGreetTransformer } from "./transformers";


// I am the dependency-injection token that can be used to aggregate greet transformers.
// This is the collection that will be injected into the Greeter class during application
// bootstrapping. This kind of "multi" collection replaces the concept of a configuration
// phase in Angular 1. 
export var GREETER_TRANSFORMERS = new OpaqueToken( "Injection token for Greet transformers." );


// I provide a service for generating greeting messages.
export class Greeter {

	private transformers: IGreetTransformer[];


	// I initialize the service.
	constructor( @Inject( GREETER_TRANSFORMERS ) transformers: IGreetTransformer[] ) {

		this.transformers = transformers;

	}

	
	// ---
	// PUBLIC METHODS.
	// ---


	// I return the greeting for the given name.
	public greet( name: string ) : string {

		var greeting = this.transformers.reduce(
			( reduction: string, transformer: IGreetTransformer ) : string => {

				return( transformer.transform( reduction ) );

			},
			name
		);

		return( greeting );

	}

}

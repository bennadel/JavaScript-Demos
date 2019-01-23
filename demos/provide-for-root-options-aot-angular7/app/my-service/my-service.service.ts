
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class MyServiceOptions {

	public retryCount: number = 6;
	public retryInterval: number = 2000;

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class MyService {

	private options: MyServiceOptions;

	// I initialize the my-service service.
	constructor( options: MyServiceOptions ) {

		this.options = options;

		console.group( "MyService Constructor" );
		console.log( "Injected Options" );
		console.log( this.options );
		console.groupEnd();

	}

}


// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class ErrorLogger {

	constructor() {
		// ....
	}

	// ---
	// PUBLIC METHODS.
	// ---

	public log( error: any, message: string = "" ) : void {

		console.group( "Error Logger" );
		
		if ( message ) {

			console.warn( message );
		}

		console.error( error );
		console.groupEnd();

	}

}

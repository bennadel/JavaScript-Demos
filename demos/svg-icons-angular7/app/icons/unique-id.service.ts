
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class UniqueIDService {

	private id: number = Date.now();

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the next available unique ID.
	public next() : string {

		return( `aria-id-${ ++this.id }` );

	}

}

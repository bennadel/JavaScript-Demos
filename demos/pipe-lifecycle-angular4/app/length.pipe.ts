
// Import the core angular services.
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({
	name: "length",
	pure: true
})
export class LengthPipe implements PipeTransform {

	// I initialize the length pipe.
	constructor() {

		console.warn( "Creating Length Pipe." );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the length of the given value.
	public transform( value: string ) : number {

		return( value.length );

	}

}

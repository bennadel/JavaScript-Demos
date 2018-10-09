
// Import the core angular services.
import { DOCUMENT } from "@angular/platform-browser";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class DomUtils {

	private doc: Document;

	// I initialize the DOM Utils service.
	constructor( @Inject( DOCUMENT ) doc: any ) {

		this.doc = doc;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public hideHtmlOverflow() : void {

		this.doc.querySelector( "html" ).style.overflow = "hidden";

	}


	public showHtmlOverflow() : void {

		this.doc.querySelector( "html" ).style.overflow = "";

	}

}

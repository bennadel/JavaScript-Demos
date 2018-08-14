
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class MessageService {

	// I initialize the message service.
	constructor() {
		// ....
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I send messages outside of the current Angular application to the parent window.
	public send( message: any ) : void {

		window.postMessage( message, this.getOriginForSelf() );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I calculate the postMessage() origin that will lock the message target down to
	// the current window (for tightest security).
	// --
	// NOTE: Technically, this isn't really necessary since we know that we're only
	// sending messages to the SELF window. But, it's a good practice to always provide
	// an explicit origin value.
	private getOriginForSelf() : string {

		// At this time, if the application is being loaded directly off disk (ie, not
		// being served-up as a web-app), then the origin has to be "*" or the message
		// will be denied by the browser. If you never expect to serve from disk, you can
		// omit this edge-case.
		if ( window.location.protocol === "file:" ) {

			return( "*" );

		// If the application is being served-up "proper", then let's lock it down to the
		// current origin.
		} else {

			return( `${ window.location.protocol }//${ window.location.host }` );
			
		}

	}

}

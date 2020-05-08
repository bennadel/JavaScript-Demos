
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// So that TypeScript doesn't complain, we're going to augment the GLOBAL / WINDOW 
// name-space definition to include the Tracker API. This also provides us with a place
// to actually DOCUMENT the API so that our developers aren't guessing about what's
// available on the library.
declare global {
	var tracker: Tracker;
}

// The following interfaces both help with the Tracker definition as well as with the
// type annotations that we're going to use in our proxy API.
export interface Tracker {
	identify( user: UserIdentity ) : void;
	track( eventType: string, eventData?: EventData ) : void;
}

export interface UserIdentity {
	id: number;
	name: string;
	fields: {
		[ key: string ]: any;
	}
}

export interface EventData {
	[ key: string ]: any;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class ThirdPartyTracker {

	private trackerPromise: Promise<Tracker> | null;

	// I initialize the third-party-tracker service, which proxies a 3rd-party script
	// that MAY HAVE BEEN LOADED in the page or MAY HAVE BEEN BLOCKED by an ad-blocker.
	constructor() {

		this.trackerPromise = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I identify the application user.
	public identify( user: UserIdentity ) : void {

		this.getTracker().then(
			( tracker ) => {

				console.info( "Identifying user,", user.name, "." );
				tracker.identify( user );

			}
		);

	}


	// I track the given event for the previously-identified user.
	public track( eventType: string, eventData?: EventData ) : void {

		this.getTracker().then(
			( tracker ) => {

				console.info( "Tracking user action,", eventType, "." );
				tracker.track( eventType, eventData );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return a Promise that resolves with a Tracker API (which may be the 3rd-party
	// library or a mock API representation).
	private getTracker() : Promise<Tracker> {

		if ( this.trackerPromise ) {

			return( this.trackerPromise );

		}

		if ( window.tracker ) {

			return( this.trackerPromise = Promise.resolve( window.tracker ) );

		}

		// A "complete" status indicates that the "load" event has been fired on the
		// window; and, that all sub-resources such as Scripts, Images, and Frames have
		// been loaded.
		if ( window.document.readyState === "complete" ) {

			// If this event has fired AND the 3rd-party script isn't available (see IF-
			// condition BEFORE this one), it means that the 3rd-party script either
			// failed on the network or was BLOCKED by an ad-blocker. As such, we have to
			// fall-back to using a mock API.
			return( this.trackerPromise = Promise.resolve( new NoopTracker() ) );

		}

		// ASSERT: If we made it this far, the document has not completed loading (but it
		// may be in an "interactive" state which is when I believe that the Angular app
		// gets bootstrapped). As such, we need bind to the LOAD event to wait for our
		// third-party scripts to load (or fail to load, or be blocked).
		this.trackerPromise = new Promise<Tracker>(
			( resolve ) => {

				window.addEventListener(
					"load",
					function handleWindowLoad() {

						// At this point, the 3rd-party library is either available or
						// it's not - there's no further loading to do. If it's not
						// present on the global scope, we're going to fall-back to using
						// a mock API.
						resolve( window.tracker || new NoopTracker() );

					}
				);

			}
		);

		return( this.trackerPromise );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I provide a mock API for the 3rd-party script. This just allows the consuming code to
// act as though the library is available even if it failed to load (example, it was
// blocked by an ad-blocker).
class NoopTracker implements Tracker {

	constructor() {

		console.warn( "Tracker API not available, falling back to mock API." );

	}

	public identify( user: UserIdentity ) : void {

		// NOOP implement, nothing to do....

	}

	public track( eventType: string, eventData?: EventData ) : void {

		// NOOP implement, nothing to do....

	}

}

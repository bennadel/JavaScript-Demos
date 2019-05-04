
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { DelayedScriptLoader } from "./delayed-script-loader";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Since I don't have a Type Definition for this demo library, I'm just going to declare
// the interface here and then explicitly cast the global value when I reference it.
interface AnalyticsScript {
	identify( userID: UserIdentifier, traits: UserTraits ) : void;
	track( eventID: EventIdentifier, eventProperties: EventProperties ) : void;
}

export type UserIdentifier = string | number;

export interface UserTraits {
	[ key: string ]: any;
}

export type EventIdentifier = string;

export interface EventProperties {
	[ key: string ]: any;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class AnalyticsService {

	private scriptLoader: DelayedScriptLoader;

	// I initialize the analytics service.
	constructor() {

		this.scriptLoader = new DelayedScriptLoader( "./analytics-service.js", ( 10 * 1000 ) );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I identify the user to be associated with subsequent tracking events.
	public identify( userID: UserIdentifier, traits: UserTraits ) : void {

		this.run(
			( analytics ) => {

				analytics.identify( userID, traits );

			}
		);

	}


	// I track the given event for the previously-identified user.
	public track( eventID: EventIdentifier, eventProperties: EventProperties ) : void {

		this.run(
			( analytics ) => {

				analytics.track( eventID, eventProperties );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return a Promise that resolves with the 3rd-party Analytics Script.
	private async getScript() : Promise<AnalyticsScript> {

		// CAUTION: For the sake of simplicity, I am not going to worry about the case in
		// which the analytics scripts fails to load. Ideally, I might create some sort
		// of "Null Object" version of the analytics API such that the rest of the code
		// can run as expected with various no-op method implementations.
		await this.scriptLoader.load();
		// NOTE: Since I don't have an installed Type for this service, I'm just casting
		// Window to ANY and then re-casting the global service that we know was just
		// injected into the document HEAD.
		return( ( window as any ).analytics as AnalyticsScript );

	}


	// I run the given callback after the remote analytics library has been loaded.
	private run( callback: ( analytics: AnalyticsScript ) => void ) : void {

		this.getScript()
			.then( callback )
			.catch(
				( error ) => {
					// Swallow underlying analytics error - they are not important.
				}
			)
		;

	}

}

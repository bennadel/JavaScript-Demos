
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface UnloadCallback {
	( service?: AppStorageService ) : void;
}


@Injectable({
	providedIn: "root"
})
export class AppStorageService {
	
	private unloadCallbacks: UnloadCallback[];

	// I initialize the app storage service.
	constructor() {

		this.unloadCallbacks = [];

		// The app storage service will be the central point of unload for the
		// application. As such, we can register a single handler here and then simply
		// consume the collection of unload callbacks.
		window.addEventListener( "beforeunload", this.handleUnload, false );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I load the data with the given key from the persistent store. Returns null if
	// the storage device or the data is unavailable.
	public loadData<T = any>( key: string ) : T | null {

		try {

			var value = window.localStorage.getItem( key );

			if ( value !== null ) {

				window.localStorage.removeItem( key );

				return( JSON.parse( value ) );

			}

		} catch ( error ) {

			// Swallow error for now....
			
		}

		return( null );

	}


	// I register the given  unload callback.
	public registerUnloadCallback( callback: UnloadCallback ) : void {

		this.unloadCallbacks.push( callback );

	}


	// I save the given data to the persistent storage using the given key.
	public saveData( key: string, data: any ) : void {

		try {

			window.localStorage.setItem( key, JSON.stringify( data ) );

		} catch ( error ) {

			// Swallow error for now....

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle the unload event for the application.
	private handleUnload = ( event: any ) : void => {

		for ( var callback of this.unloadCallbacks ) {

			try {

				callback( this );

			} catch ( error ) {

				console.group( "App Unload Callback Error" );
				console.log( callback );
				console.error( error );
				console.groupEnd();

			}

		}

	}

}

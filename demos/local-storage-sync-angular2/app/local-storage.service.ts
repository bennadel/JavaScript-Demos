
interface ICache {
	[ key: string ]: any
}


// I provide a proxy to the native localStorage object that operates on an in-memory
// cache and only reads from the localStorage as a fallback.
// --
// CAUTION: This services returns direct references to the cached data. This creates 
// an inconsistent API in that it sometimes returns new values and sometimes returns 
// shared values. This means that mutations to a returned value may or may not be 
// observed in other parts of the code. It is advised that you DO NOT DIRECTLY MUTATE
// the values passed-to or returned-from this service.
export class LocalStorageService {

	private cache: ICache;
	private keyPrefix: string;

	
	// I initialize the localStorage service.
	constructor() {

		this.cache = Object.create( null );
		this.keyPrefix = "ng2-demo-"; // TODO: Inject this or use Module config phase.

		// When the localStorage object is updated from ANOTHER WINDOW, pertaining to 
		// this origin, a "storage" event is triggered. This event, however, is NOT 
		// TRIGGERED if the current window updates the localStorage object. As such,
		// we can use this event to update our in-memory cache of the localStorage 
		// content.
		window.addEventListener( "storage", this.handleStorageEvent );

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I return the localStorage item with the given key.
	public getItem( key: string ) : any {

		var normalizeKey = this.normalizeKey( key );

		// If the item is already in the in-memory cache, return it directly.
		// --
		// CAUTION: Returning direct reference to cached value.
		if ( normalizeKey in this.cache ) {

			return( this.cache[ normalizeKey ] );

		}

		// If the item was not in the in-memory cache, we'll need to load it from the
		// localStorage. However, to demonstrate that we are using AND SYNCHRONIZING
		// the in-memory cache, let's log this fallback.
		console.warn( "Reading from underlying localStorage." );

		// Load, cache, and return the item.
		// --
		// CAUTION: Returning direct reference to cached value.
		return( this.cache[ normalizeKey ] = JSON.parse( localStorage.getItem( normalizeKey ) ) );

	}


	// I store the item at the given key.
	public setItem( key: string, value: any ) : void {

		var normalizeKey = this.normalizeKey( key );

		// Store it to both the in-memory cache and the localStorage. This way, when
		// we read it later, we can read it directly from the in-memory cache.
		// --
		// CAUTION: Storing direct-reference to cached value.
		this.cache[ normalizeKey ] = value;
		localStorage.setItem( normalizeKey, JSON.stringify( value ) );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I handle the storage event triggered by localStorage changes from another process.
	// I use this even to ensure that the in-memory cache is up-to-date.
	// --
	// CAUTION: Using property-binding here, NOT class method (a TypeScript feature).
	private handleStorageEvent = ( event: StorageEvent ) : void => {

		// Since our keys are name-spaced, we want to ignore any updates to the 
		// localStorage that fall outside of our usage.
		if ( ! event.key.startsWith( this.keyPrefix ) ) {

			return;

		}

		console.warn( "LocalStorage Event: [", event.key, "]" );

		// Update the in-memory cache. Since the event contains the item itself, we can
		// move that item directly into the in-memory cache rather than having to go 
		// back to the localStorage for a subsequent read.
		if ( event.newValue === null ) {

			delete( this.cache[ event.key ] );

		} else {

			this.cache[ event.key ] = JSON.parse( event.newValue );

			console.table( this.cache[ event.key ] );

		}

	}


	// I normalize the key for persistence. 
	private normalizeKey( key: string ) : string {

		return( this.keyPrefix + key );

	}

}

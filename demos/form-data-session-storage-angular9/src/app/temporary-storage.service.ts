
// Import the core angular services.
import { Injectable } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface StorageWrapper {
	// NOTE: Even though the current storage implementations for StorageWrapper both
	// provide SYNCHRONOUS APIs, I'm forcing the GET request to be an ASYNCHRONOUS API in
	// order to future-proof it against other implementations that use technologies like
	// IndexedDB or remote AJAX requests and cannot be synchronous.
	get<T>( key: string ) : Promise<T | null>;
	remove( key: string ) : void;
	set( key: string, value: any ) : void;
}

interface StorageCache {
	[ key: string ]: any;
}

@Injectable({
	providedIn: "root"
})
export class TemporaryStorageService {

	private storage: StorageWrapper;

	// I initialize the temporary storage service, which can act as a sort of "flash
	// memory", persisting data across page-refreshes (if the underlying technologies
	// are available).
	constructor( zone: NgZone ) {

		// Since the type of storage may vary from browser to browser, I'm wrapping the
		// different technologies in abstractions that all expose the same, simple API.
		this.storage = ( window.sessionStorage )
			? new SessionStorageWrapper( zone )
			: new InMemoryWrapper()
		;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I provide a Facet of the temporary storage associated with the given key. A facet
	// provides a simplified interaction model for a calling context that wants to get
	// a slice of the temporary storage for a given UI, interact with it briefly, and
	// then clear it when its done using it.
	public forKey( key: string ) : TemporaryStorageFacet {

		return( new TemporaryStorageFacet( key, this.storage ) );

	}


	// I get the data associated with the given key.
	public get<T>( key: string ) : Promise<T | null> {

		return( this.storage.get<T>( key ) );

	}


	// I remove the data associated with the given key.
	public remove( key: string ) : void {

		this.storage.remove( key );

	}


	// I store the given value with the given key.
	public set( key: string, value: any ) : void {

		this.storage.set( key, value );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export class TemporaryStorageFacet {

	private key: string;
	private storage: StorageWrapper;

	// I initialize the temporary storage facet that is locked-in to the given key.
	constructor( key: string, storage: StorageWrapper ) {

		this.key = key;
		this.storage = storage;

	}

	// ---
	// PUBLC METHODS.
	// ---

	// I get the data associated with the locked-in key; or, null if the data has not
	// been defined (set).
	public get<T>() : Promise<T | null> {

		return( this.storage.get<T>( this.key ) );

	}


	// I remove the data associated with the locked-in key.
	public remove() : void {

		this.storage.remove( this.key );

	}


	// I store the given value with the locked-in key.
	public set( value: any ) : void {

		this.storage.set( this.key, value );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

class SessionStorageWrapper implements StorageWrapper {

	private debounceDuration: number;
	private cache: StorageCache;
	private storageKey: string;
	private timerID: number;
	private zone: NgZone;

	// I initialize an SessionStorage API implementation of the storage wrapper.
	constructor( zone: NgZone ) {

		this.zone = zone;
		this.cache = Object.create( null );
		this.storageKey = "temp_session_storage";

		// The Debounce duration is the trade-off between processing and consistency.
		// Since the SessionStorage API is synchronous, we don't necessarily want to
		// write to it whenever the cache is updated. Instead, we'll use a timerID to reach
		// a moment of inactivity; and then, serialize and persist the data.
		this.debounceDuration = 1000; // 1-second.
		this.timerID = 0;

		// NOTE: Since the SessionStorage API is browser-TAB-specific, we can read the
		// persisted data into memory on load; and, then use the in-memory cache as a
		// buffer in order to cut-down on synchronous processing.
		this.loadFromCache();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the value associated with the given key; or null if the key is undefined.
	public async get<T>( key: string ) : Promise<T | null> {

		return( <T>this.cache[ key ] ?? null );

	}


	// I remove any value associated with the given key.
	public remove( key: string ) : void {

		if ( key in this.cache ) {

			delete( this.cache[ key ] );
			this.persistToCache();

		}

	}


	// I store the given value with the given key.
	public set( key: string, value: any ) : void {

		this.cache[ key ] = value;
		this.persistToCache();

	}

	// ---
	// PRIVATE METHOD.
	// ---

	// I debounce invocations of the given callback outside of the Angular zone.
	private debounceOutsideNgZone( callback: Function ) : void {

		this.zone.runOutsideAngular(
			() => {

				clearTimeout( this.timerID );

				this.timerID = setTimeout(
					( )=> {

						this.timerID = 0;
						callback();

					},
					this.debounceDuration
				);

			}
		);

	}


	// I load the SessionStorage payload into the internal cache so that we don't need
	// to read from the SessionStorage whenever the .get() method is called.
	private loadFromCache() : void {

		try {

			var serializedCache = sessionStorage.getItem( this.storageKey );

			if ( serializedCache ) {

				Object.assign( this.cache, <StorageCache>JSON.parse( serializedCache ) );

			}

		} catch ( error ) {

			console.warn( "SessionStorageWrapper was unable to read from SessionStorage API." );
			console.error( error );

		}

	}


	// I serialize and persist the cache to the SessionStorage, using debouncing.
	private persistToCache() : void {

		// Since we don't want a change-detection digest to run as part of our internal
		// timer (we have no view-models that will change in response to this action),
		// let's wire-it-up outside of the core Angular Zone.
		this.debounceOutsideNgZone(
			() => {

				console.warn( "Flushing to SessionStorage API." );
				// Even if SessionStorage exists (which is why this Class was
				// instantiated), interacting with it may still lead to runtime errors.
				// --
				// From MDN: If localStorage does exist, there is still no guarantee that
				// localStorage is actually available, as various browsers offer settings
				// that disable localStorage. So a browser may support localStorage, but
				// not make it available to the scripts on the page. For example, Safari
				// browser in Private Browsing mode gives us an empty localStorage object
				// with a quota of zero, effectively making it unusable. Conversely, we
				// might get a legitimate QuotaExceededError, which means that we've used
				// up all available storage space, but storage is actually available.
				try {

					sessionStorage.setItem( this.storageKey, JSON.stringify( this.cache ) );

				} catch ( error ) {
					
					console.warn( "SessionStorageWrapper was unable to write to SessionStorage API." );
					console.error( error );

				}

			}
		);

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

class InMemoryWrapper implements StorageWrapper {

	private cache: StorageCache;

	// I initialize an in-memory implementation of the storage wrapper.
	constructor() {

		this.cache = Object.create( null );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the value associated with the given key; or null if the key is undefined.
	public async get<T>( key: string ) : Promise<T | null> {

		return( <T>this.cache[ key ] ?? null );

	}


	// I remove any value associated with the given key.
	public remove( key: string ) : void {

		delete( this.cache[ key ] );

	}


	// I store the given value with the given key.
	public set( key: string, value: any ) : void {

		this.cache[ key ] = value;

	}

}

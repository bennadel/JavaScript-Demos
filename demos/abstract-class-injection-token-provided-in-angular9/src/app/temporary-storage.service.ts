
// Import the core angular services.
import { forwardRef } from "@angular/core";
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// By using an ABSTRACT CLASS as the dependency-injection (DI) token, it allows us to
// use the class as both the token and as an INTERFACE that the concrete classes have to
// implement. And, by including the "useClass" property in our decorator, it allows us
// to define the DEFAULT IMPLEMENTATION to be used with this injection token.
@Injectable({
	providedIn: "root",
	useClass: forwardRef( () => SessionStorageService ) // Default implementation.
})
export abstract class TemporaryStorageService {
	public abstract get<T>( key: string ) : Promise<T | null>;
	public abstract remove( key: string ) : void;
	public abstract set( key: string, value: any ) : void;
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface StorageCache {
	[ key: string ]: any;
}

@Injectable({
	providedIn: "root"
})
export class SessionStorageService implements TemporaryStorageService {

	private cache: StorageCache;
	private storageKey: string;

	// I initialize the session-storage service.
	constructor() {

		this.cache = Object.create( null );
		this.storageKey = "temporary_storage";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the value stored at the given key; or null if undefined.
	public async get<T>( key: string ) : Promise<T | null> {

		return( <T>this.cache[ key ] ?? null );

	}


	// I remove the value stored at the given key.
	public remove( key: string ) : void {

		if ( key in this.cache ) {

			delete( this.cache[ key ] );
			this.persistCache();

		}

	}


	// I store the given value with the given key.
	public set( key: string, value: any ) : void {

		this.cache[ key ] = value;
		this.persistCache();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I load the in-memory cache from the SessionStorage API.
	private loadCache() : void {

		var serializedData = window.sessionStorage.getItem( this.storageKey );

		if ( serializedData ) {

			Object.assign( this.cache, JSON.parse( serializedData ) );

		}

	}


	// I persist the in-memory cache to the SessionStorage API.
	private persistCache() : void {

		// TODO: Wrap this in a debounced-timer so that we're not constantly flushing the
		// in-memory cache to the SYNCHRONOUS SessionStorage API. But, this is beyond the
		// scope and goal of this demo.
		window.sessionStorage.setItem( this.storageKey, JSON.stringify( this.cache ) );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class LocalStorageService implements TemporaryStorageService {

	private cache: StorageCache;
	private storageKey: string;

	// I initialize the local-storage service.
	constructor() {

		this.cache = Object.create( null );
		this.storageKey = "temporary_storage";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the value stored at the given key; or null if undefined.
	public async get<T>( key: string ) : Promise<T | null> {

		return( <T>this.cache[ key ] ?? null );

	}


	// I remove the value stored at the given key.
	public remove( key: string ) : void {

		if ( key in this.cache ) {

			delete( this.cache[ key ] );
			this.persistCache();

		}

	}


	// I store the given value with the given key.
	public set( key: string, value: any ) : void {

		this.cache[ key ] = value;
		this.persistCache();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I load the in-memory cache from the LocalStorage API.
	private loadCache() : void {

		var serializedData = window.localStorage.getItem( this.storageKey );

		if ( serializedData ) {

			Object.assign( this.cache, JSON.parse( serializedData ) );

		}

	}


	// I persist the in-memory cache to the LocalStorage API.
	private persistCache() : void {

		// TODO: Wrap this in a debounced-timer so that we're not constantly flushing the
		// in-memory cache to the SYNCHRONOUS LocalStorage API. But, this is beyond the
		// scope and goal of this demo.
		window.localStorage.setItem( this.storageKey, JSON.stringify( this.cache ) );

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class InMemoryStorageService implements TemporaryStorageService {

	private cache: StorageCache;

	// I initialize the in-memory storage service.
	constructor() {

		this.cache = Object.create( null );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the value stored at the given key; or null if undefined.
	public async get<T>( key: string ) : Promise<T | null> {

		return( <T>this.cache[ key ] ?? null );

	}


	// I remove the value stored at the given key.
	public remove( key: string ) : void {

		delete( this.cache[ key ] );

	}


	// I store the given value with the given key.
	public set( key: string, value: any ) : void {

		this.cache[ key ] = value;

	}

}

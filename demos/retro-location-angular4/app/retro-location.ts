
// Import the core angular services.
import { Injectable } from "@angular/core";
import { LocationStrategy } from "@angular/common";
import { PopStateEvent as RetroPopStateEvent } from "@angular/common";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Search {
	[ key: string ]: string;
}

export interface SearchInput {
	[ key: string ]: SearchInputValue;
}

type SearchInputValue = string | number | boolean | null;

interface UrlSegments {
	pathname: string;
	search: string;
	hash: string;
}

namespace SubscribeHandlers {
	export interface OnNext {
		( value: RetroPopStateEvent ) : void;
	}
	
	export interface OnThrow {
		( error: any ) : void;
	}

	export interface OnComplete {
		() : void;
	}
}

@Injectable()
export class RetroLocation {
	
	private locationStrategy: LocationStrategy;
	private popStateEvents: Subject<RetroPopStateEvent>;

	// I initialize the retro-location service. This provides an API that is 
	// reminiscent of the AngularJS 1.x $location service.
	constructor( locationStrategy: LocationStrategy ) {

		this.locationStrategy = locationStrategy;
		this.popStateEvents = new Subject();

		// When the underlying location implementation emits a PopStateEvent, we 
		// want to communicate that out to any clients that may be subscribed to the
		// RetroLocation events.
		this.locationStrategy.onPopState(
			( event: PopStateEvent | HashChangeEvent ) : void => {

				// Since RetroLocation will emit this event when the location is 
				// changed programmatically, we want to limit it to a single event-type,
				// popstate, in order to make things a bit more predictable.
				if ( event.type === "popstate" ) {

					this.popStateEvents.next({
						url: this.url(),
						pop: true,
						type: "popstate"
					});

				}

			}
		);

	}	

	// ---
	// PUBLIC METHODS.
	// ---

	// I set or get the location hash.
	public hash( newHash: string ) : RetroLocation;
	public hash() : string;
	public hash( newHash?: string ) : RetroLocation | string {

		var urlSegments = this.getUrlSegments();

		// Return the existing hash.
		if ( newHash === undefined ) {

			return( this.normalizeHash( this.decodeHash( urlSegments.hash ) ) );

		}

		// Set the new hash.
		urlSegments.hash = this.encodeHash( this.normalizeHash( newHash ) );
		this.navigate( urlSegments );

		return( this );

	}


	// I set or get the location path.
	public path( newPath: string ) : RetroLocation;
	public path() : string;
	public path( newPath?: string ) : RetroLocation | string {

		var urlSegments = this.getUrlSegments();

		// Return the existing path.
		if ( newPath === undefined ) {

			return( this.normalizePath( this.decodePath( urlSegments.pathname ) ) );

		}

		// Set the new path.
		urlSegments.pathname = this.encodePath( this.normalizePath( newPath ) );
		this.navigate( urlSegments );

		return( this );

	}


	// I set or get the location search (query-string). When setting the search value,
	// if the value of any key-value pair is null, the key will be omitted from the 
	// resultant search. If the value of the key-value pair is true, the key will be 
	// included without any value.
	public search( key: SearchInput ) : RetroLocation;
	public search( key: string, value: SearchInputValue ) : RetroLocation;
	public search() : Search;
	public search( key?: SearchInput | string, value?: SearchInputValue ) : RetroLocation | string | Search {

		var urlSegments = this.getUrlSegments();
		
		// Return the existing search collection.
		if ( key === undefined ) {

			return( this.parseQueryString( urlSegments.search ) );

		}

		// Set the entire search collection.
		if ( typeof( key ) === "object" ) {

			urlSegments.search = this.compileSearchInput( key );
			this.navigate( urlSegments );

		// Set just one of the search key-value pairs.
		} else {

			// Since we're merging the existing Search value with the incoming 
			// SearchInput field value, we need to down-cast the Search to a SearchInput 
			// structure so that we can insert non-string values into it.
			var searchInput: SearchInput = this.parseQueryString( urlSegments.search );
			searchInput[ key ] = value;

			urlSegments.search = this.compileSearchInput( searchInput );
			this.navigate( urlSegments );

		}
		
		return( this );

	}


	// I subscribe to the PopStateEvents for the RetroLocation.
	// --
	// CAUTION: These events will be emitted when the location is changed either manually
	// by the user or programmatically by the RetroLocation service.
	public subscribe(
		onNext: SubscribeHandlers.OnNext, 
		onThrow?: SubscribeHandlers.OnThrow | null,
		onComplete?: SubscribeHandlers.OnComplete | null
		) : Subscription {
		
		var subscription = this.popStateEvents.subscribe({
			next: onNext,
			error: onThrow,
			complete: onComplete
		});

		return( subscription );

	}


	// I set or get the entire location URL.
	public url( newUrl: string ) : RetroLocation;
	public url() : string;
	public url( newUrl?: string ) : RetroLocation | string {

		// Return the existing url.
		if ( newUrl === undefined ) {

			return( this.locationStrategy.path( true ) ); // true = Include Hash.

		}

		// Set the new url.
		this.navigate( this.parseUrl( newUrl ) );

		return( this );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I compile the search input into a query-string. This will treat NULL and TRUE
	// values specially.
	private compileSearchInput( queryParams: SearchInput ) : string {

		var pairs: string[] = [];

		for ( var key of Object.keys( queryParams ) ) {

			var value = queryParams[ key ];

			// Skip any null values (omit the key from the results).
			if ( value === null ) {

				continue;

			// Include just the key portion of the key-value pair.
			} else if ( value === true ) {

				pairs.push( this.encodeURIQuery( key ) );

			// Include the full key-value pair.
			} else {

				pairs.push(
					this.encodeURIQuery( key ) +
					"=" +
					this.encodeURIQuery( value.toString() )
				);
				
			}

		}

		return( pairs.join( "&" ) );

	}


	// I URL-decode the hash value.
	private decodeHash( hash: string ) : string {

		// CAUTION: I am not sure if there are any rules around what should or should
		// not be encoded in the hash.
		return( decodeURIComponent( hash ) );

	}


	// I URL-decode the path value.
	private decodePath( path: string ) : string {

		var parts = path.split( "/" );
		var partsLength = parts.length;

		for ( var i = 0 ; i < partsLength ; i++ ) {

			parts[ i ] = this.decodeURISegment( parts[ i ] );

		}

		return( parts.join( "/" ) );

	}


	// I URL-decode a sub-path segment of a path value.
	private decodeURISegment( encodedValue: string ) : string {

		return( decodeURIComponent( encodedValue ) );

	}


	// I URL-decode the sub-search segment of a search value.
	private decodeURIQuery( encodedValue: string ) : string {

		return( decodeURIComponent( encodedValue ) );

	}


	// I URL-encode the hash value.
	private encodeHash( hash: string ) : string {

		// CAUTION: I am not sure if there are any rules around what should or should
		// not be encoded in the hash.
		return( encodeURIComponent( hash ) );

	}


	// I URL-encode the path value.
	private encodePath( path: string ) : string {

		var parts = path.split( "/" );
		var partsLength = parts.length;

		for ( var i = 0 ; i < partsLength ; i++ ) {

			parts[ i ] = this.encodeURISegment( parts[ i ] );

		}

		return( parts.join( "/" ) );

	}


	// I URL-encode a sub-segment (key or value) of the search value.
	private encodeURIQuery( value: string ) : string {

		// On it's own, the encodeURIComponent() method is too aggressive. As such, we
		// have to dial it back a bit after the value has been processed.
		// --
		// Read more: https://github.com/angular/angular.js/blob/3651e42e49ded7d410fd1cbd46f717056000afd4/src/Angular.js#L1472
		var encodedValue = encodeURIComponent( value )
			.replace( /%40/gi, "@" )
			.replace( /%3A/gi, ":" )
			.replace( /%24/g, "$" )
			.replace( /%2C/gi, "," )
			.replace( /%3B/gi, ";" )
		;

		return( encodedValue );

	}


	// I URL-encode a sub-segment of the path value.
	private encodeURISegment( value: string ) : string {
			
		// On it's own, the encodeURIComponent() method is too aggressive. As such, we
		// have to dial it back a bit after the value has been processed.
		// --
		// Read more: https://github.com/angular/angular.js/blob/3651e42e49ded7d410fd1cbd46f717056000afd4/src/Angular.js#L1453
		var encodedValue = this.encodeURIQuery( value )
			.replace( /%26/gi, "&" )
			.replace( /%3D/gi, "=" )
			.replace( /%2B/gi, "+" )
		;

		return( encodedValue );

	}


	// I break the current URL value into normalized pathname, search, and hash segments.
	private getUrlSegments() : UrlSegments {

		return( this.parseUrl( this.url() ) );

	}


	// I navigate to the location defined by the given URL segments (pathname, search, 
	// and hash).
	private navigate( urlSegments: UrlSegments ) : void {

		var url = urlSegments.pathname;

		if ( urlSegments.search ) {

			url += ( "?" + urlSegments.search );

		}

		if ( urlSegments.hash ) {

			url += ( "#" + urlSegments.hash );

		}

		// Only push the state if the URL has actually changed. We only need this 
		// because the RetroLocation emits an event and we want this event to be a bit 
		// more closely tied to an actual change in the location.
		if ( url !== this.url() ) {

			this.locationStrategy.pushState(
				// pushState - all the other strategies appear to pass NULL here.
				null,
				// title - all the other strategies appear to pass empty-string here.
				"",
				// path - we are encoding the entire location into the path.
				url,
				// queryParams - we are baking these into the path (above).
				""
			);

			this.popStateEvents.next({
				url: url,
				pop: true,
				type: "popstate"
			});
			
		}

	}


	// I normalize the hash so that it is NOT starting with a hash.
	private normalizeHash( value: string ) : string {

		return( value.replace( /^#/, "" ) );

	}


	// I normalize the path so that it IS starting with a slash but NOT ending with one.
	private normalizePath( value: string ) : string {

		value = value
			.replace( /^[\\\/]+/, "" )
			.replace( /[\\\/]+$/, "" )
		;

		return( "/" + value );

	}


	// I normalize the query-string so that it is NOT starting with a question-mark.
	private normalizeQueryString( value: string ) : string {

		return( value.replace( /^\?/, "" ) );

	}


	// I parse the given query-string into a set of key-value pairs.
	private parseQueryString( queryString: string ) : Search {

		var queryParams = {};

		// If there is no query-string value, skip the parsing.
		if ( queryString ) {

			for ( var pair of queryString.split( "&" ) ) {

				var tokens = pair.split( "=" );
				var key = this.decodeURIQuery( tokens.shift() );
				var value = this.decodeURIQuery( tokens.join( "=" ) );

				queryParams[ key ] = value;
			
			}

		}

		return( queryParams );

	}


	// I parse the given URL into a set of normalized segments.
	private parseUrl( url: string ) : UrlSegments {

		var segments = url.match( /^([^?#]*)(\?[^#]*)?(#.*)?/ );

		return({
			pathname: this.normalizePath( segments[ 1 ] || "" ),
			search: this.normalizeQueryString( segments[ 2 ] || "" ),
			hash: this.normalizeHash( segments[ 3 ] || "" )
		});

	}

}

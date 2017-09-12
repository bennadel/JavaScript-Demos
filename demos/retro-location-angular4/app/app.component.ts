
// Import the core angular services.
import { Component } from "@angular/core";
import { PopStateEvent } from "@angular/common";

// Import the application components and services.
import { RetroLocation } from "./retro-location";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface SearchInput {
	[ key: string ]: string | number | null | boolean;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<h2>
			Change Path Components Independently
		</h2>

		<h3>
			Pathname
		</h3>

		<ul>
			<li>
				<a (click)="setPath( '/home.htm' )">/home.htm</a>
			</li>
			<li>
				<a (click)="setPath( 'about-us.htm' )">about-us.htm</a>
			</li>
		</ul>

		<h3>
			Search
		</h3>

		<ul>
			<li>
				<a (click)="setSearch({ id: 1 })">id: 1</a>
			</li>
			<li>
				<a (click)="setSearch({ source: 'demo', utm: 'k7z', isValid: true, deleteMe: 'yes' })">
					source: 'demo', utm: 'k7z', isValid: true, deleteMe: 'yes'
				</a>
			</li>
		</ul>

		<h3>
			Hash
		</h3>

		<ul>
			<li>
				<a (click)="setHash( '#company' )">#company</a>
			</li>
			<li>
				<a (click)="setHash( 'team' )">team</a>
			</li>
		</ul>
	`
})
export class AppComponent {

	public retroLocation: RetroLocation;

	// I initialize the app component.
	constructor( retroLocation: RetroLocation ) {

		this.retroLocation = retroLocation;

		// Subscribe to the PopStateEvents triggered by the RetroLocation. Unlike other
		// location implementations, which only trigger events when the URL is changed
		// outside of the service, the RetroLocation will trigger a PopStateEvent when
		// the location is changed programmatically. This way, other components can 
		// listen for this event even if the location was changed by another part of 
		// the application.
		// --
		// NOTE: Only emits "popstate" events, not "hashchange".
		this.retroLocation.subscribe(
			( event: PopStateEvent ) : void => {

				this.logPopStateEvent( event );

			}
		);

		this.retroLocation.url( "/initial.htm#first-time" );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I set the location hash independently of the rest of the location.
	public setHash( newHash: string ) : void {

		console.warn( "Setting hash:", newHash );
		this.retroLocation.hash( newHash );

	}


	// I set the location pathname independently of the rest of the location.
	public setPath( newPath: string ) : void {

		console.warn( "Setting path:", newPath );
		this.retroLocation.path( newPath );

	}


	// I set the location query-string independently of the rest of the location.
	public setSearch( newSearch: SearchInput ) : void {

		console.warn( "Setting search:", newSearch );
		this.retroLocation.search( newSearch );

		// If the given search collection contains a "deleteMe" key-value pair, then 
		// let's perform a subsequent navigation to set that value to null. This is to
		// demonstrate that you can set individual values; and, that setting a value to
		// null will remove it from the location.
		if ( newSearch.deleteMe ) {

			console.warn( "Setting the 'deleteMe' query-string param to NULL." );
			this.retroLocation.search( "deleteMe", null );

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I log the RetroLocation "popstate" event. This is triggered whenever the browser
	// location is changed programmatically by the application (using RetroLocation) or
	// manually by the user (or an HREF link). 
	private logPopStateEvent( event: PopStateEvent ) : void {

		console.group( "Pop State Event" );
		console.log( "Event:", event.url );
		// Read the location components independently from the RetroLocation.
		console.log( "Url:", this.retroLocation.url() );
		console.log( "Path:", this.retroLocation.path() );
		console.log( "Search:", this.retroLocation.search() );
		console.log( "Hash:", this.retroLocation.hash() );
		console.groupEnd();

	}

}

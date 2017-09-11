
// Import the core angular services.
import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { PopStateEvent } from "@angular/common";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<h2>
			HREF-Based URL Changes
		</h2>

		<ul>
			<li>
				<a href="#/route-one?hello=world#hashification">
					#/route-one?hello=world#hashification
				</a>
			</li>
			<li>
				<a href="#/route-two?cool=beans#hashitation">
					#/route-two?cool=beans#hashitation
				</a>
			</li>
		</ul>

		<h2>
			Location-Based URL Changes
		</h2>

		<ul>
			<li>
				<a (click)="navigate( '/route-three?meep=moop#hashmatash' )">
					Route three
				</a>
			</li>
			<li>
				<a (click)="navigate( '/route-four?king=kong#hashmania' )">
					Route four
				</a>
			</li>
		</ul>
	`
})
export class AppComponent {

	public location: Location;

	// I initialize the app component.
	constructor( location: Location ) {

		this.location = location;
		// While the PopStateEvent won't trigger when we call location.go(), it will 
		// trigger when we use the HREF-based navigation. Let's listen for those location
		// changes that occur due to external changes in the browser URL.
		this.location.subscribe(
			( event: PopStateEvent ) : void => {

				if ( event.type === "hashchange" ) {

					console.group( "PopState" );
					console.log( event.url );
					console.groupEnd();
					
				}

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I navigate to the given URL. This URL is expected to be a "complete" URL; meaning,
	// it contains all the necessary components: pathname, query-string, and hash.
	public navigate( newPath: string ) : void {

		// In the documentation, the .go() method accepts two arguments: "path" and 
		// "query". This leaves you wondering about the "hash" - where does that go? 
		// Well, it turns out that the path and query don't really need to be broken out
		// into separate components. Under the hood, they are just concatenated. As such,
		// we can include them in the "path" argument, along with any desired HASH value.
		this.location.go( newPath );

		// Since the PopStateEvent doesn't fire when we programmatically navigate, let's
		// turn around and query the location.
		console.group( "Internal Navigation" );
		console.log( this.location.path() );
		console.groupEnd();

	}

}

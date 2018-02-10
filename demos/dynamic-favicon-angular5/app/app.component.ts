
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Favicons } from "./favicons";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Select the favicon to use:
		</p>

		<ul>
			<li>
				<a (click)="useFavicon( 'happy' )">Happy</a>
			</li>
			<li>
				<a (click)="useFavicon( 'indifferent' )">Indifferent</a>
			</li>
			<li>
				<a (click)="useFavicon( 'sad' )">Sad</a>
			</li>
		</ul>

		<p>
			<a (click)="resetFavicon()">Reset the Favicon</a>
		</p>
	`
})
export class AppComponent {

	private favicons: Favicons;
	
	// I initialize the app component.
	constructor( favicons: Favicons ) {

		this.favicons = favicons;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound.
	public ngOnInit() : void {

		this.resetFavicon();

	}


	// I reset the favicon to use the "default" item.
	public resetFavicon() : void {

		console.log( "Resetting favicon" );
		this.favicons.reset();

	}


	// I activate the favicon with the given name.
	public useFavicon( name: string ) : void {

		console.log( "Activating favicon:", name );
		// Notice that we don't need to know anything about how the favicon is defined;
		// not URLs, no image types - just the identifier. All of the implementation
		// details have been defined at bootstrap time.
		this.favicons.activate( name );

	}

}

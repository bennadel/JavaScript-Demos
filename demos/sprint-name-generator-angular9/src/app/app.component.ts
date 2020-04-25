
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { descriptions } from "./dictionaries/descriptions";
import { things } from "./dictionaries/things";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public descriptionIndex: number;
	public descriptions: string[];
	public sprintName: string;
	public thingIndex: number;
	public things: string[];

	// I initialize the app component.
	constructor() {

		this.descriptionIndex = 0;
		this.descriptions = descriptions;
		this.sprintName = "";
		this.thingIndex = 0;
		this.things = things;

		this.generateName();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I generate the next Sprint Name by randomly selecting a Description and a Thing
	// and then joining the two values.
	public generateName() : void {

		// Randomly select next parts of the name.
		this.descriptionIndex = this.nextIndex( this.descriptionIndex, this.descriptions );
		this.thingIndex = this.nextIndex( this.thingIndex, this.things );

		this.sprintName = (
			this.descriptions[ this.descriptionIndex ] +
			" " +
			this.things[ this.thingIndex ]
		);

		this.shareSprintNameWithUser( this.sprintName );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I try to copy the value to the user's clipboard. Returns Boolean indicating
	// whether or not the operation appeared to be successful.
	private copyToClipboard( value: string ) : boolean {

		// In order to execute the "Copy" command, we actually have to have a "selection"
		// in the rendered document. As such, we're going to inject a Textarea element,
		// populate it with the given value, select it, and then copy it. Since this
		// operation is going to change the document selection, let's get a reference to
		// the currently-active element (expected to be our "Generate" button) such that
		// we can return focus after the copy command has executed.
		var activeElement = <HTMLElement | null>document.activeElement;

		var textarea: HTMLTextAreaElement = document.createElement( "textarea" );
		textarea.style.opacity = "0";
		textarea.style.position = "fixed";
		textarea.value = value;
		// Set and select the value (creating an active Selection range).
		document.body.appendChild( textarea );
		textarea.select();

		try {

			// CAUTION: Even though this may not throw an error, the COPY command does
			// not appear to work unless it is in response to a direct user interaction.
			// Meaning, nothing gets copied until the user actually CLICKS the button to
			// generate a new name. Not sure why that is? Maybe a security issue?
			document.execCommand( "copy" );
			return( true );

		} catch ( error ) {

			return( false );

		} finally {

			// Return focus to the active element, if we had one.
			if ( activeElement ) {

				activeElement.focus();

			}

			document.body.removeChild( textarea );

		}

	}


	// I return a random index for selection within the given collection.
	private nextIndex( currentIndex: number, collection: any[] ) : number {

		var nextIndex = currentIndex;
		var length = collection.length;

		// Keep generating a random index until we get a non-matching value. This just
		// ensures some "change" from generation to generation.
		while ( nextIndex === currentIndex ) {

			nextIndex = ( Math.floor( Math.random() * length ) );

		}

		return( nextIndex );

	}


	// I share the given Sprint Name with the user.
	private shareSprintNameWithUser( sprintName: string ) : void {

		// As a convenience, try to copy the new name to the user's clipboard.
		var nameWasCopied = this.copyToClipboard( sprintName );

		// Also, let's log the name to the user's console.
		console.group(
			"%c Sprint Name Generator ",
			"background-color: #121212 ; color: #ffffff ;"
		);
		console.log(
			`%c${ sprintName }`,
			"color: #ff3366 ;"
		);
		if ( nameWasCopied ) {
		
			console.log(
				"%cThis name was copied to your clipboard.",
				"font-style: italic ;"
			);
		
		}
		console.groupEnd();

	}

}

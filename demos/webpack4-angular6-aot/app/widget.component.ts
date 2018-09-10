
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-widget",
	host: {
		"(click)": "handleClick( $event )",
	},
	styleUrls: [ "./widget.component.less" ],
	templateUrl: "./widget.component.htm"
})
export class WidgetComponent {

	// I initialize the widget component.
	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the click event.
	public handleClick( event: MouseEvent ) : void {

		console.warn( "About to throw error to test source-maps." );
		throw( new Error( "TestingSourceMaps" ) );

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Thing {
	type: "a" | "b";
	value: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	public things: Thing[];	

	// I initialize the app component.
	constructor() {

		// When dealing with a mixed-list of data, we need to have some sort of
		// differentiator ("type" in this case) so that we can figure out which item
		// maps to which class of component in the View.
		this.things = [
			{ type: "a", value: "A1" },
			{ type: "a", value: "A2" },
			{ type: "b", value: "B1" },
			{ type: "a", value: "A3" },
			{ type: "b", value: "B2" }
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I log the clicked thing.
	public handlClick( thing: Thing ) : void {

		console.group( "You clicked a thing!" );
		console.log( thing );
		console.groupEnd();

	}

}

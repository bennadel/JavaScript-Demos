
// Import the core angular services.
// --
// NOTE: When I'm including the LODASH library, I'm using the "import =" syntax since 
// the lodash library has a single top-level export. 
import _ = require( "lodash" );
import { Component } from "@angular/core";

interface Friend {
	id: number;
	name: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<p>
			<strong>Friends:</strong> {{ names | json }}
		</p>
	`
})
export class AppComponent {

	public friends: Friend[];
	public names: string[];


	// I initialize the app component.
	constructor() {

		this.friends = [
			{ id: 1, name: "Kim" },
			{ id: 2, name: "Sarah" },
			{ id: 3, name: "Joanna" },
			{ id: 4, name: "Libby" }
		];
		this.names = this.pluckNames( this.friends );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I return the names property as an array, plucked from the given collection.
	private pluckNames( collection: Friend[] ) : string[] {

		// NOTE: I need to explicitly cast the return value here because lodash
		// overloads the .map() method instead of having an explicit "pluck" method.
		// As such, the definition file gets confused on the return type.
		return( <string[]>_.map( collection, "name" ) );

	}

}

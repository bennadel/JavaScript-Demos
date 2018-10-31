
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { SimpleStore } from "./simple.store";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface NameStore {
	girl: string;
	boy: string;
};

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<em>See console output</em>.
	`
})
export class AppComponent {

	// I initialize the app component.
	constructor() {

		// Create a simple store for baby name selection.
		var babyNames = new SimpleStore<NameStore>({
			girl: "Jill",
			boy: "John"
		});

		// --

		// Subscribe to any changes in the state (a new state object is created every
		// time setState() is called).
		babyNames.getState().subscribe(
			( state ) => {
				console.log( "New state..." );
			}
		);

		// Subscribe to the individual name selections. Since these are unique changes,
		// these callbacks will be called far less often than the getState() stream.
		babyNames.select( "girl" ).subscribe(
			( name ) => {
				console.log( "Girl's Name:", name );
			}
		);
		babyNames.select( "boy" ).subscribe(
			( name ) => {
				console.log( "Boy's Name:", name );
			}
		);

		// --

		// Try changing up some state! 
		babyNames.setState({
			girl: "Kim"
		});
		babyNames.setState({
			girl: "Kim" // Duplicate.
		});
		babyNames.setState({
			girl: "Kim", // Duplicate.
			boy: "Tim"
		});
		babyNames.setState({
			girl: "Kim" // Duplicate.
		});
		babyNames.setState({
			girl: "Joanna"
		});
		babyNames.setState({
			girl: "Joanna" // Duplicate.
		});
		babyNames.setState({
			girl: "Joanna" // Duplicate.
		});

	}

}

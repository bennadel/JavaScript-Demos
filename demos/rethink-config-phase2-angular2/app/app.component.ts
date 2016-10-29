
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Greeter } from "./greeter/greeter.module";


@Component({
	selector: "my-app",
	template:
	`
		<em>Look in the console to see the Greeter result.</em>
	`
})
export class AppComponent {

	// I initialize the component.
	constructor( greeter: Greeter ) {

		console.group( "Testing Greeter" );
		console.log( greeter.greet( "Tricia" ) );
		console.groupEnd();

	}

}

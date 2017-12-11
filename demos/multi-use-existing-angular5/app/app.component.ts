
// Import the core angular services.
import { Component } from "@angular/core";
import { Inject } from "@angular/core";

// Import the application components and services.
import { Greeter } from "./greeters";
import { GREETERS } from "./greeters";
import { MeanGreeter } from "./greeters";
import { NiceGreeter } from "./greeters";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<em>Look at console-logging - thats where the hot DI action is.</em>
	`
})
export class AppComponent {

	// I initialize the app component. Notice that we are injecting BOTH the collection
	// of Greeters as well as the individual instances. We can then confirm that the 
	// collection of Greeters is a mere aggregation of the individual references.
	constructor(
		@Inject( GREETERS ) greeters: Greeter[],
		meanGreeter: MeanGreeter,
		niceGreeter: NiceGreeter
		) {

		console.group( "@Inject( GREETERS )" );
		console.log( "Count:", greeters.length );
		console.log( greeters[ 0 ] );
		console.log( greeters[ 1 ] );
		console.groupEnd();

		console.group( "MeanGreeter" );
		console.log( meanGreeter );
		console.log( "=== greeters[ 0 ]:", ( meanGreeter === greeters[ 0 ] ) );
		console.log( "=== greeters[ 1 ]:", ( meanGreeter === greeters[ 1 ] ) );
		console.groupEnd();

		console.group( "NiceGreeter" );
		console.log( niceGreeter );
		console.log( "=== greeters[ 0 ]:", ( niceGreeter === greeters[ 0 ] ) );
		console.log( "=== greeters[ 1 ]:", ( niceGreeter === greeters[ 1 ] ) );
		console.groupEnd();

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ThingAService } from "./thing-a.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sub-a",
	template:
	`
		Sub-A Component is here!
	`
})
export class SubAComponent {
	
	constructor( thingAService: ThingAService ) {

		console.log( "Thing A Service:", thingAService );

	}

}

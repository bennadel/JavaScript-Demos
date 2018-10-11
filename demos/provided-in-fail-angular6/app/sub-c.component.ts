
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ThingCService } from "./thing-c.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sub-b",
	template:
	`
		Sub-C Component is here!
	`
})
export class SubCComponent {

	constructor( thingCService: ThingCService ) {

		console.log( "Thing C Service:", thingCService );

	}

}

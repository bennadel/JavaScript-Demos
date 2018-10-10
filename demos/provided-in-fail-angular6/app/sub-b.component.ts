
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ThingBService } from "./thing-b.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sub-b",
	template:
	`
		Sub-B Component is here!
	`
})
export class SubBComponent {

	constructor( thingBService: ThingBService ) {

		console.log( "Thing B Service:", thingBService );

	}

}

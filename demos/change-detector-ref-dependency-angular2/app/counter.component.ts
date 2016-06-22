
// Import the core angular services.
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";

@Component({
	selector: "my-counter",
	inputs: [ "count" ],

	// Here, we are providing a test value to demonstrate that non-ChangeDetectorRef
	// dependencies can be provided by the component and required by a sibling directive.
	providers: [
		{
			provide: "ProviderTest",
			useValue: "Provided by Counter Component."
		}
	],
	template:
	`
		Count: {{ count }}
	`
})
export class MyCounterComponent {

	// I hold the current count. This is an injected property.
	public count: number;


	// I initialize the component.
	constructor( changeDetectorRef: ChangeDetectorRef ) {
		
		console.group( "MyCounter Component" );
		console.log( changeDetectorRef );
		console.groupEnd();

	}

}
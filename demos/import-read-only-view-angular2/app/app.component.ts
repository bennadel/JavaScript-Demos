
// Import the core angular services.
import { Component } from "@angular/core";

// Import the values from our counter service. In this case, it's import to understand
// that the "import" statement is NOT A DESTRUCTURING STATEMENT (although it may look 
// like one). It is, in fact, a "live query" of the given module (kind of like a NodeList
// in the Document Object Model). As such, we are not importing "counter" BY VALUE; in a
// way, we're actually importing BY REFERNCE (for all intents and purposes).
import { counter } from "./counter-service";
import { increment } from "./counter-service";

@Component({
	selector: "my-app",
	template:
	`
		<p>
			<a (click)="updateValue()">Update value</a> &mdash; {{ value }}
		</p>
	`
})
export class AppComponent {

	public value: number;


	// I initialize the component.
	constructor() {

		// Let's copy the value of the counter into the local view-model.
		this.value = counter;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I update the value (based on an updated counter).
	public updateValue() : void {

		// This will increment the counter value in the counter module; which will, in
		// turn, update it in our "live query" of the counter module.
		increment();

		// While the "counter" value is exported "by reference" (so to speak), our "value"
		// property is still copied "by value". As such, after we increment the counter,
		// we have to store it back into the local view-model.
		this.value = counter;

	}

}

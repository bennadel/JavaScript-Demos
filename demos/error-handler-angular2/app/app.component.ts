// NOTE: I'm just declaring the non-existing function so that TypeScript doesn't 
// yell at me.
declare var promoteSynergy: any;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	template:
	`
		<p>
			<a (click)="trigger()">Trigger an Error</a>, like a boss.
		</p>
	`
})
export class AppComponent {

	// I initialize the component.
	constructor() {

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I trigger an error (to test the custom ErrorHandler).
	public trigger() : void {

		// CAUTION: This method does NOT exist.
		promoteSynergy();

	}

}
   
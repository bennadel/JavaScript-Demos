
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	template:
	`
		<p>
			Before (App)
		</p>

		<!-- WARNING: THIS DOES NOT WORK IN ROOT COMPONENT. -->
		<ng-content></ng-content>

		<p>
			After (App)
		</p>
	`
})
export class AppComponent {

	// I initialize the component.
	constructor() {

		// ...

	}

}

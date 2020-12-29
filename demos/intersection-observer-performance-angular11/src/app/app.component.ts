
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type Demo = "OnePerElement" | "OnePerList";

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public demo: Demo;

	// I initialize the app component.
	constructor() {

		this.demo = "OnePerElement";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I show the given demo experience.
	public showDemo( demo: Demo ) : void {

		this.demo = demo;

	}

}

// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var module: { id: string };

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	templateUrl: "./app.component.htm",
	styleUrls: [ "./app.component.css" ]
})
export class AppComponent {

	// I initialize the component.
	constructor() {

		// ...

	}

}
   
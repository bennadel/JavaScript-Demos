// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.

@Component({
	moduleId: __moduleName,
	selector: "bn-loading-indicator",
	inputs: [ "theme" ],
	templateUrl: "./loading-indicator.component.htm",
	styleUrls: [ "./loading-indicator.component.css" ]
})
export class LoadingIndicatorComponent {

	public height: number;
	public theme: string;


	// I initialize the component.
	public constructor() {

		this.theme = "light";

	}

}

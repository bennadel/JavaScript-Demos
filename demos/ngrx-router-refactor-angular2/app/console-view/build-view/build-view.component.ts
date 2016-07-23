// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-build-view",
	templateUrl: "./build-view.component.htm",
	styleUrls: [ "./build-view.component.css" ]
})
export class BuildViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

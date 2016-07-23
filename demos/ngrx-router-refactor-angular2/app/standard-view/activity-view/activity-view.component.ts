// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-activity-view",
	templateUrl: "./activity-view.component.htm"
})
export class ActivityViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

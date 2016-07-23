// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-learn-view",
	templateUrl: "./learn-view.component.htm"
})
export class LearnViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

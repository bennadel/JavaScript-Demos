// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-board-view",
	templateUrl: "./board-view.component.htm",
	styleUrls: [ "./board-view.component.css" ]
})
export class BoardViewComponent {

	// I initialize the component.
	constructor() {

	}

}

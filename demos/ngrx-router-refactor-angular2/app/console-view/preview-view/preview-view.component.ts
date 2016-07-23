// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-preview-view",
	templateUrl: "./preview-view.component.htm",
	styleUrls: [ "./preview-view.component.css" ]
})
export class PreviewViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

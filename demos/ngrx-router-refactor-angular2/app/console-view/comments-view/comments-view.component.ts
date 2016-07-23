// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-comments-view",
	templateUrl: "./comments-view.component.htm",
	styleUrls: [ "./comments-view.component.css" ]
})
export class CommentsViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

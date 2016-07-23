// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-item-view",
	templateUrl: "./item-view.component.htm",
	styleUrls: [ "./item-view.component.css" ]
})
export class ItemViewComponent {

	// I initialize the component.
	constructor() {

	}

}

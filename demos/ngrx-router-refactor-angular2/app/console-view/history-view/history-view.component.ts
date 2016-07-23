// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-history-view",
	templateUrl: "./history-view.component.htm",
	styleUrls: [ "./history-view.component.css" ]
})
export class HistoryViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

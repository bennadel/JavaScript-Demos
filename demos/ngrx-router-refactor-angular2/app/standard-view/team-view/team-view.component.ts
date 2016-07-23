// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-team-view",
	templateUrl: "./team-view.component.htm"
})
export class TeamViewComponent {

	// I initialize the component.
	constructor() {
		
	}

}

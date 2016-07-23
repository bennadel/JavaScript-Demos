// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: __moduleName,
	selector: "bn-projects-view",
	templateUrl: "./projects-view.component.htm",
	styleUrls: [ "./projects-view.component.css" ]
})
export class ProjectsViewComponent {
	// ...
}
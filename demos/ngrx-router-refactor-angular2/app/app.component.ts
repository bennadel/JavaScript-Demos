// Declare ambient TypeScript variables.
// --
// TODO: Find a way to put these in a Typings file.
declare var __moduleName: string;

// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { BoardService } from "~/shared/services/index";
import { ProjectService } from "~/shared/services/index";
import { RouterUtils } from "~/shared/services/index";
import { ScreenService } from "~/shared/services/index";

@Component({
	moduleId: __moduleName,
	selector: "bn-app",
	providers: [
		BoardService,
		ProjectService,
		RouterUtils,
		ScreenService
	],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	// I initialize the component.
	constructor() {

	}
	
}

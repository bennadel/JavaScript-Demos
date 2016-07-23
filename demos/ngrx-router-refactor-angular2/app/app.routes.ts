
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the top-level view routes.
import { boardViewRoutes } from "./board-view/index";
import { consoleViewRoutes } from "./console-view/index";
import { standardViewRoutes } from "./standard-view/index";

export var appRoutes: Routes = [
	...standardViewRoutes,
	...consoleViewRoutes,
	...boardViewRoutes,

	// Handle the "no route" case.
	{
		path: "/",
		index: {
			redirectTo: "/projects"
		}
	},
	// Try to handle the "catch all" case.
	{
		path: "**",
		redirectTo: "/"
	}
];

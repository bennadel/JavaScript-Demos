
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ListView } from "./list-view/list-view.module";
import { RoutableView } from "~/app/app.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...ListView.modules
	]
})
export class ProjectsViewModule {
	// ...
}

export var ProjectsView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		ProjectsViewModule
	],
	routes: [
		{
			path: "projects",
			children: [
				...ListView.routes,

				// Handle the "no route" case.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "list"
				}
			]
		}
	]
};

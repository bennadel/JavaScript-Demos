
// Import the core angular services.
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailView } from "./detail-view/detail-view.module";
import { RoutableView } from "~/app/app.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...DetailView.modules,
		// --
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				children: [
					...DetailView.routes,

					// If someone is trying to get to the root of the boards section, 
					// redirect them to the projects list with board-filtering.
					{
						path: "",
						pathMatch: "full",
						redirectTo: "/app/projects/list;filterType=board"
					}
				]
			}
		])
	]
})
export class BoardsViewModule {
	// ...
}

export var BoardsView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does not
		// need to know about it - Angular will handle the integration when it loads
		// the remote files.
	],
	routes: [
		{
			path: "boards",
			loadChildren: "./views/boards-view/boards-view.module#BoardsViewModule"
		}
	]
};

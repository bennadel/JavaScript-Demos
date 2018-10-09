
// Import the core angular services.
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailView } from "./detail-view/detail-view.module";
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
		...ListView.modules,
		...DetailView.modules,
		// --
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				children: [
					// NOTE: We have to put "list" first, otherwise, the "list" segment
					// gets picked-up by the detail's ":id" parameter.
					...ListView.routes,
					...DetailView.routes,

					{
						path: "",
						pathMatch: "full",
						redirectTo: "list"
					}
				]
			}
		])
	]
})
export class PeopleViewModule {
	// ...
}

export var PeopleView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does not
		// need to know about it - Angular will handle the integration when it loads
		// the remote files.
	],
	routes: [
		{
			path: "people",
			loadChildren: "./views/standard-view/people-view/people-view.module#PeopleViewModule"
		}
	]
};

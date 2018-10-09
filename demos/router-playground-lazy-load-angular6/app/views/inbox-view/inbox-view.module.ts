
// Import the core angular services.
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
// import { DetailViewModule } from "./detail-view/detail-view.module";
import { InboxViewComponent } from "./inbox-view.component";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";
import { ThreadsView } from "./threads-view/threads-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...ThreadsView.modules,
		// --
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				component: InboxViewComponent,
				children: [
					...ThreadsView.routes
				]
			}
		])
	],
	declarations: [
		InboxViewComponent
	]
})
export class InboxViewModule {
	// ...
}

export var InboxView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does not
		// need to know about it - Angular will handle the integration when it loads
		// the remote files.
	],
	routes: [
		{
			outlet: "inbox",
			path: "inbox",
			loadChildren: "./views/inbox-view/inbox-view.module#InboxViewModule"
		}
	]
};

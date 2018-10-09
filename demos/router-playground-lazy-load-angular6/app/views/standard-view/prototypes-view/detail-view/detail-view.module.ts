
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ActivityView } from "./activity-view/activity-view.module";
import { AssetsView } from "./assets-view/assets-view.module";
import { CommentsView } from "./comments-view/comments-view.module";
import { DetailViewComponent } from "./detail-view.component";
import { RoutableView } from "~/app/app.module";
import { ScreensView } from "./screens-view/screens-view.module";
import { SharedModule } from "~/app/shared/shared.module";
import { WorkflowView } from "./workflow-view/workflow-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...ActivityView.modules,
		...AssetsView.modules,
		...CommentsView.modules,
		...ScreensView.modules,
		...WorkflowView.modules
	],
	declarations: [
		DetailViewComponent
	]
})
export class DetailViewModule {
	// ...
}

export var DetailView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		DetailViewModule
	],
	routes: [
		{
			path: ":id",
			component: DetailViewComponent,
			children: [
				...ActivityView.routes,
				...AssetsView.routes,
				...CommentsView.routes,
				...ScreensView.routes,
				...WorkflowView.routes,

				// Handle no route situation.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "screens"
				}
			]
		}
	]
};

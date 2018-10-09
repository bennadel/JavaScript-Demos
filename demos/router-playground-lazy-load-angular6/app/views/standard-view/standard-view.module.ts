
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ActivityView } from "./activity-view/activity-view.module";
import { LearnView } from "./learn-view/learn-view.module";
import { PeopleView } from "./people-view/people-view.module";
import { ProjectsView } from "./projects-view/projects-view.module";
import { PrototypesView } from "./prototypes-view/prototypes-view.module";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";
import { StandardViewComponent } from "./standard-view.component";

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
		...LearnView.modules,
		...PeopleView.modules,
		...ProjectsView.modules,
		...PrototypesView.modules
	],
	declarations: [
		StandardViewComponent
	]
})
export class StandardViewModule {
	// ...
}

export var StandardView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		StandardViewModule
	],
	routes: [
		{
			path: "",
			component: StandardViewComponent,
			children: [
				...ActivityView.routes,
				...LearnView.routes,
				...PeopleView.routes,
				...ProjectsView.routes,
				...PrototypesView.routes,

				// Handle the "no route" case.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "projects"
				}
			]
		}
	]
};

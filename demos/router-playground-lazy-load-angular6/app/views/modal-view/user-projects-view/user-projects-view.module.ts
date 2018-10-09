
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardsViewComponent } from "./boards-view/boards-view.component";
import { PrototypesViewComponent } from "./prototypes-view/prototypes-view.component";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";
import { UserProjectsViewComponent } from "./user-projects-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BoardsViewComponent,
		PrototypesViewComponent,
		UserProjectsViewComponent
	]
})
export class UserProjectsViewModule {
	// ...
}

export var UserProjectsView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		UserProjectsViewModule
	],
	routes: [
		{
			path: "user-projects/:id",
			component: UserProjectsViewComponent,
			children: [
				{
					path: "boards",
					component: BoardsViewComponent
				},
				{
					path: "prototypes",
					component: PrototypesViewComponent
				},

				// Handle the no-route route.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "prototypes"
				}
			]
		}
	]
};

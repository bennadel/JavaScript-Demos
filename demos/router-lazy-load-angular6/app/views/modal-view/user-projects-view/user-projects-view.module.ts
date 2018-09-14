
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardsViewComponent } from "./boards-view/boards-view.component";
import { PartialService } from "./services/partial.service";
import { PrototypesViewComponent } from "./prototypes-view/prototypes-view.component";
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
	],
	providers: [
		PartialService
	]
})
export class UserProjectsViewModule {

	static routes: Routes = [
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
	];

}

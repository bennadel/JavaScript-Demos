
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailViewModule } from "./detail-view/detail-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		DetailViewModule
	]
})
export class BoardsViewModule {

	static routes: Routes = [
		{
			path: "boards",
			children: [
				...DetailViewModule.routes,

				// If someone is trying to get to the root of the boards section, 
				// redirect them to the projects list with board-filtering.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "/app/projects/list;filterType=board"
				}
			]
		}
	];

}

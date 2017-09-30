
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ListViewModule } from "./list-view/list-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		ListViewModule
	]
})
export class ProjectsViewModule {
	
	static routes: Routes = [
		{
			path: "projects",
			children: [
				...ListViewModule.routes,

				// Handle the "no route" case.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "list"
				}
			]
		}
	];

}

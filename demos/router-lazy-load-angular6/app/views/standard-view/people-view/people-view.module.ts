
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailViewModule } from "./detail-view/detail-view.module";
import { ListViewModule } from "./list-view/list-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		DetailViewModule,
		ListViewModule
	]
})
export class PeopleViewModule {
	
	static routes: Routes = [
		{
			path: "people",
			children: [
				// NOTE: We have to put "list" first, otherwise, the "list" segment gets
				// picked-up by the detail's ":id" parameter.
				...ListViewModule.routes,
				...DetailViewModule.routes,

				{
					path: "",
					pathMatch: "full",
					redirectTo: "list"
				}
			]
		}
	];

}

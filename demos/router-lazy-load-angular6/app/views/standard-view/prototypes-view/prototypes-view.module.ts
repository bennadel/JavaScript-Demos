
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
export class PrototypesViewModule {
	
	static routes: Routes = [
		{
			path: "prototypes",
			children: [
				...DetailViewModule.routes,

				{
					path: "",
					pathMatch: "full",
					redirectTo: "/app/projects/list;filterType=prototype"
				}
			]
		}
	];

}

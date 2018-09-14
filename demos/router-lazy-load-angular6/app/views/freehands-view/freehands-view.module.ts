
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
export class FreehandsViewModule {

	static routes: Routes = [
		{
			path: "freehands",
			children: [
				...DetailViewModule.routes,

				{
					path: "",
					pathMatch: "full",
					redirectTo: "/app/projects/list;filterType=freehand"
				}
			]
		}
	];

}

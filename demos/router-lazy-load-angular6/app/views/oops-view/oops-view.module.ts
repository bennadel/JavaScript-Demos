
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { NotFoundViewComponent } from "./not-found-view/not-found-view.component";
import { OopsViewComponent } from "./oops-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		NotFoundViewComponent,
		OopsViewComponent
	]
})
export class OopsViewModule {

	static routes: Routes = [
		{
			path: "oops",
			component: OopsViewComponent,
			children: [
				{
					path: "not-found",
					component: NotFoundViewComponent
				},

				// Handle the....
				{
					path: "",
					pathMatch: "full",
					redirectTo: "not-found"
				}
			]
		}
	];

}

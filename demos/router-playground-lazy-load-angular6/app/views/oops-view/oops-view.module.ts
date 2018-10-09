
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { NotFoundViewComponent } from "./not-found-view/not-found-view.component";
import { OopsViewComponent } from "./oops-view.component";
import { RoutableView } from "~/app/app.module";
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
	// ...
}

export var OopsView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		OopsViewModule
	],
	routes: [
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
	]
};

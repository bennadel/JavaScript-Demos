
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { InspectViewComponent } from "./inspect-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		InspectViewComponent
	]
})
export class InspectViewModule {

	static routes: Routes = [
		{
			path: "inspect",
			component: InspectViewComponent
		}
	];

}

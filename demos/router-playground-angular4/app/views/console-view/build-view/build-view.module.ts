
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BuildViewComponent } from "./build-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BuildViewComponent
	]
})
export class BuildViewModule {

	static routes: Routes = [
		{
			path: "build",
			component: BuildViewComponent
		}
	];

}

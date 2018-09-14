
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { CreateProjectViewComponent } from "./create-project-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		CreateProjectViewComponent
	]
})
export class CreateProjectViewModule {

	static routes: Routes = [
		{
			path: "create-project",
			component: CreateProjectViewComponent
		}
	];

}

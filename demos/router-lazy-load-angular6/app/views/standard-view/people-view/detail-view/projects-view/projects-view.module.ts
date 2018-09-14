
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ProjectsViewComponent } from "./projects-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ProjectsViewComponent
	]
})
export class ProjectsViewModule {
	
	static routes: Routes = [
		{
			path: "projects",
			component: ProjectsViewComponent
		}
	];

}

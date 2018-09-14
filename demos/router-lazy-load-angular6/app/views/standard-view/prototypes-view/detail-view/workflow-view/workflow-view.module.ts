
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { WorkflowViewComponent } from "./workflow-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		WorkflowViewComponent
	]
})
export class WorkflowViewModule {
	
	static routes: Routes = [
		{
			path: "workflow",
			component: WorkflowViewComponent
		}
	];

}


// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ActivityViewComponent } from "./activity-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ActivityViewComponent
	]
})
export class ActivityViewModule {
	
	static routes: Routes = [
		{
			path: "activity",
			component: ActivityViewComponent
		}
	];

}

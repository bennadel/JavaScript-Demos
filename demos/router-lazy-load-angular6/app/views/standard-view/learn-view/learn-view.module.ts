
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { LearnViewComponent } from "./learn-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		LearnViewComponent
	]
})
export class LearnViewModule {
	
	static routes: Routes = [
		{
			path: "learn",
			component: LearnViewComponent
		}
	];

}

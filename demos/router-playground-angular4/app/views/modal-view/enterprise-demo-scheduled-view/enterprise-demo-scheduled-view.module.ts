
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { EnterpriseDemoScheduledViewComponent } from "./enterprise-demo-scheduled-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		EnterpriseDemoScheduledViewComponent
	]
})
export class EnterpriseDemoScheduledViewModule {

	static routes: Routes = [
		{
			path: "enterprise-demo-scheduled",
			component: EnterpriseDemoScheduledViewComponent
		}
	];

}

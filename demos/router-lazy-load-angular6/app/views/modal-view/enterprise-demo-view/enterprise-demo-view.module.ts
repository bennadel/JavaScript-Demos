
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { EnterpriseDemoViewComponent } from "./enterprise-demo-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		EnterpriseDemoViewComponent
	]
})
export class EnterpriseDemoViewModule {

	static routes: Routes = [
		{
			path: "enterprise-demo",
			component: EnterpriseDemoViewComponent
		}
	];

}

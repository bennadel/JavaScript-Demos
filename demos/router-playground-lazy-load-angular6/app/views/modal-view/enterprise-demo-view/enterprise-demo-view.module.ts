
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { EnterpriseDemoViewComponent } from "./enterprise-demo-view.component";
import { RoutableView } from "~/app/app.module";
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
	// ...
}

export var EnterpriseDemoView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		EnterpriseDemoViewModule
	],
	routes: [
		{
			path: "enterprise-demo",
			component: EnterpriseDemoViewComponent
		}
	]
};

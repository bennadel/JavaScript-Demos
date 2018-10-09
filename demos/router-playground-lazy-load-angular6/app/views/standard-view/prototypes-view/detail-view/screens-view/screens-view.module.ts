
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { RoutableView } from "~/app/app.module";
import { ScreensViewComponent } from "./screens-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ScreensViewComponent
	]
})
export class ScreensViewModule {
	// ...
}

export var ScreensView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		ScreensViewModule
	],
	routes: [
		{
			path: "screens",
			component: ScreensViewComponent
		}
	]
};

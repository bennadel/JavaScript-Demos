
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { FeatureAViewComponent } from "./feature-a-view.component";
import { MyWidgetComponent } from "./my-widget.component";
import { RoutableView } from "~/app/app.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				component: FeatureAViewComponent
			}
		])
	],
	declarations: [
		FeatureAViewComponent,
		MyWidgetComponent
	]
})
export class FeatureAViewModule {
	// ...
}

export var FeatureAView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does NOT NEED
		// to import this module. As such, this collection is empty.
	],
	routes: [
		{
			path: "feature-a",
			loadChildren: "./views/feature-a-view/feature-a-view.module#FeatureAViewModule"
			// NOTE: I could have also defined this path relative to the root of the
			// application. Though, by making it relative to the parent module, I had
			// to use "./" in the path prefix.
			// --
			// loadChildren: "app/views/feature-a-view/feature-a-view.module#FeatureAViewModule"
		}
	]
};

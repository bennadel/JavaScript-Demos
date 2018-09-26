
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { FeatureBViewComponent } from "./feature-b-view.component";
import { MyWidgetComponent } from "./my-widget.component";
import { RoutableView } from "~/app/app.module";
import { SubBView } from "./sub-b-view/sub-b-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		// --
		...SubBView.modules, // <--- empty array.
		// --
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				component: FeatureBViewComponent,
				children: [
					// CAUTION: These routes define LAZY LOADED modules.
					...SubBView.routes
				]
			}
		])
	],
	declarations: [
		FeatureBViewComponent,
		MyWidgetComponent
	]
})
export class FeatureBViewModule {
	// ...
}

export var FeatureBView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does NOT NEED
		// to import this module. As such, this collection is empty.
	],
	routes: [
		{
			path: "feature-b",
			loadChildren: "./views/feature-b-view/feature-b-view.module#FeatureBViewModule"
			// NOTE: I could have also defined this path relative to the root of the
			// application. Though, by making it relative to the parent module, I had
			// to use "./" in the path prefix.
			// --
			// loadChildren: "app/views/feature-b-view/feature-b-view.module#FeatureBViewModule"
		}
	]
};


// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { RoutableView } from "~/app/app.module";
import { SubBViewComponent } from "./sub-b-view.component";

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
				component: SubBViewComponent
			}
		])
	],
	declarations: [
		SubBViewComponent
	]
})
export class SubBViewModule {
	// ...
}

export var SubBView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does NOT NEED
		// to import this module. As such, this collection is empty.
	],
	routes: [
		{
			path: "sub-b",
			loadChildren: "./sub-b-view/sub-b-view.module#SubBViewModule"
			// NOTE: I could have also defined this path relative to the root of the
			// application. Though, by making it relative to the parent module, I had
			// to use "./" in the path prefix.
			// --
			// loadChildren: "app/views/feature-b-view/sub-b-view/sub-b-view.module#SubBViewModule"
		}
	]
};

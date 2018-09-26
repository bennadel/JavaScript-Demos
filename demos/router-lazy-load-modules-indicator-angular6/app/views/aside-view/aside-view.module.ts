
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AsideViewComponent } from "./aside-view.component";
import { RoutableView } from "~/app/app.module";
import { TabViewComponent } from "./tab-view.component";

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
				component: AsideViewComponent,
				children: [
					{
						path: "tab-1",
						component: TabViewComponent
					},
					{
						path: "tab-2",
						component: TabViewComponent
					}
				]
			}
		])
	],
	declarations: [
		AsideViewComponent,
		TabViewComponent
	]
})
export class AsideViewModule {
	// ...
}

export var AsideView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does NOT NEED
		// to import this module. As such, this collection is empty.
	],
	routes: [
		{
			outlet: "aside",
			path: "aside",
			loadChildren: "./views/aside-view/aside-view.module#AsideViewModule"
			// NOTE: I could have also defined this path relative to the root of the
			// application. Though, by making it relative to the parent module, I had
			// to use "./" in the path prefix.
			// --
			// loadChildren: "app/views/aside-view/aside-view.module#AsideViewModule"
		}
	]
};

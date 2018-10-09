
// Import the core angular services.
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailViewComponent } from "./detail-view/detail-view.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { ProductUpdatesViewComponent } from "./product-updates-view.component";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		// --
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				component: ProductUpdatesViewComponent,
				children: [
					{
						path: "",
						pathMatch: "full",
						component: ListViewComponent
					},
					{
						path: ":id",
						component: DetailViewComponent
					}
				]
			}
		])
	],
	declarations: [
		DetailViewComponent,
		ListViewComponent,
		ProductUpdatesViewComponent
	]
})
export class ProductUpdatesViewModule {
	// ...
}

export var ProductUpdatesView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does not
		// need to know about it - Angular will handle the integration when it loads
		// the remote files.
	],
	routes: [
		{
			outlet: "updates",
			path: "product-updates",
			loadChildren: "./views/product-updates-view/product-updates-view.module#ProductUpdatesViewModule"
		}
	]
};

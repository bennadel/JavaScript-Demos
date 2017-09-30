
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailViewComponent } from "./detail-view/detail-view.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { PartialService as DetailViewPartialService } from "./detail-view/services/partial.service";
import { PartialService as ListViewPartialService } from "./list-view/services/partial.service";
import { ProductUpdatesViewComponent } from "./product-updates-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		DetailViewComponent,
		ListViewComponent,
		ProductUpdatesViewComponent
	],
	providers: [
		DetailViewPartialService,
		ListViewPartialService
	]
})
export class ProductUpdatesViewModule {
	
	static routes: Routes = [
		{
			outlet: "updates",
			path: "product-updates",
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
	];

}

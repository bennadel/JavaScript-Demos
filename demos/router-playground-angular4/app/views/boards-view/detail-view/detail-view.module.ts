
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailViewComponent } from "./detail-view.component";
import { ItemViewModule } from "./item-view/item-view.module";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		ItemViewModule,
		SharedModule
	],
	declarations: [
		DetailViewComponent
	],
	providers: [
		PartialService
	]
})
export class DetailViewModule {

	static routes: Routes = [
		{
			path: ":id",
			component: DetailViewComponent,
			children: [
				...ItemViewModule.routes
			]
		}
	];

}

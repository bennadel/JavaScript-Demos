
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DetailViewComponent } from "./detail-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
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
			component: DetailViewComponent
		}
	];

}

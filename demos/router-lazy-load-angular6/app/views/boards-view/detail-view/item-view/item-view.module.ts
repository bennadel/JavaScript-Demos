
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ItemViewComponent } from "./item-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ItemViewComponent
	],
	providers: [
		PartialService
	]
})
export class ItemViewModule {

	static routes: Routes = [
		{
			path: "items",
			children: [
				{
					path: ":id",
					component: ItemViewComponent
				},

				// Handle no route situation.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "../"
				}
			]
		}
	];

}

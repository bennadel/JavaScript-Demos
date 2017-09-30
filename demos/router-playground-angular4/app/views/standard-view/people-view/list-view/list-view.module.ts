
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ListViewComponent } from "./list-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	providers: [
		PartialService
	],
	declarations: [
		ListViewComponent
	]
})
export class ListViewModule {
	
	static routes: Routes = [
		{
			path: "list",
			component: ListViewComponent
		}
	];

}

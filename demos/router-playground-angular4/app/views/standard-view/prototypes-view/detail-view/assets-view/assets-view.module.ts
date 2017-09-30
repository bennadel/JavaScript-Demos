
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AssetsViewComponent } from "./assets-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		AssetsViewComponent
	]
})
export class AssetsViewModule {
	
	static routes: Routes = [
		{
			path: "assets",
			component: AssetsViewComponent
		}
	];

}

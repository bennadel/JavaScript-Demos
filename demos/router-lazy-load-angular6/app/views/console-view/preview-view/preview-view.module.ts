
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { PreviewViewComponent } from "./preview-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		PreviewViewComponent
	]
})
export class PreviewViewModule {

	static routes: Routes = [
		{
			path: "preview",
			component: PreviewViewComponent
		}
	];

}

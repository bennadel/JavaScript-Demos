
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { PartialService } from "./services/partial.service";
import { ScreensViewComponent } from "./screens-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ScreensViewComponent
	],
	providers: [
		PartialService
	]
})
export class ScreensViewModule {
	
	static routes: Routes = [
		{
			path: "screens",
			component: ScreensViewComponent
		}
	];

}

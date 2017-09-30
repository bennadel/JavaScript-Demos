
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { HistoryViewComponent } from "./history-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		HistoryViewComponent
	]
})
export class HistoryViewModule {

	static routes: Routes = [
		{
			path: "history",
			component: HistoryViewComponent
		}
	];

}

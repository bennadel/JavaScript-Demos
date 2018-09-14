
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { NotificationsViewComponent } from "./notifications-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		NotificationsViewComponent
	]
})
export class NotificationsViewModule {
	
	static routes: Routes = [
		{
			path: "notifications",
			component: NotificationsViewComponent
		}
	];

}

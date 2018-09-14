
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ProfileViewComponent } from "./profile-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ProfileViewComponent
	]
})
export class ProfileViewModule {
	
	static routes: Routes = [
		{
			path: "profile",
			component: ProfileViewComponent
		}
	];

}

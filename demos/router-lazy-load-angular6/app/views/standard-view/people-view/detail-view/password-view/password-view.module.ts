
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { PasswordViewComponent } from "./password-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		PasswordViewComponent
	]
})
export class PasswordViewModule {
	
	static routes: Routes = [
		{
			path: "password",
			component: PasswordViewComponent
		}
	];

}

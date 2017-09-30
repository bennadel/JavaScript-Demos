
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { PartialService } from "./services/partial.service";
import { PrototypeMembersViewComponent } from "./prototype-members-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		PrototypeMembersViewComponent
	],
	providers: [
		PartialService
	]
})
export class PrototypeMembersViewModule {

	static routes: Routes = [
		{
			path: "prototype-members/:id",
			component: PrototypeMembersViewComponent
		}
	];

}

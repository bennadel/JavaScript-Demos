
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardMembersViewComponent } from "./board-members-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BoardMembersViewComponent
	],
	providers: [
		PartialService
	]
})
export class BoardMembersViewModule {

	static routes: Routes = [
		{
			path: "board-members/:id",
			component: BoardMembersViewComponent
		}
	];

}

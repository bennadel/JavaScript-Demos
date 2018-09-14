
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { CommentsViewComponent } from "./comments-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		CommentsViewComponent
	]
})
export class CommentsViewModule {
	
	static routes: Routes = [
		{
			path: "comments",
			component: CommentsViewComponent
		}
	];

}

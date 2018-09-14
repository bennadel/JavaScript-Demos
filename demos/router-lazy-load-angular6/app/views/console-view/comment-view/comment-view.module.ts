
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { CommentViewComponent } from "./comment-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		CommentViewComponent
	]
})
export class CommentViewModule {

	static routes: Routes = [
		{
			path: "comment",
			component: CommentViewComponent
		}
	];

}


// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ActivityViewModule } from "./activity-view/activity-view.module";
import { AssetsViewModule } from "./assets-view/assets-view.module";
import { CommentsViewModule } from "./comments-view/comments-view.module";
import { DetailViewComponent } from "./detail-view.component";
import { PartialService } from "./services/partial.service";
import { ScreensViewModule } from "./screens-view/screens-view.module";
import { SharedModule } from "~/app/shared/shared.module";
import { WorkflowViewModule } from "./workflow-view/workflow-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		ActivityViewModule,
		AssetsViewModule,
		CommentsViewModule,
		ScreensViewModule,
		SharedModule,
		WorkflowViewModule
	],
	declarations: [
		DetailViewComponent
	],
	providers: [
		PartialService
	]
})
export class DetailViewModule {
	
	static routes: Routes = [
		{
			path: ":id",
			component: DetailViewComponent,
			children: [
				...ActivityViewModule.routes,
				...AssetsViewModule.routes,
				...CommentsViewModule.routes,
				...ScreensViewModule.routes,
				...WorkflowViewModule.routes,

				// Handle no route situation.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "screens"
				}
			]
		}
	];

}

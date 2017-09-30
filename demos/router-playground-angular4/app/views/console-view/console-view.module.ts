
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BuildViewModule } from "./build-view/build-view.module";
import { CommentViewModule } from "./comment-view/comment-view.module";
import { ConsoleViewComponent } from "./console-view.component";
import { HistoryViewModule } from "./history-view/history-view.module";
import { InspectViewModule } from "./inspect-view/inspect-view.module";
import { PartialService } from "./services/partial.service";
import { PreviewViewModule } from "./preview-view/preview-view.module";
import { ScreenBrowserComponent } from "./directives/screen-browser/screen-browser.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BuildViewModule,
		CommentViewModule,
		HistoryViewModule,
		InspectViewModule,
		PreviewViewModule,
		SharedModule
	],
	declarations: [
		ConsoleViewComponent,
		ScreenBrowserComponent
	],
	providers: [
		PartialService
	]
})
export class ConsoleViewModule {

	static routes: Routes = [
		{
			path: "console/prototypes/:prototypeID/screens/:screenID",
			component: ConsoleViewComponent,
			children: [
				...BuildViewModule.routes,
				...CommentViewModule.routes,
				...HistoryViewModule.routes,
				...InspectViewModule.routes,
				...PreviewViewModule.routes,

				// Handle the "no route" case.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "preview"
				}
			]
		}
	];

}

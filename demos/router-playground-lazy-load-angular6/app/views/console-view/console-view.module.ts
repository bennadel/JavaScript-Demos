
// Import the core angular services.
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BuildView } from "./build-view/build-view.module";
import { CommentView } from "./comment-view/comment-view.module";
import { ConsoleViewComponent } from "./console-view.component";
import { HistoryView } from "./history-view/history-view.module";
import { InspectView } from "./inspect-view/inspect-view.module";
import { PreviewView } from "./preview-view/preview-view.module";
import { RoutableView } from "~/app/app.module";
import { ScreenBrowserComponent } from "./directives/screen-browser/screen-browser.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...BuildView.modules,
		...CommentView.modules,
		...HistoryView.modules,
		...InspectView.modules,
		...PreviewView.modules,
		// --
		RouterModule.forChild([
			{
				// NOTE: Since this module is being lazy-loaded, the root segment has
				// already been defined (as part of the lazy-load configuration). As
				// such, the root segment here is empty.
				path: "",
				component: ConsoleViewComponent,
				children: [
					...BuildView.routes,
					...CommentView.routes,
					...HistoryView.routes,
					...InspectView.routes,
					...PreviewView.routes,

					// Handle the "no route" case.
					{
						path: "",
						pathMatch: "full",
						redirectTo: "preview"
					}
				]
			}
		])
	],
	declarations: [
		ConsoleViewComponent,
		ScreenBrowserComponent
	]
})
export class ConsoleViewModule {
	// ...
}

export var ConsoleView: RoutableView = {
	modules: [
		// NOTE: Since this module is being lazy-loaded, the parent module does not
		// need to know about it - Angular will handle the integration when it loads
		// the remote files.
	],
	routes: [
		{
			path: "console/prototypes/:prototypeID/screens/:screenID",
			loadChildren: "./views/console-view/console-view.module#ConsoleViewModule"
		}
	]
};

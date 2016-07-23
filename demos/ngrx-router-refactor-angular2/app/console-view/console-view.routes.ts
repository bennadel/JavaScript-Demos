
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { ConsoleViewComponent } from "./console-view.component";
import * as buildView from "./build-view/index";
import * as commentsView from "./comments-view/index";
import * as historyView from "./history-view/index";
import * as previewView from "./preview-view/index";


export var consoleViewRoutes: Routes = [
	{
		path: "/console/project/:projectId/screen/:screenId",
		component: ConsoleViewComponent,
		index: {
			redirectTo: "/console/project/:projectId/screen/:screenId/preview"
		},
		children: [
			{
				path: "preview",
				component: previewView.PreviewViewComponent
			},
			{
				path: "build",
				component: buildView.BuildViewComponent
			},
			{
				path: "comments",
				component: commentsView.CommentsViewComponent,
				children: [
					{
						path: ""
					},
					{
						path: ":id"
					}
				]
			},
			{
				path: "history",
				component: historyView.HistoryViewComponent
			}
		]
	}
];

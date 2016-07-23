
// Import the core angular services.
import { Routes } from "@ngrx/router";
// import { Resolve } from "@angular/router";

// Import the application components and services.
import * as detailView from "./detail-view/index";
import * as listView from "./list-view/index";
import { ProjectsViewComponent } from "./projects-view.component";

// I think there is value in a feature's complete set of routes being configured in a 
// single top-level place. This way, a developer can pop-in here and see how this feature 
// can be navigated. However, in order to maintain clarity around the view names, each 
// embedded view is exported as its own name-space. This couples the route configuration 
// to the internal organization of the view component tree; however, since this is all 
// a single, cohesive feature, I think this is OK.
export var projectsViewRoutes: Routes = [
	{
		path: "/projects",
		component: ProjectsViewComponent,
		index: {
			component: listView.ListViewComponent
		},
		children: [
			// /projects/4
			{
				path: ":projectId",
				component: detailView.DetailViewComponent,
				index: {
					redirectTo: "/projects/:projectId/screens"
				},
				children: [
					{
						path: "activity",
						component: detailView.activityView.ActivityViewComponent
					},
					{
						path: "assets",
						component: detailView.assetsView.AssetsViewComponent
					},
					{
						path: "comments",
						component: detailView.commentsView.CommentsViewComponent
					},
					{
						path: "screens",
						component: detailView.screensView.ScreensViewComponent
					},
					{
						path: "workflow",
						component: detailView.workflowView.WorkflowViewComponent
					}
					// /workflow/screen/:id ??
				]
			}
		]
	}
];

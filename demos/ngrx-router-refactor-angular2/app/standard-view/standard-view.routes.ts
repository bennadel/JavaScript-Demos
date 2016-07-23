
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { StandardViewComponent } from "./standard-view.component";

// Import the feature routes.
import { activityViewRoutes } from "./activity-view/index";
import { boardsViewRoutes } from "./boards-view/index";
import { learnViewRoutes } from "./learn-view/index";
import { projectsViewRoutes } from "./projects-view/index";
import { teamViewRoutes } from "./team-view/index";

export var standardViewRoutes: Routes = [
	// NOTE: Notice that none of the top-level paths have a value. This is because the
	// the routes in this view don't necessarily share a common prefix. As such, we
	// need to rely on the back-tracking feature of route matching. This way, the router
	// will traverse the route tree looking for matches. And, if it doesn't find any 
	// matches in a particular view, it will back-track and move on to the next route
	// configuration.
	{
		path: "",
		component: StandardViewComponent,
		children: [
			...activityViewRoutes,
			...boardsViewRoutes,
			...learnViewRoutes,
			...projectsViewRoutes,
			...teamViewRoutes
		]
	}
];

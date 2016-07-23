
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { ActivityViewComponent } from "./activity-view.component";

export var activityViewRoutes: Routes = [
	{
		path: "activity",
		component: ActivityViewComponent
	}
];

/*
	/activity
*/
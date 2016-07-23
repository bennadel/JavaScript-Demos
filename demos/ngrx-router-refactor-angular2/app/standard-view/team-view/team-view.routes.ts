
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { TeamViewComponent } from "./team-view.component";

export var teamViewRoutes: Routes = [
	{
		path: "team",
		component: TeamViewComponent
	}
];

/*
	/team
	/team/1 -> /team/1/activity
	/team/1/profile
	/team/1/password
	/team/1/billing
	/team/1/notifications
	/team/1/activity
	/team/1/sync
*/
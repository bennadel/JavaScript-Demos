
// Import core Angular modules.
import { Route } from "@angular/router";

// Import application modules.
import { AdminViewComponent } from "./admin-view.component";
// import { getRoutes } from "~/app/app.routes";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var ROUTES: Route[] = [
	{
		path: "",
		pathMatch: "full",
		component: AdminViewComponent
	}
];

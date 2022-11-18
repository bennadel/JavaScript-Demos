
// Import core Angular modules.
import { Route } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var ROUTES: Route[] = [
	{
		path: "admin",
		loadChildren: () => import( "./admin-view/admin-view.routes" )
	}
];


// Import core Angular modules.
import { Route } from "@angular/router";

// Import application modules.
import { AdminViewComponent } from "./admin-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var ROUTES: Route[] = [
	{
		path: "",
		pathMatch: "full",
		component: AdminViewComponent
	}
];

// NOTE: By exporting the ROUTES as the DEFAULT export, Angular will automatically unwrap
// and extract the routes provided via import() when calling loadChildren().
export default ROUTES;

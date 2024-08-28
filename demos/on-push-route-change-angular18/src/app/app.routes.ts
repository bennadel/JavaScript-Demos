
// Import vendor modules.
import { Routes } from "@angular/router";

// Import app modules.
import { V1ViewComponent } from "./v1-view.component";
import { V2ViewComponent } from "./v2-view.component";
import { V3ViewComponent } from "./v3-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var routes: Routes = [
	{
		path: "v1",
		component: V1ViewComponent
	},
	{
		path: "v2",
		component: V2ViewComponent
	},
	{
		path: "v3",
		component: V3ViewComponent
	}
];

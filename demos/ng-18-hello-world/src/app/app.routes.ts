
// Import vendor modules.
import { Routes } from "@angular/router";

// Import app modules.
import { PageAViewComponent } from "./page-a-view/page-a-view.component";
import { PageBViewComponent } from "./page-b-view/page-b-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var routes: Routes = [
	{
		path: "page-a/:pageID",
		component: PageAViewComponent
	},
	{
		path: "page-b/:pageID",
		component: PageBViewComponent
	}
	// { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

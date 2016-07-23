
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { LearnViewComponent } from "./learn-view.component";

export var learnViewRoutes: Routes = [
	{
		path: "learn",
		component: LearnViewComponent
	}
];

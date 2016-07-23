
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { BoardsViewComponent } from "./boards-view.component";

export var boardsViewRoutes: Routes = [
	{
		path: "boards",
		component: BoardsViewComponent
	}
];

/*
	/boards
	/boards/1
	/boards/1/3
*/
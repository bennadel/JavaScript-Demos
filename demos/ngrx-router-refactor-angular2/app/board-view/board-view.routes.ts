
// Import the core angular services.
import { Routes } from "@ngrx/router";

// Import the application components and services.
import { BoardViewComponent } from "./board-view.component";
import * as itemView from "./item-view/index";

export var boardViewRoutes: Routes = [
	{
		path: "/boards/:boardId",
		component: BoardViewComponent,
		children: [
			{
				path: "item/:itemId",
				component: itemView.ItemViewComponent
			}
		]
	}
];

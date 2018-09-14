
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardItemComponent } from "./directives/board-item.component";
import { FreehandItemComponent } from "./directives/freehand-item.component";
import { ListViewComponent } from "./list-view.component";
import { PartialService } from "./services/partial.service";
import { PrototypeItemComponent } from "./directives/prototype-item.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BoardItemComponent,
		FreehandItemComponent,
		ListViewComponent,
		PrototypeItemComponent
	],
	providers: [
		PartialService
	]
})
export class ListViewModule {
	
	static routes: Routes = [
		{
			path: "list",
			component: ListViewComponent
		}
	];

}

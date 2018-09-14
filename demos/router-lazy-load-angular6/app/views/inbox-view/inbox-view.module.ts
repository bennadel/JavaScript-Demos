
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
// import { DetailViewModule } from "./detail-view/detail-view.module";
import { InboxViewComponent } from "./inbox-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";
import { ThreadsViewModule } from "./threads-view/threads-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		ThreadsViewModule
	],
	declarations: [
		InboxViewComponent
	],
	providers: [
		PartialService
	]
})
export class InboxViewModule {

	static routes: Routes = [
		{
			outlet: "inbox",
			path: "inbox",
			component: InboxViewComponent,
			children: [
				...ThreadsViewModule.routes
			]
		}
	];

}

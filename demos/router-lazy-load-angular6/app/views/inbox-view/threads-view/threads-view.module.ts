
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ConversationViewModule } from "./conversation-view/conversation-view.module";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";
import { ThreadsViewComponent } from "./threads-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		ConversationViewModule,
		SharedModule
	],
	declarations: [
		ThreadsViewComponent
	],
	providers: [
		PartialService
	]
})
export class ThreadsViewModule {

	static routes: Routes = [
		{
			path: ":type/:id",
			component: ThreadsViewComponent,
			children: [
				...ConversationViewModule.routes
			]
		}
	];

}

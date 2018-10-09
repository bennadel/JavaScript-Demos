
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardConversationViewComponent } from "./board-conversation-view/board-conversation-view.component";
import { ConversationViewComponent } from "./conversation-view.component";
import { PrototypeConversationViewComponent } from "./prototype-conversation-view/prototype-conversation-view.component";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BoardConversationViewComponent,
		ConversationViewComponent,
		PrototypeConversationViewComponent
	]
})
export class ConversationViewModule {
	// ...
}

export var ConversationView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		ConversationViewModule
	],
	routes: [
		{
			path: "conversations/:id",
			component: ConversationViewComponent
			// CAUTION: We're not including the Board Conversation or the Prototype 
			// Conversation as child routes. This is because we need to render them based
			// on the parent route state. As such, we're going to be conditionally 
			// rendering them in the view; however, they will act as if they are routable
			// components and will reach into the ActivatedRoute to access their params.
		}
	]
};

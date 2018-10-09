
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardsView } from "./boards-view/boards-view.module";
import { ConsoleView } from "./console-view/console-view.module";
import { FreehandsView } from "./freehands-view/freehands-view.module";
import { InboxView } from "./inbox-view/inbox-view.module";
import { ModalView } from "./modal-view/modal-view.module";
import { OopsView } from "./oops-view/oops-view.module";
import { ProductUpdatesView } from "./product-updates-view/product-updates-view.module";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";
import { ShellViewComponent } from "./shell-view.component";
import { StandardView } from "./standard-view/standard-view.module";
// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...BoardsView.modules,
		...ConsoleView.modules,
		...FreehandsView.modules,
		...InboxView.modules,
		...ModalView.modules,
		...OopsView.modules,
		...ProductUpdatesView.modules,
		...StandardView.modules
	],
	declarations: [
		ShellViewComponent
	]
})
export class ShellViewModule {
	// ...
}

export var ShellView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		ShellViewModule
	],
	routes: [
		{
			// NOTE: Normally, I wouldn't include a "path" here because I would defer to
			// the child routes to define their own relevant prefix. However, since the 
			// ShellView component has several NAMED OUTLETs (Inbox, Modal), we have to
			// provide a path or the named outlets will break.
			// --
			// Read More: https://github.com/angular/angular/issues/14662
			path: "app",
			children: [
				...BoardsView.routes,
				...ConsoleView.routes,
				...InboxView.routes,
				...ModalView.routes,
				...OopsView.routes,
				...ProductUpdatesView.routes,
				...StandardView.routes,
				...FreehandsView.routes,

				// Handle the "no route" case.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "projects"
				}
			]
		},

		// Handle the "no route" case.
		{
			path: "",
			pathMatch: "full",
			redirectTo: "app/projects"
		},

		// Handle the catch-all for not found routes.
		{
			path: "**",
			redirectTo: "/app/oops/not-found"
		}
	]
};

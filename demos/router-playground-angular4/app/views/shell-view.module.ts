
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardsViewModule } from "./boards-view/boards-view.module";
import { ConsoleViewModule } from "./console-view/console-view.module";
import { FreehandsViewModule } from "./freehands-view/freehands-view.module";
import { InboxViewModule } from "./inbox-view/inbox-view.module";
import { ModalViewModule } from "./modal-view/modal-view.module";
import { OopsViewModule } from "./oops-view/oops-view.module";
import { ProductUpdatesViewModule } from "./product-updates-view/product-updates-view.module";
import { SharedModule } from "~/app/shared/shared.module";
import { ShellViewComponent } from "./shell-view.component";
import { StandardViewModule } from "./standard-view/standard-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BoardsViewModule,
		ConsoleViewModule,
		FreehandsViewModule,
		InboxViewModule,
		ModalViewModule,
		OopsViewModule,
		ProductUpdatesViewModule,
		SharedModule,
		StandardViewModule
	],
	declarations: [
		ShellViewComponent
	]
})
export class ShellViewModule {

	static routes: Routes = [
		{
			// NOTE: Normally, I wouldn't include a "path" here because I would defer to
			// the child routes to define their own relevant prefix. However, since the 
			// ShellView component has several NAMED OUTLETs (Inbox, Modal), we have to
			// provide a path or the named outlets will break.
			// --
			// Read More: https://github.com/angular/angular/issues/14662
			path: "app",
			children: [
				...BoardsViewModule.routes,
				...ConsoleViewModule.routes,
				...InboxViewModule.routes,
				...ModalViewModule.routes,
				...OopsViewModule.routes,
				...ProductUpdatesViewModule.routes,
				...StandardViewModule.routes,
				...FreehandsViewModule.routes,

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
	];

}

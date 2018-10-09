
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardMembersView } from "./board-members-view/board-members-view.module";
import { CreateProjectView } from "./create-project-view/create-project-view.module";
import { EnterpriseDemoScheduledView } from "./enterprise-demo-scheduled-view/enterprise-demo-scheduled-view.module";
import { EnterpriseDemoView } from "./enterprise-demo-view/enterprise-demo-view.module";
import { ErrorView } from "./error-view/error-view.module";
import { ModalViewComponent } from "./modal-view.component";
import { PrototypeMembersView } from "./prototype-members-view/prototype-members-view.module";
import { RoutableView } from "~/app/app.module";
import { SharedModule } from "~/app/shared/shared.module";
import { ShareBoardView } from "./share-board-view/share-board-view.module";
import { SharePrototypeView } from "./share-prototype-view/share-prototype-view.module";
import { UpgradePlanView } from "./upgrade-plan-view/upgrade-plan-view.module";
import { UserProjectsView } from "./user-projects-view/user-projects-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...BoardMembersView.modules,
		...CreateProjectView.modules,
		...EnterpriseDemoScheduledView.modules,
		...EnterpriseDemoView.modules,
		...ErrorView.modules,
		...PrototypeMembersView.modules,
		...ShareBoardView.modules,
		...SharePrototypeView.modules,
		...UpgradePlanView.modules,
		...UserProjectsView.modules
	],
	declarations: [
		ModalViewComponent
	]
})
export class ModalViewModule {
	// ...
}

export var ModalView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		ModalViewModule
	],
	routes: [
		{
			outlet: "modal",
			path: "modal",
			component: ModalViewComponent,
			children: [
				...BoardMembersView.routes,
				...CreateProjectView.routes,
				...EnterpriseDemoScheduledView.routes,
				...EnterpriseDemoView.routes,
				...ErrorView.routes,
				...PrototypeMembersView.routes,
				...ShareBoardView.routes,
				...SharePrototypeView.routes,
				...UpgradePlanView.routes,
				...UserProjectsView.routes
			]
		}
	]
};

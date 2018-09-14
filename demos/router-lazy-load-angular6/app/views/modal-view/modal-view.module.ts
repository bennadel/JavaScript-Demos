
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BoardMembersViewModule } from "./board-members-view/board-members-view.module";
import { CreateProjectViewModule } from "./create-project-view/create-project-view.module";
import { DoNotShowModalOnRefreshGuard } from "./services/do-not-show-modal-on-refresh.guard";
import { EnterpriseDemoScheduledViewModule } from "./enterprise-demo-scheduled-view/enterprise-demo-scheduled-view.module";
import { EnterpriseDemoViewModule } from "./enterprise-demo-view/enterprise-demo-view.module";
import { ErrorViewModule } from "./error-view/error-view.module";
import { ModalViewComponent } from "./modal-view.component";
import { PrototypeMembersViewModule } from "./prototype-members-view/prototype-members-view.module";
import { SharedModule } from "~/app/shared/shared.module";
import { ShareBoardViewModule } from "./share-board-view/share-board-view.module";
import { SharePrototypeViewModule } from "./share-prototype-view/share-prototype-view.module";
import { UpgradePlanViewModule } from "./upgrade-plan-view/upgrade-plan-view.module";
import { UserProjectsViewModule } from "./user-projects-view/user-projects-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BoardMembersViewModule,
		CreateProjectViewModule,
		EnterpriseDemoScheduledViewModule,
		EnterpriseDemoViewModule,
		ErrorViewModule,
		PrototypeMembersViewModule,
		SharedModule,
		ShareBoardViewModule,
		SharePrototypeViewModule,
		UpgradePlanViewModule,
		UserProjectsViewModule
	],
	declarations: [
		ModalViewComponent
	],
	providers: [
		DoNotShowModalOnRefreshGuard
	]
})
export class ModalViewModule {

	static routes: Routes = [
		{
			outlet: "modal",
			path: "modal",
			component: ModalViewComponent,
			children: [
				...BoardMembersViewModule.routes,
				...CreateProjectViewModule.routes,
				...EnterpriseDemoScheduledViewModule.routes,
				...EnterpriseDemoViewModule.routes,
				...ErrorViewModule.routes,
				...PrototypeMembersViewModule.routes,
				...ShareBoardViewModule.routes,
				...SharePrototypeViewModule.routes,
				...UpgradePlanViewModule.routes,
				...UserProjectsViewModule.routes
			]
		}
	];

}

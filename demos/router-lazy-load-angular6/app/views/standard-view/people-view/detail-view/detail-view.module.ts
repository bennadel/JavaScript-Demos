
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { ActivityViewModule } from "./activity-view/activity-view.module";
import { BillingViewModule } from "./billing-view/billing-view.module";
import { DetailViewComponent } from "./detail-view.component";
import { NotificationsViewModule } from "./notifications-view/notifications-view.module";
import { PartialService } from "./services/partial.service";
import { PasswordViewModule } from "./password-view/password-view.module";
import { ProfileViewModule } from "./profile-view/profile-view.module";
import { ProjectsViewModule } from "./projects-view/projects-view.module";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		ActivityViewModule,
		BillingViewModule,
		NotificationsViewModule,
		PasswordViewModule,
		ProfileViewModule,
		ProjectsViewModule,
		SharedModule
	],
	declarations: [
		DetailViewComponent
	],
	providers: [
		PartialService
	]
})
export class DetailViewModule {
	
	static routes: Routes = [
		{
			path: ":id",
			component: DetailViewComponent,
			children: [
				...ActivityViewModule.routes,
				...BillingViewModule.routes,
				...NotificationsViewModule.routes,
				...PasswordViewModule.routes,
				...ProfileViewModule.routes,
				...ProjectsViewModule.routes,

				// Handle the no-route route.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "activity"
				}
			]
		}
	];

}

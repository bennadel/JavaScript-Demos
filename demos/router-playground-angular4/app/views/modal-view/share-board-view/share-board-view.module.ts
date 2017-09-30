
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { EmailViewComponent } from "./email-view/email-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";
import { ShareBoardViewComponent } from "./share-board-view.component";
import { SmsViewComponent } from "./sms-view/sms-view.component";
import { UrlViewComponent } from "./url-view/url-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		EmailViewComponent,
		ShareBoardViewComponent,
		SmsViewComponent,
		UrlViewComponent
	],
	providers: [
		PartialService
	]
})
export class ShareBoardViewModule {

	static routes: Routes = [
		{
			path: "share-board/:id",
			component: ShareBoardViewComponent,
			children: [
				{
					path: "",
					pathMatch: "full",
					redirectTo: "url"
				},
				{
					path: "url",
					component: UrlViewComponent
				},
				{
					path: "email",
					component: EmailViewComponent
				},
				{
					path: "sms",
					component: SmsViewComponent
				}
			]
		}
	];

}

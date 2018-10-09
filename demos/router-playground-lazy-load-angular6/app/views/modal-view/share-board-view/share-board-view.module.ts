
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { EmailViewComponent } from "./email-view/email-view.component";
import { RoutableView } from "~/app/app.module";
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
	]
})
export class ShareBoardViewModule {
	// ...
}

export var ShareBoardView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		ShareBoardViewModule
	],
	routes: [
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
	]
};

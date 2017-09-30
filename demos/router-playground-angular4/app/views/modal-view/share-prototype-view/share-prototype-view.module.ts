
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { EmailViewComponent } from "./email-view/email-view.component";
import { PartialService } from "./services/partial.service";
import { SharedModule } from "~/app/shared/shared.module";
import { SharePrototypeViewComponent } from "./share-prototype-view.component";
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
		SharePrototypeViewComponent,
		SmsViewComponent,
		UrlViewComponent
	],
	providers: [
		PartialService
	]
})
export class SharePrototypeViewModule {

	static routes: Routes = [
		{
			path: "share-prototype/:id",
			component: SharePrototypeViewComponent,
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

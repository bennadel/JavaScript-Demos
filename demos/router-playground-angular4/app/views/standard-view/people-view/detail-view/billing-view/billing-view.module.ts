
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { BillingViewComponent } from "./billing-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		BillingViewComponent
	]
})
export class BillingViewModule {
	
	static routes: Routes = [
		{
			path: "billing",
			component: BillingViewComponent
		}
	];

}

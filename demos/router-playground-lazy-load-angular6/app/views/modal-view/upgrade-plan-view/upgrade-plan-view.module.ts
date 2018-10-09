
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { RoutableView } from "~/app/app.module";
import { SelectPaymentViewComponent } from "./select-payment-view/select-payment-view.component";
import { SelectPlanViewComponent } from "./select-plan-view/select-plan-view.component";
import { SharedModule } from "~/app/shared/shared.module";
import { UpgradePlanViewComponent } from "./upgrade-plan-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		SelectPaymentViewComponent,
		SelectPlanViewComponent,
		UpgradePlanViewComponent
	]
})
export class UpgradePlanViewModule {
	// ...
}

export var UpgradePlanView: RoutableView = {
	modules: [
		// NOTE: Since this module's routes are being included directly in the parent
		// module's router definition, we need to tell the parent module to import this
		// module. Otherwise, the application won't know about the declared components
		// and services.
		UpgradePlanViewModule
	],
	routes: [
		{
			path: "upgrade-plan",
			component: UpgradePlanViewComponent,
			children: [
				{
					path: "select-plan",
					component: SelectPlanViewComponent
				},
				{
					path: "select-payment",
					component: SelectPaymentViewComponent
				},

				// Handle the no-route route.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "select-plan"
				}
			]
		}
	]
};

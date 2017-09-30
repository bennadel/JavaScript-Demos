
// Import the core angular services.
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DoNotShowModalOnRefreshGuard } from "../services/do-not-show-modal-on-refresh.guard";
import { ErrorViewComponent } from "./error-view.component";
import { SharedModule } from "~/app/shared/shared.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ErrorViewComponent
	]
})
export class ErrorViewModule {

	static routes: Routes = [
		{
			path: "error/:type",
			component: ErrorViewComponent,
			canActivate: [ DoNotShowModalOnRefreshGuard ]
		}
	];

}

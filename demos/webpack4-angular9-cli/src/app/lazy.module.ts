
// Import the core angular services.
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { LazyComponent } from "./lazy.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: LazyComponent
			}
		])
	],
	declarations: [
		LazyComponent
	]
})
export class LazyModule {
	// ...
}

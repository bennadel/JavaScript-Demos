
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { SubAComponent } from "./sub-a.component";
import { SubBComponent } from "./sub-b.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		SubAComponent,
		SubBComponent
	],
	declarations: [
		SubAComponent,
		SubBComponent
	]
})
export class SubModule {
	// ...
}

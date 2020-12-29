
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { DemoBComponent } from "./demo-b.component";
import { IntersectionObserverBDirective } from "./intersection-observer-b.directive";
import { IntersectionObserverBListDirective } from "./intersection-observer-b.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		DemoBComponent
	],
	providers: [],
	declarations: [
		DemoBComponent,
		IntersectionObserverBDirective,
		IntersectionObserverBListDirective
	]
})
export class DemoBModule {
	// ...
}

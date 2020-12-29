
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { DemoAComponent } from "./demo-a.component";
import { IntersectionObserverADirective } from "./intersection-observer-a.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		DemoAComponent
	],
	providers: [],
	declarations: [
		DemoAComponent,
		IntersectionObserverADirective
	]
})
export class DemoAModule {
	// ...
}

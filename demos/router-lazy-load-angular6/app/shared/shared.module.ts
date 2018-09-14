
// Import the core angular services.
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AutofocusDirective } from "./directives/autofocus.directive";
import { AvatarComponent } from "./directives/avatar/avatar.component";
import { FragmentPolyfillModule } from "./modules/fragment-polyfill/fragment-polyfill.module";
import { LoadingIndicatorComponent } from "./directives/loading-indicator/loading-indicator.component";
import { RetainScrollPolyfillModule } from "./modules/retain-scroll-polyfill/retain-scroll-polyfill.module";
import { ShowBlockDirective } from "./directives/show-block.directive";
import { TrapScrollDirective } from "./directives/trap-scroll.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var sharedModules = [
	CommonModule,
	FragmentPolyfillModule,
	FormsModule,
	RetainScrollPolyfillModule,
	RouterModule
];

var sharedDeclarations = [
	AutofocusDirective,
	AvatarComponent,
	LoadingIndicatorComponent,
	ShowBlockDirective,
	TrapScrollDirective
];

// The goal of the SharedModule is to organize declarations and other modules that will
// be imported into other modules (for rendering). This module should NOT contain any
// service providers (those are in the CoreModule).
@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		...sharedDeclarations,
		...sharedModules
	],
	declarations: [
		...sharedDeclarations
	]
})
export class SharedModule {
	// ...
}

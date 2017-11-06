// Import the core angular services.
import { NgModule } from "@angular/core";

// Import the application components and services.
import { LazySrcDirective } from "./lazy-src.directive.ts";
import { LazyViewport } from "./lazy-viewport.ts";
import { LazyViewportDirective } from "./lazy-viewport.directive.ts";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	declarations: [
		LazySrcDirective,
		LazyViewportDirective
	],
	exports: [
		LazySrcDirective,
		LazyViewportDirective
	],
	providers: [
		// Setup the default LazyViewport instance without an associated element. This
		// will create a IntersectionObserver that uses the browser's viewport as the 
		// observer root. This way, an instance of LazyViewport is always available for
		// injection into other directives and services.
		// --
		// NOTE: This service will be overridden at lower-levels in the component tree
		// whenever a [lazyViewport] directive is applied.
		{
			provide: LazyViewport,
			useFactory: function() {

				var viewport = new LazyViewport();
				viewport.setup( /* No root. */ );

				return( viewport );

			}
		}
	]
})
export class LazyModule {
	// ...
}

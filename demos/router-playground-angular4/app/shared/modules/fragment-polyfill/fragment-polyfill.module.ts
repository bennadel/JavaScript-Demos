
// Import the core angular services.
import { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

// Import the application components and services.
import { FragmentTargetDirective } from "./fragment-target.directive";
import { NativeWindowScroller } from "./window-scroller";
import { WINDOW_SCROLLER_OPTIONS } from "./window-scroller";
import { WindowScroller } from "./window-scroller";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ModuleOptions {
	smooth?: boolean;
}

@NgModule({
	exports: [
		FragmentTargetDirective
	],
	declarations: [
		FragmentTargetDirective
	]
})
export class FragmentPolyfillModule {

	static forRoot( options?: ModuleOptions ) : ModuleWithProviders {

		return({
			ngModule: FragmentPolyfillModule,
			providers: [
				{
					provide: WINDOW_SCROLLER_OPTIONS,
					useValue: {
						smooth: ( ( options && options.smooth ) || false )
					}
				},
				{
					provide: WindowScroller,
					useClass: NativeWindowScroller
				}
			]
		});

	}

}


// Import the core angular services.
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PreloadAllModules } from "@angular/router";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { DirectClickPlugin } from "./shared/plugins/direct-click.plugin";
import { FragmentPolyfillModule } from "./shared/modules/fragment-polyfill/fragment-polyfill.module";
import { KeyboardShortcuts } from "./shared/services/keyboard-shortcuts";
import { MousedownOutsidePlugin } from "./shared/plugins/mousedown-outside.plugin";
import { RetainScrollPolyfillModule } from "./shared/modules/retain-scroll-polyfill/retain-scroll-polyfill.module";
import { ShellViewComponent } from "./views/shell-view.component";
import { ShellView } from "./views/shell-view.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// When we included a routable view into the router tree, we have to define the routes
// and, SOMETIMES, import the view modules (when statically loaded). In order to keep
// the routing semantics consistent across our views, I'm pushing both the ROUTE and
// MODULE definitions into the subview. This way, the parent context always SPREADS both
// the modules (into the imports) and the routes (into the RouterModule) into its own
// definition. This allows a module to switch from statically loaded to lazy loaded
// without the parent context having to know about it.
export interface RoutableView {
	modules: any[],
	routes: Routes
}

@NgModule({
	imports: [
		// BrowserAnimationsModule,
		BrowserModule,
		FragmentPolyfillModule.forRoot({
			smooth: true
		}),
		RetainScrollPolyfillModule.forRoot({
			// Tell the polyfill how long to poll the document after a route change in
			// order to look for elements that need to be restored to a previous offset.
			pollDuration: 3000,
			pollCadence: 50
		}),
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		...ShellView.modules, 
		// --
		RouterModule.forRoot(
			[
				...ShellView.routes
			],
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true,
				enableTracing: false,

				// I'm disabling the native scroll restoration so that my polyfill will
				// work properly.
				scrollPositionRestoration: "disabled"

				// This will tell Angular to preload the lazy-loaded routes after the
				// application has been bootstrapped. This will extend to both top-level
				// and nested lazy-loaded modules.
				// --
				// preloadingStrategy: PreloadAllModules
			}
		)
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above (which will be setting the
		// strategy for us).
		// --
		// {
		// 	provide: LocationStrategy,
		// 	useClass: HashLocationStrategy
		// }
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: DirectClickPlugin,
			multi: true
		},
		{
			provide: EVENT_MANAGER_PLUGINS,
			useClass: MousedownOutsidePlugin,
			multi: true
		},
	],
	bootstrap: [
		ShellViewComponent
	]
})
export class AppModule {
	
	// I initialize the app module, essentially creating a "run block" for the module.
	constructor( keyboardShortcuts: KeyboardShortcuts ) {

		keyboardShortcuts
			.setPriority( "board-item", 100 )
			.setPriority( "console", 100 )
			.setPriority( "inbox", 200 )
			.setPriority( "modal", 300 )
		;

	}

}

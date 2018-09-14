
// Import the core angular services.
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppViewComponent } from "./views/app-view.component";
import { AsideView } from "./views/aside-view/aside-view.module";
import { FeatureAView } from "./views/feature-a-view/feature-a-view.module";
import { FeatureBView } from "./views/feature-b-view/feature-b-view.module";
import { FeatureCView } from "./views/feature-c-view/feature-c-view.module";

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
		BrowserModule,
		// NOTE: When a routing module is statically included, then the routing module
		// needs to be explicitly imported. In order to not worry about this divergence,
		// let's let the child module define the importable modules (which may or may
		// not be an EMPTY ARRAY - empty if lazy-loaded).
		// --
		...AsideView.modules, // <--- empty array.
		...FeatureAView.modules, // <--- empty array.
		...FeatureBView.modules, // <--- empty array.
		...FeatureCView.modules,
		// --
		RouterModule.forRoot(
			[
				{
					path: "app",
					children: [
						// CAUTION: These routes define LAZY LOADED modules.
						...FeatureAView.routes, // <--- using "loadChildren"
						...FeatureBView.routes, // <--- using "loadChildren"
						...AsideView.routes, // <--- using "loadChildren"

						// CAUTION: These routes define STATICALLY LOADED modules.
						...FeatureCView.routes
					]
				},
				// Handle root redirect to app.
				{
					path: "",
					pathMatch: "full",
					redirectTo: "app"
				},
				// Handle root not-found redirect.
				{
					path: "**",
					redirectTo: "/app"
				}
			],
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true,
				enableTracing: false
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
	],
	declarations: [
		AppViewComponent
	],
	bootstrap: [
		AppViewComponent
	]
})
export class AppModule {
	// ...
}

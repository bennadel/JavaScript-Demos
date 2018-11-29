
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { FragmentPolyfillDirective } from "./fragment-polyfill.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[],
			{
				// Tell the router to use the hash instead of HTML5 pushstate.
				useHash: true,

				// Enable the Angular 6+ router features for scrolling and anchors. The
				// polyfill will assume that the basic fragment support already exists.
				scrollPositionRestoration: "enabled",
				anchorScrolling: "enabled",
				enableTracing: false
			}
		)
	],
	declarations: [
		AppComponent,
		// You'll need to include this directive in a shared module; or, anywhere you
		// also include the RouterModule directives.
		FragmentPolyfillDirective
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
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

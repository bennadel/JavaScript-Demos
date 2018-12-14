
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";

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

				// In order to get anchor / fragment scrolling to work at all, we need to
				// enable it on the router.
				anchorScrolling: "enabled",

				// Once the above is enabled, the fragment link will only work on the
				// first click. This is because, by default, the Router ignores requests
				// to navigate to the SAME URL that is currently rendered. Unfortunately,
				// the fragment scrolling is powered by Navigation Events. As such, we
				// have to tell the Router to re-trigger the Navigation Events even if we
				// are navigating to the same URL.
				onSameUrlNavigation: "reload",

				// Let's enable tracing so that we can see the aforementioned Navigation
				// Events when the fragment is clicked.
				enableTracing: true,
				scrollPositionRestoration: "enabled"
			}
		)
	],
	declarations: [
		AppComponent
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

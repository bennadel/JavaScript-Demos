
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { GoViewComponent } from "./go-view.component";
import { MockViewComponent } from "./mock-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				// The "go" prefix is our ingress into the short-cut route. However,
				// since we want our short-cuts to be flexible, we're going to use a 
				// wild-card sub-path. This way, we'll catch everything after "/go".
				{
					path: "go",
					children: [
						{
							path: "**",
							component: GoViewComponent
						}
					]
				},

				// Since we don't really have views in this demo, we'll just use a catch-
				// all route for all of our non-shortcut views.
				{
					path: "**",
					component: MockViewComponent
				}
			],
			{
				// Tell the router to use the hash instead of HTML5 pushstate.
				useHash: true,

				// Enable the Angular 6+ router features for scrolling and anchors.
				scrollPositionRestoration: "enabled",
				anchorScrolling: "enabled",
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
		AppComponent,
		GoViewComponent,
		MockViewComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

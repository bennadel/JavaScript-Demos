
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
				// The "go" prefix is our ingress into the shortcut route. The goal of
				// the shortcut is to both decouple the external world from the internal
				// implementation of the routing system; and, to allow more complex
				// routes to be calculated using application state (which may not be
				// knowable by the external world). The shortcuts can be simple, static
				// strings. Or, they can be data-driven routes that contain embedded
				// IDs. For routes-with-parameters, we're going to leverage the existing
				// power of the Angular Router to manage the parsing.
				{
					path: "go",
					children: [
						// NOTE: All of these child routes use the SAME VIEW COMPONENT.
						{
							path: "comment/:conversationID/:commentID",
							component: GoViewComponent,
							data: {
								shortcut: "inbox"
							}
						},
						{
							path: "most-recent/:count",
							component: GoViewComponent
						},
						// If no shortcut matches, we still want to render the View
						// component so that we can render an error message for the user.
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

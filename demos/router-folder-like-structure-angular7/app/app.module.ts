
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { GoTreeComponent } from "./go-tree.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: "go",
					children: [
						// We're doing to use a "sink" route to capture an arbitrary
						// path after the "go" segment. This path will represent the
						// user's point-of-traversal into the hierarchical data. The
						// segments in this arbitrary path will be accessible via the
						// "url" portion of the ActivatedRoute.
						{
							path: "**",
							component: GoTreeComponent
						}
					]
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
		GoTreeComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

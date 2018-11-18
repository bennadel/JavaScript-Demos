
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { SectionAComponent } from "./section-a.component";
import { SectionBComponent } from "./section-b.component";
import { SectionCComponent } from "./section-c.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: "section-a",
					component: SectionAComponent
				},
				{
					path: "section-b",
					component: SectionBComponent
				},
				{
					path: "section-c",
					component: SectionCComponent
				}
			],
			{
				// Tell the router to use the hash instead of HTML5 pushstate.
				useHash: true,

				// These aren't necessary for this demo - they are just here to provide
				// a more natural experience and test harness.
				scrollPositionRestoration: "enabled",
				anchorScrolling: "enabled",
				enableTracing: false
			}
		)
	],
	declarations: [
		AppComponent,
		SectionAComponent,
		SectionBComponent,
		SectionCComponent
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

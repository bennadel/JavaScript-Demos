
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { DoNotShowSecondaryOnRefreshGuard } from "./do-not-show-secondary-on-refresh.guard";
import { MainViewComponent } from "./main-view.component";
import { SecondaryViewComponent } from "./secondary-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			[
				{
					path: "app",
					children: [
						{
							path: "main",
							component: MainViewComponent
						},
						{
							path: "secondary",
							outlet: "secondary",
							component: SecondaryViewComponent,
							canActivate: [ DoNotShowSecondaryOnRefreshGuard ]
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
		MainViewComponent,
		SecondaryViewComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

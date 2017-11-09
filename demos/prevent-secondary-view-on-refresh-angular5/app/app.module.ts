
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { DoNotShowSecondaryOnRefreshGuard } from "./do-not-show-secondary-on-refresh.guard.ts";
import { MainViewComponent } from "./main-view.component";
import { SecondaryViewComponent } from "./secondary-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	{
		// NOTE: I am prefixing the entire app with "/app" because that makes routing
		// much easier to deal with (especially with secondary routes).
		// --
		// Read More: https://www.bennadel.com/blog/3346-named-outlets-require-non-empty-parent-route-segment-paths-in-angular-4-4-4.htm
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
];

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			routes,
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true
			}
		)
	],
	declarations: [
		AppComponent,
		MainViewComponent,
		SecondaryViewComponent
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above.
		// --
		// {
		// 	provide: LocationStrategy,
		// 	useClass: HashLocationStrategy
		// }
		DoNotShowSecondaryOnRefreshGuard
	]
})
export class AppModule {
	// ...
}

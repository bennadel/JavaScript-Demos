
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AViewComponent } from "./a-view.component";
import { BViewComponent } from "./b-view.component";
import { FragmentPolyfillModule } from "./fragment-polyfill.module";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	{
		path: "app",
		children: [
			{
				path: "a",
				component: AViewComponent
			},
			{
				path: "b",
				component: BViewComponent
			}
		]
	},

	// Redirect from the root to the "/app" prefix (this makes other features, like 
	// secondary outlets) easier to implement later on.
	{
		path: "",
		pathMatch: "full",
		redirectTo: "app"
	}
];

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FragmentPolyfillModule.forRoot({
			smooth: true
		}),
		RouterModule.forRoot(
			routes,
			{
				// Tell the router to use the HashLocationStrategy.
				useHash: true,
				enableTracing: false
			}
		)
	],
	declarations: [
		AppComponent,
		AViewComponent,
		BViewComponent
	],
	providers: [
		// CAUTION: We don't need to specify the LocationStrategy because we are setting
		// the "useHash" property in the Router module above.
		// --
		// {
		// 	provide: LocationStrategy,
		// 	useClass: HashLocationStrategy
		// }
	]
})
export class AppModule {
	// ...
}

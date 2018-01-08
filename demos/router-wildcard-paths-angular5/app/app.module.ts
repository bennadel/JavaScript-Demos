
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AViewComponent } from "./a-view.component";
import { BViewComponent } from "./b-view.component";
import { SubViewComponent } from "./sub-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	{
		path: "app",
		children: [
			{
				path: "a",
				component: AViewComponent,
				children: [
					{
						path: "sub",
						component: SubViewComponent
					},

					// This is a WILDCARD CATCH-ALL route that is scoped to the "/app/a"
					// route prefix. It will only catch non-matching routes that live
					// within this portion of the router tree.
					{
						path: "**",
						redirectTo: "/app/a"
					}
				]
			},
			{
				path: "b",
				component: BViewComponent,
				children: [
					{
						path: "sub",
						component: SubViewComponent
					}
				]
			}
		]
	},

	// Redirect from the root to the "/app" prefix (this makes other features, like 
	// secondary outlets) easier to implement later on.
	{
		path: "",
		pathMatch: "full",
		redirectTo: "app"
	},

	// This is the WILDCARD CATCH-ALL route that is scoped to the entire application. It
	// will catch any request that is not matched by an earlier route definition.
	{
		path: "**",
		redirectTo: "/app"
	}
];

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
				useHash: true,
				enableTracing: true
			}
		)
	],
	declarations: [
		AppComponent,
		AViewComponent,
		BViewComponent,
		SubViewComponent
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

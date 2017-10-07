
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { BComponent } from "./b.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	// We're going to redirect all "/a" routes to the "/b/z" route. When redirecting to
	// a RELATIVE path (ie, not absolute), the remainder of the path (not matched by 
	// the local pattern) will be AUTOMATICALLY appended to the redirect. As such, this
	// route configuration will replace any "/a" with "/b/z" in any route that begins
	// with the "/a" prefix (no need to create a "sink" route parameter).
	{
		path: "a",
		redirectTo: "b/z"
	},
	{
		path: "b/z",
		children: [
			// We're going to render all "/b/z"-prefix routes in the same component.
			{
				path: "**",
				component: BComponent
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
		BComponent
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

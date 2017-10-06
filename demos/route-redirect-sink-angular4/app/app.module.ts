
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
	// We're going to be redirecting any route that begins with "/a" to a route that
	// begins with "/b", keeping the rest of the route in tact. We can do with this
	// route segments which can actually match more than one slash-delimited token. In
	// this case, we're using ":restOfPath" to match the entire remainder of of the 
	// route - everything that follows the "/a/" prefix.
	{
		path: "a/:restOfPath",
		redirectTo: "b/:restOfPath"
	},
	// Since the ":restOfPath" path parameter has to match a non-zero-length value, we
	// have to include an additional redirect for the naked "/a" route (if we want to
	// handle those as well).
	{
		path: "a",
		redirectTo: "b"
	},
	{
		path: "b",
		children: [
			// We're going to render all "/b"-prefix routes in the same component.
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

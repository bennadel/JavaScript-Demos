
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { LayoutAComponent } from "./layout-a.component";
import { LayoutBComponent } from "./layout-b.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var routes: Routes = [
	{
		path: "layout-a",
		component: LayoutAComponent
	},
	{
		path: "layout-b",
		component: LayoutBComponent
	},
	{
	  path: "**",
	  redirectTo: "/layout-a"
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
		LayoutAComponent,
		LayoutBComponent
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

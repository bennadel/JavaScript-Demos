
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { PeopleDetailComponent } from "./people-detail.component";
import { PeopleListComponent } from "./people-list.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(
			[
				{
					path: "people",
					children: [
						// NOTE: Local redirect from (/people) to (/people/list).
						{
							path: "",
							pathMatch: "full",
							redirectTo: "list"
						},
						{
							path: "list",
							component: PeopleListComponent
						},
						{
							path: ":personID/detail",
							component: PeopleDetailComponent
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
		PeopleDetailComponent,
		PeopleListComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

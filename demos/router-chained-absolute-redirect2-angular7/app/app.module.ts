
// Import the core angular services.
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Import the application components and services.
import { AppComponent } from "./app.component";
import { AbsoluteRedirectComponent } from "./absolute-redirect.component";
import { PeopleListComponent } from "./people-list.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@NgModule({
	imports: [
		BrowserModule,
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
						}
					]
				},
				
				// SCENARIO: We have an old route for "/users" that we now want to
				// redirect to the "/people" route so that old links continue to work.
				// Only, this WILL BREAK because the "/people" route has a local redirect
				// to the "list" end-point. This WILL NOT BE HONORED as local redirects
				// are never followed after an absolute redirect.
				{
					path: "users",
					redirectTo: "/people" // <---- WILL NOT WORK (like we want it to).
				},

				// To get AROUND the ABSOLUTE REDIRECT limitation, we can use a transient
				// component. While the in-built "redirectTo" command won't allow for
				// subsequent local redirects, the Router.navigateByUrl() method will.
				// Meaning, an absolute URL navigation can be followed by local redirects
				// in the Router configuration. To demonstrate, we'll chain a few
				// absolute redirects that will eventually consume the local "people"
				// redirect (to people/list).
				{
					path: "ping",
					component: AbsoluteRedirectComponent,
					data: {
						redirectTo: "/pong" // <--- absolute redirect to FOLLOWING route.
					}
				},
				{
					path: "pong",
					component: AbsoluteRedirectComponent,
					data: {
						redirectTo: "/people" // <--- absolute redirect to PEOPLE route.
					}
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
		AbsoluteRedirectComponent,
		AppComponent,
		PeopleListComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
	// ...
}

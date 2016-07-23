
// Import the core angular services.
import { bootstrap } from "@angular/platform-browser-dynamic";
import { HashLocationStrategy } from "@angular/common";
import { LINK_ACTIVE_OPTIONS } from "@ngrx/router";
import { LocationStrategy } from "@angular/common";
import { PLATFORM_DIRECTIVES } from "@angular/core";
import { provideRouter } from "@ngrx/router";

// Import the application components and services.
import { AppComponent } from "./app.component";

// Import the application routes.
import { appRoutes } from "./app.routes";
import { AutofocusDirective } from "~/shared/directives/index";
import { LoadingIndicatorComponent } from "~/shared/directives/index";
import { ShowBlockDirective } from "~/shared/directives/index";

bootstrap(
	AppComponent,
	[
		// Make the router directives available to the entire application.
		// {
		// 	provide: PLATFORM_DIRECTIVES,
		// 	useValue: ROUTER_DIRECTIVES,
		// 	multi: true
		// },
		provideRouter( appRoutes ),

		// By default, the ngRx Router uses the PathLocationStrategy which uses the HTML5 
		// history.pushState() to change the URL without going back to the browser. This
		// strategy requires that the server knows how to handle these URLs when / if the
		// browser is refreshed or deep-linked. Since I am running this demo in GitHub
		// on gh-pages, there is no server-side rendering. As such, I have to use the 
		// HashLocationStrategy, which puts the active URL behind the /#/. Otherwise, the
		// demo would only work on the first load and break on most browser refreshes.
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},

		// Add some globally-available directives.
		{
			provide: PLATFORM_DIRECTIVES,
			useValue: [ 
				AutofocusDirective,
				LoadingIndicatorComponent,
				ShowBlockDirective 
			],
			multi: true
		},

		// Set "activeLink" options to be non-exact by default.
		{
			provide: LINK_ACTIVE_OPTIONS,
			useValue: {
				exact: false
			}
		}
	]
);
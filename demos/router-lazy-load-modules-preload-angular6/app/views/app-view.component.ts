
// Import the core angular services.
import { Component } from "@angular/core";
import { Event as RouterEvent } from "@angular/router";
import { NavigationCancel } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { NavigationError } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { Router } from "@angular/router";
import { RouteConfigLoadEnd } from "@angular/router";
import { RouteConfigLoadStart } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app-view.component.less" ],
	templateUrl: "./app-view.component.htm"
})
export class AppViewComponent {

	public isShowingRouteLoadIndicator: boolean;

	// I initialize the app view component.
	constructor( router: Router ) {

		this.isShowingRouteLoadIndicator = false;

		// *************************************************************************** //
		// CAUTION: Even though we are preloading our lazy-loading modules with the
		// "PreloadAllModules" configuration, the following Router events still fire
		// when the RouterPreloader's requests for the remote code are initiated and
		// completed, respectively. As such, this code is still relevant. And, on a
		// slower connection, may still show the loading indicator shortly after the
		// application has been bootstrapped (depending on what the initial URL of
		// the application is).
		// *************************************************************************** //

		// As the router loads modules asynchronously (via loadChildren), we're going to
		// keep track of how many asynchronous requests are currently active. If there is
		// at least one pending load request, we'll show the indicator.
		var asyncLoadCount = 0;

		// As the user navigates around the application, we're going to keep track of how
		// many pending navigation requests are currently active. This way, we can know
		// if the asynchronous module loading is [possibly] happening because of a user
		// navigation; or, if it's happening as part of the pre-loading.
		var navigationCount = 0;

		// The Router emits special events for "loadChildren" configuration loading. We
		// just need to listen for the Start and End events, amidst the rest of the
		// events, in order to determine if we have any pending configuration requests.
		router.events.subscribe(
			( event: RouterEvent ) : void => {

				if ( event instanceof RouteConfigLoadStart ) {

					asyncLoadCount++;

				} else if ( event instanceof RouteConfigLoadEnd ) {

					asyncLoadCount--;

				} else if ( event instanceof NavigationStart ) {

					navigationCount++;

				} else if ( 
					( event instanceof NavigationEnd ) ||
					( event instanceof NavigationError ) ||
					( event instanceof NavigationCancel ) 
					) {

					navigationCount--;

				}

				// If there is at least one pending asynchronous config load request AND
				// it is taking place while a the user is actively navigating around the
				// application, then let's show the loading indicator. This way, we don't
				// show the loading indicator during the preloading of lazy modules. This
				// isn't an exact science, since the navigation may not be tied to the
				// config load request. But, the small delay in rendering the indicator 
				// should make the fuzzy-association a non-issue (as unrelated navigation
				// events will start and end almost instantly).
				// --
				// CAUTION: I'm using CSS to include a small delay such that this loading
				// indicator won't be seen by people with sufficiently fast connections.
				this.isShowingRouteLoadIndicator = !! ( navigationCount && asyncLoadCount );

			}
		);

	}

}

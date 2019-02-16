
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ShortcutMatcher {
	route: string;
	redirect: string | RedirectFunction;
}

interface RedirectFunction {
	( a?: string, b?: string, c?: string, d?: string, e?: string ): string;
}

@Component({
	selector: "go-view",
	styleUrls: [ "./go-view.component.less" ],
	template:
	`
		<p *ngIf="isRedirecting" class="note">
			Redirecting....
		</p>

		<p *ngIf="( ! isRedirecting )" class="not-found">
			Sorry, we didn't recognize your short-cut.
			Trying <a routerLink="/">going back to the home-page</a>.
		</p>
	`
})
export class GoViewComponent {

	public isRedirecting: boolean;

	private activatedRoute: ActivatedRoute;
	private router: Router;
	private shortcutMatchers: ShortcutMatcher[];
	private urlSubscription: Subscription | null;

	// I initialize the go component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

		this.isRedirecting = true;
		this.urlSubscription = null;

		// The goal of the short-cut is to both decouple the external world from the
		// internal implementation of the routing system; and, to allow more complex
		// routes to be calculated using application state (which may not be knowable
		// by the external world). The short-cuts can be simple, static strings. Or,
		// they can be data-driven strings that contain embedded IDs.
		this.shortcutMatchers = [
			{
				route: "boards",
				redirect: "/projects;type=board"
			},
			{
				route: "favorites",
				redirect: "/projects/favorites"
			},
			{
				route: "most-recent",
				redirect: () => {

					// NOTE: The "15" here is some sort of app-state value.
					return( `/activity/${ 15 }/items` );

				}
			},
			{
				route: "profile",
				redirect: "/account/profile"
			},
			{
				route: "prototypes",
				redirect: "/projects;type=prototype"
			},
			{
				route: "comment/:conversationID/:commentID",
				redirect: ( conversationID, commentID ) => {

					return( `/inbox/threads/${ conversationID }/comment/${ commentID }` );

				}
			}
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		( this.urlSubscription ) && this.urlSubscription.unsubscribe();

	}


	// I get called once after the component has been mounted.
	public ngOnInit() : void {

		this.urlSubscription = this.activatedRoute.url.subscribe(
			( urlSegments ) => {

				// With the wild card sink route, we can get the short-cut by collapsing
				// all of the UrlSegments down into a single string. This will allow our
				// short-cuts to contain arbitrary values.
				var shortcut = urlSegments
					.map(
						( urlSegment ) => {
							
							return( urlSegment.path );

						}
					)
					.join( "/" )
				;

				this.redirectUser( shortcut );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I try to match the given shortcut against the given shortcut matcher. If a match
	// is made, the redirect URL is returned; otherwise, null is returned. 
	private matches( shortcutMatcher: ShortcutMatcher, shortcut: string ) : string | null {

		var paramPattern = /:[^/]+/g;

		// Take the route definition, which may include embedded ":param" notation, and
		// convert it to a RegEx pattern that will match any param between slashes.
		var routePattern = new RegExp( ( "^" + shortcutMatcher.route.replace( paramPattern, "([^/]+)" ) + "$" ), "i" );

		// Check to see if the incoming shortcut can be matched by the route pattern.
		// --
		// NOTE: If it does, the CAPTURED GROUPS in the resultant array will represent
		// the named route-params that were embedded in our shortcut matcher.
		var routeMatches = shortcut.match( routePattern );
		
		// If the route pattern did not match, short-circuit the function.
		if ( ! routeMatches ) {

			return( null );

		}

		// At this point, we know that our route matched against the incoming shortcut.
		// Now, we need to figure out how to generate the next URL. If the redirect in
		// the matcher is a simple string, just return it - no processing is needed.
		if ( typeof( shortcutMatcher.redirect ) === "string" ) {

			return( shortcutMatcher.redirect );

		// ON THE OTHER HAND, if the redirect in the matcher is a Function, then we have
		// to try and extract any named parameters from the route pattern and pass those
		// as parameters to the redirect function.
		} else {

			// NOTE: The .matches() function returns the full match as the first element.
			// However, we only want to pass the CAPTURED GROUPS as the arguments to our
			// redirect function. Hence, the .slice().
			return( shortcutMatcher.redirect( ...routeMatches.slice( 1 ) ) );
			
		}

	}


	// I redirect the user to the given short-cut.
	private redirectUser( shortcut: string ) : void {

		console.warn( "Redirecting via short-cut:", shortcut );

		for ( var shortcutMatcher of this.shortcutMatchers ) {

			var nextUrl = this.matches( shortcutMatcher, shortcut );

			// If we found a match for the shortcut, redirect the user to the target URL
			// and stop searching for further matches.
			if ( nextUrl ) {

				this.router.navigateByUrl( nextUrl );
				return;

			}

		}

		// If we made it this far, none of our matchers were matched against the given
		// short-cut. As such, we are not able to redirect the user. And, in this demo,
		// such an  outcome will leave the user on the short-cut view with the error
		// message.
		this.isRedirecting = false;

	}

}

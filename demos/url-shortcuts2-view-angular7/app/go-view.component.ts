
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "go-view",
	styleUrls: [ "./go-view.component.less" ],
	template:
	`
		<p *ngIf="isRedirecting" class="note">
			Redirecting....
		</p>

		<p *ngIf="( ! isRedirecting )" class="not-found">
			Sorry, we didn't recognize your shortcut.
			Trying <a routerLink="/">going back to the home-page</a>.
		</p>
	`
})
export class GoViewComponent implements OnInit, OnDestroy {

	public isRedirecting: boolean;

	private activatedRoute: ActivatedRoute;
	private dataSubscription: Subscription | null;
	private router: Router;
	private userID: number;

	// I initialize the go component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

		this.dataSubscription = null;
		this.isRedirecting = true;

		// NOTE: This value is just here to simulate some sort of "application state"
		// that would not be known ahead of time.
		this.userID = 15;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		( this.dataSubscription ) && this.dataSubscription.unsubscribe();

	}


	// I get called once after the component has been mounted.
	public ngOnInit() : void {

		this.dataSubscription = this.activatedRoute.data.subscribe(
			( data ) => {

				this.isRedirecting = true;

				// Since we're asking the Angular Router do the hard work of parsing some
				// of the parameterized routes, we can get the params from the snapshot
				// after each data-event.
				var params = this.activatedRoute.snapshot.params;

				switch ( this.getShortcut() ) {
					case "boards":
						this.router.navigateByUrl( "/projects;type=board" );
					break;
					case "favorites":
						this.router.navigateByUrl( "/projects/favorites" );
					break;
					case "inbox":
						this.router.navigateByUrl( `/inbox/threads/${ params.conversationID }/comment/${ params.commentID }` );
					break;
					case "most-recent":
						this.router.navigateByUrl( `/activity/${ this.userID }/items/${ params.count }` );
					break;
					case "profile":
						this.router.navigateByUrl( "/account/profile" );
					break;
					case "prototypes":
						this.router.navigateByUrl( "/projects;type=prototype" );
					break;
					default:
						// If we made it this far, the data doesn't represent a supported
						// shortcut. This is because the user got here based on the "**"
						// wild card route. As such, we are not able to redirect the
						// user. And, in this demo, such an outcome will leave the user
						// on the short-cut view with the error message.
						this.isRedirecting = false;
					break;
				}

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I get the shortcut from the activated route.
	private getShortcut() : string {

		// For routes that require special parsing (ie, routes that contain params), the
		// shortcut will be defined in the data object. For all other routes, we'll just
		// join the URL segments together to formulate the shortcut.
		var snapshot = this.activatedRoute.snapshot;

		if ( snapshot.data.shortcut ) {

			return( snapshot.data.shortcut );

		}

		var hasParams = !! Object.keys( snapshot.params ).length;

		// Since the shortcut wasn't provided in the data, let's get it from the URL.
		var shortcut = snapshot.url
			.map(
				( urlSegment ) => {

					return( urlSegment.path );

				}
			)
			.filter(
				( path, index ) => {

					// If the URL contains parameters, then we only want to use the URL
					// segment in the first location (as subsequent location will contain
					// params). However, if there are no params, then use all segments.
					return( ( index === 0 ) || ! hasParams );

				}
			)
			.join( "/" )
		;

		return( shortcut );

	}

}

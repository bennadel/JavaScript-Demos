
// Import the core angular services.
import { ActivatedRouteSnapshot } from "@angular/router";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { PRIMARY_OUTLET } from "@angular/router";
import { Router } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { UrlTree } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class DoNotShowSecondaryOnRefreshGuard implements CanActivate {

	private router: Router;

	// I initialize the secondary-view route guard.
	constructor( router: Router ) {
		
		this.router = router;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I determine if the requested route can be activated (ie, navigated to).
	public canActivate(
		activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot
		) : boolean {

		console.log( "[GUARD] Page Refresh:", this.isPageRefresh() );

		// We don't want to render this secondary view on page-refresh. As such, if this
		// is a page-refresh, we'll navigate to the same URL less the secondary outlet.
		if ( this.isPageRefresh() ) {

			console.warn( "[GUARD] Secondary view not allowed on refresh." );

			this.router.navigateByUrl( this.getUrlWithoutSecondary( routerStateSnapshot ) );
			return( false );

		}

		return( true );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return the requested URL (as defined in the snapshot), less any the "secondary"
	// named-outlet segments.
	private getUrlWithoutSecondary( routerStateSnapshot: RouterStateSnapshot ) : UrlTree {

		var urlTree = this.router.parseUrl( routerStateSnapshot.url );
		var segment = urlTree.root;

		// Since the "secondary" outlet is known to be directly off the primary view 
		// (ie, not nested within another named-outlet), we're going to walk down the 
		// tree of primary outlets and delete any "secondary" children. This should 
		// leave us with a UrlTree that contains everything that the original URL had,
		// less the "secondary" named-outlet.
		while ( segment && segment.children ) {

			delete( segment.children.secondary );

			segment = segment.children[ PRIMARY_OUTLET ];

		}

		return( urlTree );

	}


	// I determine if the current route-request is part of a page refresh.
	private isPageRefresh() : boolean {

		// If the router has yet to establish a single navigation, it means that this
		// navigation is the first attempt to reconcile the application state with the
		// URL state. Meaning, this is a page refresh.
		return( ! this.router.navigated );

	}

}

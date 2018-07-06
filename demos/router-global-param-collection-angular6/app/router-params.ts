
// Import the core angular services.
import { ActivatedRouteSnapshot } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Event as RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationEnd } from "@angular/router";
import { Observable } from "rxjs";
import { Params } from "@angular/router";
import { pipe } from "rxjs";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class RouterParams {

	public params: BehaviorSubject<Params>;
	public paramsSnapshot: Params;

	private router: Router;

	// I initialize the router params service.
	constructor( router: Router ) {

		this.router = router;

		this.paramsSnapshot = {};
		this.params = new BehaviorSubject( this.paramsSnapshot );

		// We will collection the params after every Router navigation event. However,
		// we're going to defer param aggregation until after the NavigationEnd event.
		// This should leave the Router in a predictable and steady state.
		// --
		// NOTE: Since the router events are already going to be triggering change-
		// detection, we probably don't have to take any precautions about whether or
		// not we subscribe to these events inside the Angular Zone.
		this.router.events
			.pipe(
				filter(
					( event: RouterEvent ) : boolean => {

						return( event instanceof NavigationEnd );

					}
				)
			)
			.subscribe(
				( event: NavigationEnd ) : void => {

					var snapshot = this.router.routerState.snapshot.root;
					var nextParams = this.collectParams( snapshot );

					// A Router navigation event can occur for a variety of reasons, such
					// as a change to the search-params. As such, we need to inspect the
					// params to see if the structure actually changed with this
					// navigation event. If not, we don't want to emit an event.
					if ( this.paramsAreDifferent( this.paramsSnapshot, nextParams ) ) {

						this.params.next( this.paramsSnapshot = nextParams );
						
					}

				}
			)
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I collect the params from the given router snapshot tree.
	// --
	// CAUTION: All params are merged into a single object. This means that like-named
	// params in different tree nodes will collide and overwrite each other.
	private collectParams( root: ActivatedRouteSnapshot ) : Params {

		var params: Params = {};

		(function mergeParamsFromSnapshot( snapshot: ActivatedRouteSnapshot ) {

			Object.assign( params, snapshot.params );

			snapshot.children.forEach( mergeParamsFromSnapshot );

		})( root );

		return( params );

	}


	// I determine if the given param collections have a different [shallow] structure.
	private paramsAreDifferent(
		currentParams: Params,
	 	nextParams: Params
	 	) : boolean {

		var currentKeys = Object.keys( currentParams );
		var nextKeys = Object.keys( nextParams );

		// If the collection of keys in each set of params is different, then we know
		// that we have two unique collections.
		if ( currentKeys.length !== nextKeys.length ) {

			return( true );

		}

		// If the collections of keys have the same length then we have to start
		// comparing the individual KEYS and VALUES in each collection.
		for ( var i = 0, length = currentKeys.length ; i < length ; i++ ) {

			var key = currentKeys[ i ];

			// Compare BOTH the KEY and the VALUE. While this looks like it is comparing
			// the VALUE alone, it is implicitly comparing the KEY as well. If a key is
			// defined in one collection but not in the other collection, one of the
			// values will be read as "undefined". This "undefined" value implies that
			// either the KEY or the VALUE was different.
			if ( currentParams[ key ] !== nextParams[ key ] ) {

				return( true );

			}

		}

		// If we made it this far, there was nothing to indicate that the two param
		// collections are different.
		return( false );

	}

}

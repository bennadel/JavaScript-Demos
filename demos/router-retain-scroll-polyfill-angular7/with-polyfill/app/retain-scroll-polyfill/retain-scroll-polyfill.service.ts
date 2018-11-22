
// Import the core angular services.
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { NavigationEnd } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { NgZone } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { DomUtils } from "./dom-utils";
import { Target } from "./dom-utils";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var OPTIONS_TOKEN = new InjectionToken<Options>( "RetainScrollPolyfillService.Options" );

export interface Options {
	pollDuration: number;
	pollCadence: number;
}

interface PageStates {
	[ navigationID: number ]: PageState;
}

interface PageState {
	[ selector: string ]: number;
}

@Injectable({
	providedIn: "root"
})
export class RetainScrollPolyfillService {

	private applyStateToDomTimer: number;
	private currentPageState: PageState;
	private domUtils: DomUtils;
	private lastNavigationStartAt: number;
	private navigationIDs: number[];
	private pageStates: PageStates;
	private pollCadence: number;
	private pollDuration: number;
	private router: Router;
	private scrolledElements: Set<Target>;
	private zone: NgZone;

	// I initialize the polyfill service.
	constructor(
		domUtils: DomUtils,
		router: Router,
		zone: NgZone,

		@Inject( OPTIONS_TOKEN ) options: Options
		) {

		this.domUtils = domUtils;
		this.router = router;
		this.zone = zone;

		this.applyStateToDomTimer = 0;
		this.currentPageState = Object.create( null );
		this.lastNavigationStartAt = 0;
		this.navigationIDs = [];
		this.pageStates = Object.create( null );
		this.pollCadence = options.pollCadence;
		this.pollDuration = options.pollDuration;
		this.scrolledElements = new Set();

		this.setupScrollBinding();
		this.setupRouterBinding();

		// Since we're going to be implementing a custom scroll retention algorithm,
		// let's disable the one that is provided by the browser. This will keep our
		// polyfill the source of truth.
		if ( window.history && window.history.scrollRestoration ) {

			window.history.scrollRestoration = "manual";

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I attempt to apply the given page-state to the rendered DOM. I will continue to
	// poll the document until all states have been reinstated; or, until the poll
	// duration has been exceeded; or, until a subsequent navigation takes place.
	private applyPageStateToDom( pageState: PageState ) : void {

		// For sake of the demo.
		console.group( "Attempting to Reapply Page State In PopState Navigation" );
		console.log( JSON.stringify( pageState, null, 4 ) );
		console.groupEnd();

		if ( this.objectIsEmpty( pageState ) ) {

			return;

		}

		// Let's create a copy of the page state so that we can safely delete keys from
		// it as we successfully apply them to the rendered DOM.
		var pendingPageState = { ...pageState };

		// Setup the scroll retention timer outside of the Angular Zone so that it
		// doesn't trigger any additional change-detection digests.
		this.zone.runOutsideAngular(
			() : void => {

				var startedAt = Date.now();

				this.applyStateToDomTimer = window.setInterval(
					() => {

						for ( var selector in pendingPageState ) {

							var target = this.domUtils.select( selector );

							// If the target element doesn't exist in the DOM yet, it
							// could be an indication of asynchronous loading and
							// rendering. Move onto the next selector while we still
							// have time.
							if ( ! target ) {

								continue;

							}

							// If the element in question has been scrolled (by the user)
							// while we're attempting to reinstate the previous scroll
							// offsets, then ignore this state - the user's action should
							// take precedence.
							if ( this.scrolledElements.has( target ) ) {

								delete( pendingPageState[ selector ] );

							// Otherwise, let's try to restore the scroll for the target.
							} else {

								var scrollTop = pendingPageState[ selector ];
								var resultantScrollTop = this.domUtils.scrollTo( target, scrollTop );

								// If the attempt to restore the element to its previous
								// offset resulted in a match, then stop tracking this
								// element. Otherwise, we'll continue to try and scroll
								// it in the subsequent tick.
								// --
								// NOTE: We continue to try and update it because the
								// target element may exist in the DOM but also be
								// loading asynchronous data that is required for the
								// previous scroll offset.
								if ( resultantScrollTop === scrollTop ) {

									delete( pendingPageState[ selector ] );

								}
								
							}

						}

						// If there are no more elements to scroll or, we've exceeded our
						// poll duration, then stop watching the DOM.
						if (
							this.objectIsEmpty( pendingPageState ) ||
							( ( Date.now() - startedAt ) >= this.pollDuration )
							) {

							clearTimeout( this.applyStateToDomTimer );

							// For sake of the demo.
							if ( this.objectIsEmpty( pendingPageState ) ) {

								console.log( "Successfully reapplied scroll offsets to DOM." );

							}

						}

					},
					this.pollCadence
				);			

			}
		);

	}


	// I get the page state from the given set of nodes. This extracts the CSS selectors
	// and offsets from the recorded elements.
	private getPageStateFromNodes( nodes: Set<Target> ) : PageState {

		var pageState: PageState = Object.create( null );

		nodes.forEach(
			( target: Target ) => {

				// Generate a CSS selector from the given target.
				// --
				// TODO: Right now, this algorithm creates the selector by walking up the
				// DOM tree and using the simulated encapsulation attributes. But, it
				// would be cool to have a configuration option that tells this algorithm
				// to look for a specific id-prefix or attribute or something. This would
				// require the developer to provide those; but it would be optimal.
				var selector = this.domUtils.getSelector( target );

				// If the given Target is no longer part of the active DOM, the selector
				// will be null.
				if ( selector ) {

					pageState[ selector ] = this.domUtils.getScrollTop( target );

				}

			}
		);

		return( pageState );

	}


	// I determine if the given object is empty (ie, has no keys).
	private objectIsEmpty( object: Object ) : boolean {

		for ( var key in object ) {

			return( false );

		}

		return( true );

	}


	// I bind to the router events and perform to primary actions:
	// --
	// NAVIGATION START: When the user is about to navigate away from the current view,
	// I inspect the current DOM state and commit any scrolled-element offsets to the
	// in-memory cache of the page state (scroll events were recorded during the lifetime
	// of the current router state).
	// --
	// NAVIGATION END: When the user completes a navigation to a new view, I check to see
	// if the new view is really the restoration of a previously cached page state; and,
	// if so, I try to reinstate the old scrolled-element offsets in the rendered DOM.
	private setupRouterBinding() : void {

		// We need to keep track of these values across the Start / End events.
		var navigationID: number;
		var restoredNavigationID: number | null;

		// The goal of the NavigationStart event is to take changes that have been made
		// to the current DOM and store them in the render-state tree so they can be
		// reinstated at a future date.
		var handleNavigationStart = ( event: NavigationStart ) : void => {

			this.lastNavigationStartAt = Date.now();

			// Get the navigation ID and the restored navigation ID for use in the
			// NavigationEnd event handler.
			navigationID = event.id;
			restoredNavigationID = ( event.restoredState )
				? event.restoredState.navigationId
				: null
			;

			// If the user is navigating away from the current view, kill any timers that
			// may be trying to reinstate a page-state.
			clearTimeout( this.applyStateToDomTimer );

			// Before we navigate away from the current page state, let's commit any
			// scroll-elements to the current page state.
			Object.assign(
				this.currentPageState,
				this.getPageStateFromNodes( this.scrolledElements )
			);

			this.scrolledElements.clear();

			// For sake of the demo.
			console.group( "Recorded scroll offsets" );
			for ( var selector in this.currentPageState ) {

				console.log( selector, ":", this.currentPageState[ selector ] );

			}
			console.groupEnd();

		};

		// The primary goal of the NavigationEnd event is to reinstate a cached page
		// state in the event that the navigation is restoring a previously rendered page
		// as the result of a popstate event (ex, the user hit the Back or Forward
		// buttons).
		var handleNavigationEnd = () : void => {

			var previousPageState = this.currentPageState;

			// Now that we know the navigation was successful, let's start and store a
			// new page state to track future scrolling.
			this.currentPageState = this.pageStates[ navigationID ] = Object.create( null );

			// While we are going to track elements that will be scrolled during the
			// current page rendering, it is possible that there are elements that were
			// scrolled during a prior page rendering that still exist on the page, but
			// were not scrolled recently (such as a secondary router-outlet). As such,
			// let's look at the previous page state and "pull forward" any state that
			// still pertains to the current page.
			if ( ! restoredNavigationID ) {

				for ( var selector in previousPageState ) {

					var target = this.domUtils.select( selector );

					// Only pull the selector forward if it corresponds to an element
					// that still exists in the rendered page.
					if ( ! target ) {

						continue;

					}

					// Only pull the selector forward if the target is still at the same
					// offset after the navigation has taken place. In other words, if
					// the offset has somehow changed in between the NavigationStart and
					// NavigationEnd events, then ignore it. To be honest, this really
					// only applies to the WINDOW, which can change in offset due to the
					// change in what the Router is actively rendering in the DOM.
					if ( this.domUtils.getScrollTop( target ) !== previousPageState[ selector ] ) {

						continue;

					}

					this.currentPageState[ selector ] = previousPageState[ selector ];

					// For sake of the demo.
					console.group( "Pulling Scroll Offset Forward from Previous State" );
					console.log( "selector:", selector );
					console.log( "offset:", this.currentPageState[ selector ] );
					console.groupEnd();

				}						

			// If we're restoring a previous page state AND we have that previous page
			// state cached in-memory, let's copy the previous state and then restore the
			// offsets in the DOM.
			} else if ( restoredNavigationID && this.pageStates[ restoredNavigationID ] ) {

				// NOTE: We're copying the offsets from the restored state into the
				// current state instead of just swapping the references because these
				// navigations are different in the Router history. Since each navigation
				// - imperative or popstate - gets a unique ID, we never truly "go back"
				// in history; the Router only "goes forward", with the notion that we're
				// recreating a previous state sometimes.
				this.applyPageStateToDom(
					Object.assign(
						this.currentPageState,
						this.pageStates[ restoredNavigationID ]
					)
				);

			}

			// Keep track of the navigation event so we can limit the size of our
			// in-memory page state cache.
			this.navigationIDs.push( navigationID );

			// Trim the oldest page states as we go so that the in-memory cache doesn't
			// grow, unbounded.
			while ( this.navigationIDs.length > 20 ) {

				delete( this.pageStates[ this.navigationIDs.shift() as number ] );

			}

		};

		// Filter navigation event streams to the appropriate event handlers.
		this.router.events.subscribe(
			( event: NavigationEvent ) : void => {

				if ( event instanceof NavigationStart ) {

					handleNavigationStart( event );

				} else if ( event instanceof NavigationEnd ) {

					handleNavigationEnd();

				}

			}
		);

	}


	// I bind to the scroll event and keep track of any elements that are scrolled in the
	// rendered document.
	private setupScrollBinding() : void {

		// Add scroll-binding outside of the Angular Zone so it doesn't trigger any
		// additional change-detection digests.
		this.zone.runOutsideAngular(
			() : void => {

				// When navigating, the browser emits some scroll events as the DOM 
				// (Document Object Model) changes shape in a way that forces the various
				// scroll offsets to change. Since these scroll events are not indicative
				// of a user's actual scrolling intent, we're going to ignore them. This
				// needs to be done on both sides of the navigation event (for reasons
				// that are not fully obvious or logical -- basically, the window's
				// scroll changes at a time that is not easy to tap into). Ignoring these
				// scroll events is important because the polyfilly stops trying to
				// reinstate a scroll-offset if it sees that the given element has
				// already been scrolled during the current rendering.
				var scrollBufferWindow = 100;
				var target: Target | null;

				window.addEventListener(
					"scroll",
					( event: Event ) : void => {

						// If the scroll event happens immediately following a
						// navigation event, then ignore it - it is likely a scroll that
						// was forced by the browser's native behavior.
						if ( ( Date.now() - this.lastNavigationStartAt ) < scrollBufferWindow ) {

							return;

						}

						// The target will return NULL for elements that have irrelevant
						// scroll behaviors (like textarea inputs). As such, we have to
						// check to see if the domUtils returned anything.
						if ( target = this.domUtils.getTargetFromScrollEvent( event ) ) {

							this.scrolledElements.add( target );

						}

					},
					// We have to use the CAPTURING phase. Scroll events DO NOT BUBBLE.
					// As such, if we want to listen for all scroll events in the 
					// document, we have to use the capturing phase (as the event travels
					// down through the DOM tree).
					true
				);

			}
		);

	}

}

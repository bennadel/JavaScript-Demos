
// Import the core angular services.
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { InjectionToken } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { NavigationStart } from "@angular/router";
import { NgZone } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { DomUtils } from "./dom-utils";
import { Target } from "./dom-utils";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* The algorithm in this polyfill works based on the order-of-operations of different
* kinds of navigation events. When a navigation is initiated by the application itself,
* such as with a [routerLink] click or a .navigate() method call, the operations are as
* follows:
* 
* - NavigationStart
* - PushState <--- ( monkey-patched by this polyfill )
* - NavigationEnd
*
* And, if the navigation is initiated by the browser, such as through the Back button or
* a direct change to the URL, the operations are as follows:
* 
* - PopState
* - NavigationStart
* - NavigationEnd
* 
* As such, we can know which kind of navigation is happening (PushState vs. PopState) by
* the time we get to the NavigationStart event handler (PopState can be flagged).
* 
* This algorithm monkey-patches the history.pushState() method in order to TRY and keep
* track of a state / history ID that can be mapped back to a render state. This helps 
* reinstate views after the Back and Forward buttons have been pressed. But, it doesn't
* seem to work all that well. Though, it's possible that's just my relatively shallow 
* understanding of how PopState works.
* 
, CAUTION: We are monkey-patching the history.pushState() method and assuming that it is
* ALWAYS RECEIVING NULL FROM THE ANGULAR APPLICATION. This is likely to change in the 
* future, which means this is a fairly brittle polyfill.
*/

export var OPTIONS_TOKEN = new InjectionToken<Options>( "RetainScrollPolyfillService.Options" );

export interface Options {
	pollDuration: number;
	pollCadence: number;
}

interface RenderStates {
	[ key: string ]: Page;
}

interface Page {
	url: string;
	pageStates: PageState[];
}

interface PageState {
	historyID: string;
	elementStates: ElementStates;
}

interface ElementStates {
	[ key: string ]: ElementState;
}

interface ElementState {
	selector: string;
	scrollTop: number;
}

@Injectable()
export class RetainScrollPolyfillService {

	private applyStateToDomTimer: number;
	private currentHistoryID: string;
	private domUtils: DomUtils;
	private historyCounter: number;
	private lastNavigationStartAt: number;
	private pendingElements: Set<Target>;
	private pendingElementsTimer: number;
	private pollCadence: number;
	private pollDuration: number;
	private poppedHistoryID: string;
	private previousPageState: PageState;
	private renderStates: RenderStates;
	private router: Router;
	private scrolledElements: Map<Target, number>;
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

		// This algorithm works by monkey-patching the .pushState() method. So, if
		// pushState isn't supported, then there's really no reason to proceed with this
		// portion of the polyfill (the router-outlet co-opting can still operate).
		if ( ! this.supportsPushState() ) {

			return;

		}

		this.applyStateToDomTimer = 0;
		this.historyCounter = 0;
		this.lastNavigationStartAt = 0;
		this.pendingElements = new Set();
		this.pendingElementsTimer = 0;
		this.pollCadence = options.pollCadence;
		this.pollDuration = options.pollDuration;
		this.poppedHistoryID = null;
		this.previousPageState = null;
		this.renderStates = Object.create( null );
		this.scrolledElements = new Map();
		
		this.currentHistoryID = this.getNextHistoryID();

		this.setupPushStateMonkeyPatch();
		this.setupScrollBinding();
		this.setupPopstateBinding();
		this.setupRouterBinding();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I attempt to apply the given page-state to the active DOM. I will continue to poll
	// the document until all states have been reinstated; or, until the poll duration
	// has been exceeded; or, until a subsequent navigation has taken place.
	private applyPageStateToDom( pageState: PageState ) : void {

		// The element state are stored as object keys based on selectors. In order to
		// make this set easier to deal with, let's convert the hash to an array.
		var elementStates = Object.keys( pageState.elementStates ).map(
			( selector: string ) : ElementState => {

				return( pageState.elementStates[ selector ] );

			}
		);

		if ( ! elementStates.length ) {

			return;

		}

		console.group( "Attempting to Reapply Page State In PopState Navigation" );
		console.log( JSON.stringify( elementStates, null, 4 ) );
		console.groupEnd();

		// Setup the scroll retention timer outside of the Angular Zone so that it 
		// doesn't trigger any additional change-detection digests.
		this.zone.runOutsideAngular(
			() : void => {

				var startedAt = Date.now();

				this.applyStateToDomTimer = setInterval(
					() => {

						// NOTE: We're looping backwards over this collection so that we
						// can safely .splice() states out of it, mid-iteration, if the
						// state has been successfully applied.
						for ( var i = ( elementStates.length - 1 ) ; i >= 0 ; i-- ) {

							var elementState = elementStates[ i ];
							var target = this.domUtils.select( elementState.selector );

							if ( target ) {

								// If the element in question has been scrolled (by the
								// user) while we're attempting to reinstate the previous
								// scroll offsets, then ignore this state - the user's
								// action should take precedence.
								if ( this.scrolledElements.has( target ) ) {

									elementStates.splice( i, 1 );

								} else {

									var resultantScrollTop = this.domUtils.scrollTo( target, elementState.scrollTop );

									// If the attempt to restore the element to its 
									// previous offset resulted in a match, then stop
									// tracking this element. Otherwise, we'll continue
									// to try and scroll it in the subsequent tick.
									// --
									// NOTE: We continue to try and update it because the
									// target element may be loading asynchronous data
									// that is required for the previous scroll offset.
									if ( resultantScrollTop === elementState.scrollTop ) {

										elementStates.splice( i, 1 );

									}
									
								}

							}

						}

						// If there are no more elements to scroll; or, we've exceeded
						// our poll duration, then stop watching the DOM.
						if ( ! elementStates.length || ( ( Date.now() - startedAt ) >= this.pollDuration ) ) {

							clearTimeout( this.applyStateToDomTimer );

						}

					},
					this.pollCadence
				);			

			}
		);

	}


	// I commit the pending elements to the scrolled elements collection.
	private commitPendingElements() : void {

		this.pendingElements.forEach(
			( target: Target ) => {

				this.scrolledElements.set( target, this.domUtils.getScrollTop( target ) );

			}
		);

		this.pendingElements.clear();

	}


	// I get the page-state associated with the given history ID. Or, if it doesn't 
	// exist, I created it, add it to the render-state, and return it.
	private ensurePageState( historyID: string, useMostRecentAsDefault: boolean = false ) : PageState {

		var renderedUrl = this.router.url;

		// Ensure that the current URL is being tracked by the render-state.
		if ( ! this.renderStates[ renderedUrl ] ) {

			this.renderStates[ renderedUrl ] = {
				url: renderedUrl,
				pageStates: []
			};

		}

		var pageStates = this.renderStates[ renderedUrl ].pageStates;

		// If we already have a page-state associated with the given ID, return it.
		// --
		// NOTE: We're starting at the front of the collection since the newest items
		// are being unshifted onto the collection (ie, the most recent page states are
		// at the start of the collection). This is where the user is most likely to be
		// performing navigations.
		for ( var pageState of pageStates ) {

			if ( pageState.historyID === historyID ) {

				return( pageState );

			}

		}

		// If we've made it this far, there is no page-state associated with the given
		// ID. As such, we'll need to create one.
		var pageState: PageState = {
			historyID: historyID,
			elementStates: Object.create( null )
		};

		// Under certain circumstances, when we're creating a new page-state, we want to
		// use the most recent page-state (at the same URL) as the basis for the new 
		// page-state. This would make sense if we popped the history and did not receive
		// a known history ID. In that case, we would want to model the page on a best
		// guess of what the page may have looked like. To be clear, this is a janky step
		// trying to make up for a janky history behavior.
		if ( useMostRecentAsDefault && pageStates.length ) {

			console.warn( "No PageState associated with popState - using recent values as fallback." );
			Object.assign( pageState.elementStates, pageStates[ 0 ].elementStates );

		}

		pageStates.unshift( pageState );

		// Theoretically, the stored page states will grown in an unbounded fashion if 
		// the application is kept open indefinitely; so, let's just keep each page under
		// a length limit.
		if ( pageStates.length > 15 ) {

			pageStates.pop();

		}

		return( pageState );

	}


	// I get the element-states from the given set of nodes.
	private getElementStatesFromNodes( nodes: Map<Target, number> ) : ElementStates {

		var elementStates: ElementStates = Object.create( null );

		nodes.forEach(
			( scrollTop: number, target: Target ) => {

				var selector = this.domUtils.getSelector( target );

				elementStates[ selector ] = { selector, scrollTop };

			}
		);

		return( elementStates );

	}


	// I generate the next unique history state ID.
	private getNextHistoryID() : string {

		return( `retain-scroll-${ ++this.historyCounter }-${ Date.now() }` );

	}


	// I bind to the popstate event, which is triggered whenever the browser initiates
	// a change in the view state (such as through the Back or Forward buttons).
	private setupPopstateBinding() : void {

		// Setup the popstate binding outside of the Angular Zone so it doesn't trigger 
		// any additional change-detection digests.
		this.zone.runOutsideAngular(
			() : void => {

				window.addEventListener(
					"popstate",
					( event: PopStateEvent ) : void => {

						// CAUTION: The history object seems to be somewhat janky for me
						// (or, maybe I'm just not smart enough to figure it out). That 
						// said, it seems that using a combination of Back and Forwards 
						// operations quickly creates a scenario in which the history 
						// object stops reporting the correct (any) state object. As 
						// such, there are many times in which a popstate will not result
						// in an accessible "history ID", even though we've monkey-patched
						// the .pushState() method. In such cases, we'll just use a newly-
						// generated ID, which will cause a new state object to be created
						// by the navigation handler.
						// --
						// NOTE: We are storing the "popped" ID as a separate value from 
						// the "current" ID so that we have time to save the current state 
						// of the DOM (associated with the "current" ID) before the 
						// navigation starts.
						try {

							this.poppedHistoryID = event.state.id;

						} catch ( error ) {

							this.poppedHistoryID = this.getNextHistoryID();

						}

					}
				);

			}
		);

	}


	// I override the native .pushState() method, ensuring that an unique ID is 
	// associated with each view state.
	// --
	// CAUTION: This assumes that Angular never provides a non-null "state" which, at
	// the time of this writing, appears to be true. However, it is a dicey assumption
	// that is likely to change in the future.
	private setupPushStateMonkeyPatch() : void {

		var corePushState = window.history.pushState;

		// Monkey-patch pushState() outside of the Angular Zone so it doesn't trigger any
		// additional change-detection digests.
		this.zone.runOutsideAngular(
			() : void => {

				window.history.pushState = ( state: any, title: string, url: string ) : void  => {

					console.warn( "Intercepting .pushState()" );
					// The unique ID pushed into each state will become associated with 
					// any changes made the document's scroll offsets before the next 
					// navigation is initiated.
					corePushState.call(
						window.history,
						{
							id: ( this.currentHistoryID = this.getNextHistoryID() ),
							originalState: state
						},
						title,
						url
					);

				};

			}
		);

	}


	// I bind to the router events and perform to primary actions:
	// 
	// - Save the current page-state whenever navigating away from the current view.
	// - Reinstate an old page-state whenever navigating to an old view.
	private setupRouterBinding() : void {

		this.router.events.subscribe(
			( event: NavigationEvent ) : void => {

				// The goal of the NavigationStart event is to take changes that have
				// been made to the current DOM and store them in the render-state 
				// tree so they can be reinstated at a future date.
				if ( event instanceof NavigationStart ) {

					this.lastNavigationStartAt = Date.now();

					// If the user is navigating away from the current view, kill any
					// timers that may be trying to reinstate a page-state or keep track
					// of any pending scrolling.
					clearTimeout( this.applyStateToDomTimer );
					clearTimeout( this.pendingElementsTimer );
					this.pendingElements.clear();

					var currentPageState = this.ensurePageState( this.currentHistoryID );

					// If any elements have been scrolled while the view was rendered, 
					// add them to the current page-state.
					if ( this.scrolledElements.size ) {

						Object.assign(
							currentPageState.elementStates,
							this.getElementStatesFromNodes( this.scrolledElements )
						);
						
						this.scrolledElements.clear();

					}

					// While we track elements that have been scrolled during the current
					// page rendering, it is likely that there are elements that were 
					// scrolled during a prior page rendering (and still have a non-zero
					// scroll offset, such a secondary router outlet). We want to 
					// propagate those values with the current page state so that a use 
					// of the Back button (for example) will reinstate those elements in
					// addition to the ones directly affected during the current page
					// rendering.
					// --
					// NOTE: We only want to do this as the user moves forward in time; 
					// not if the user is jumping to a previous point in history.
					if ( this.previousPageState && ! this.poppedHistoryID ) {

						for ( var selector in this.previousPageState.elementStates ) {

							// We only care about selectors that are missing from the
							// current page-state. If the selector exists, it means that
							// the current page-state has the more up-to-date element 
							// state.
							if ( currentPageState.elementStates[ selector ] ) {

								continue;

							}

							var target = this.domUtils.select( selector )

							// We only care about the selectors that match elements that
							// are still rendered on the page. A non-rendered element 
							// won't be relevant for a future popstate navigation.
							if ( ! target ) {

								continue;

							}

							// We only care about targeted elements that are still at the
							// same scroll offset as the previous state. If the offsets 
							// don't match, then it's likely that the currently rendered
							// page is not compatible with the previous state. This can
							// happen if you navigate through a page that doesn't have
							// sufficient content to create scrolling (usually on the 
							// window object).
							if ( this.domUtils.getScrollTop( target ) !== this.previousPageState.elementStates[ selector ].scrollTop ) {

								continue;

							}

							console.group( "Pulling Scroll Offset Forward from Previous State" );
							console.log( selector );
							console.log( this.previousPageState.elementStates[ selector ].scrollTop );
							console.groupEnd();

							currentPageState.elementStates[ selector ] = {
								selector: selector,
								scrollTop: this.previousPageState.elementStates[ selector ].scrollTop
							};

						}

					}

					this.previousPageState = currentPageState;

				// The goal of the NavigationEnd event is to reinstate a page-state in
				// the event that the page is being rendered as the result of a popstate
				// event (ex, the user hit the Back or Forward buttons).
				} else if ( event instanceof NavigationEnd ) {

					if ( this.poppedHistoryID ) {

						this.currentHistoryID = this.poppedHistoryID;
						this.poppedHistoryID = null;

						// Get the old page-state associated with the popped history ID.
						// --
						// NOTE: This will create a page-state if none has yet been 
						// associated with the given ID.
						var currentPageState = this.ensurePageState( this.currentHistoryID, true );

						this.applyPageStateToDom( currentPageState );

					}

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
				// of a user's intent, we're going to ignore them. This needs to be done
				// on both sides of the navigation event (for reasons that are not fully
				// obvious or logical -- basically, the window's scroll changes at a time
				// that is not easy to tap into).
				var scrollBufferWindow = 100;

				window.addEventListener(
					"scroll",
					( event: Event ) : void => {

						// If the scroll event happens immediately following a 
						// navigation, then ignore it - it is likely a scroll that was 
						// forced by the browser's native behavior.
						if ( ( Date.now() - this.lastNavigationStartAt ) < scrollBufferWindow ) {

							return;

						}

						var target = this.domUtils.getTargetFromScrollEvent( event );

						// If the scrolled element is one of the elements that we want to
						// keep track of (it will be null otherwise), let's put it in a 
						// pending elements set. This way, we can debounce the reading of
						// the scroll offset.
						if ( target ) {

							this.pendingElements.add( target );

							// CAUTION: We are actively trying to inspect the scroll
							// offset while the user is interacting with the page, as 
							// opposed to just inspecting the element at the start of
							// the next navigation, because the browser's native 
							// behaviors make this hard to do. By eagerly storing the
							// scroll offset, we don't have to worry about the complex
							// and confusing interaction of the page state, browser
							// behavior, and navigation events.
							clearTimeout( this.pendingElementsTimer );
							this.pendingElementsTimer = setTimeout(
								() => {

									this.commitPendingElements();

								},
								scrollBufferWindow
							);

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


	// I determine if the current browser supports pushState.
	private supportsPushState() : boolean {

		return( !! ( window && window.history && window.history.pushState ) );

	}

}

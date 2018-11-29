
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ViewportScroller } from "@angular/common";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "a[routerLink][fragment]",
	inputs: [ "fragment" ],
	host: {
		"(click)": "handleClick( $event )"
	}
})
export class FragmentPolyfillDirective implements OnInit, OnDestroy {

	public fragment: string;

	private clickEvent: any;
	private elementRef: ElementRef;
	private eventsSubscription: Subscription;
	private router: Router;
	private viewportScroller: ViewportScroller;

	// I initialize the fragment polyfill directive.
	constructor(
		elementRef: ElementRef,
		router: Router,
		viewportScroller: ViewportScroller
		) {

		this.elementRef = elementRef;
		this.router = router;
		this.viewportScroller = viewportScroller;

		this.clickEvent = null;
		this.fragment = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the click on the router-link.
	public handleClick( event: any ) : void {

		// If there is no fragment associated with this routerLink, just ignore click.
		if ( ! this.fragment ) {

			return;

		}

		// Because Angular 6+ has basic fragment support already, the goal of this
		// polyfill is only to augment the existing support with 2nd-click functionality.
		// That is, to scroll the user to the target element even if the click doesn't
		// result in a navigational change. In order to do this, we have to track two
		// different facets of the click-event life-cycle:
		// --
		// One - We have to make sure the click event has its default behavior prevented.
		// This will indicate that the core routerLink directive (on this same element)
		// has intercepted the click and is intending to hijack the normal behavior.
		// --
		// Two - We have to make sure that the click event has not resulted in a Router
		// navigation. This will indicate that the URL has not changed, which is exactly
		// the edge-case that we need to polyfill.
		// --
		// These sound basic; but, are actually somewhat difficult to do at this same
		// level of the DOM. As such, we're going to keep track of the click event and
		// then inspect once again when the click bubbles up one level in the DOM tree.
		this.clickEvent = event;

	}


	// I handle the click of the router-link one level-up in the DOM tree.
	public handleClickAtParentLevel = () : void => {

		// At this point, if the event is still being tracked (ie, no Router navigation
		// has been detected) and the event's default behavior is being prevented (ie, 
		// the native Router link is hijacking the user experience), then we know we have
		// the edge-case we need to polyfill.
		if ( this.clickEvent && this.clickEvent.defaultPrevented ) {

			console.warn( "Using fragment polyfill." );
			this.clickEvent = null;
			this.viewportScroller.scrollToAnchor( this.fragment );

		}

	}


	// I get called when the directive is being unmounted.
	public ngOnDestroy() : void {

		// Only clean-up if the destroy is called after the init.
		if ( this.eventsSubscription ) {

			this.eventsSubscription.unsubscribe();
			this.elementRef.nativeElement.parentNode.removeEventListener( "click", this.handleClickAtParentLevel, false );
			this.clickEvent = null;

		}

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// This polyfill works by tracking the Router Link event as it bubbles-up in the
		// DOM tree (one level). However, we only want to polyfill the edge-case in which
		// a click does NOT RESULT IN A NAVIGATION change (as that will be handled by the
		// Router itself). As such, we want to stop tracking the click-event whenever we
		// observe any of the navigation events.
		// --
		// NOTE: This approach works because all of the Navigation events (other than
		// NavigationStart) are triggered AFTER the local click event-handlers, but
		// BEFORE THE EVENT BUBBLES UP to the next level of the DOM tree (where our
		// secondary event-handler will be waiting).
		this.eventsSubscription = this.router.events.subscribe(
			() => {
				
				this.clickEvent = null;

			}
		);

		// Start listening for the click event one level up in the DOM.
		this.elementRef.nativeElement.parentNode.addEventListener( "click", this.handleClickAtParentLevel, false );

	}

}

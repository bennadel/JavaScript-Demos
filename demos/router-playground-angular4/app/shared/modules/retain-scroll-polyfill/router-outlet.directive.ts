
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { Router } from "@angular/router";
import { RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

// Import the application components and services.
import { DomUtils } from "./dom-utils";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I co-opt the <router-outlet> element selector so that I can tap into the life-cycle
// of the core RouterOutlet directive.
@Directive({
	selector: "router-outlet"
})
export class RouterOutletDirective {

	private activateEventsSubscription: Subscription;
	private deactivateEventsSubscription: Subscription;
	private domUtils: DomUtils;
	private elementRef: ElementRef;
	private offsets: number[];
	private router: Router;
	private routerEventsSubscription: Subscription;
	private routerOutlet: RouterOutlet;

	// I initialize the router-outlet directive.
	constructor(
		domUtils: DomUtils,
		elementRef: ElementRef,
		router: Router,
		routerOutlet: RouterOutlet
		) {

		this.domUtils = domUtils;
		this.elementRef = elementRef;
		this.router = router;
		this.routerOutlet = routerOutlet;

		this.activateEventsSubscription = null;
		this.deactivateEventsSubscription = null;
		this.offsets = [];
		this.routerEventsSubscription = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when the directive is being destroyed.
	public ngOnDestroy() : void {

		( this.activateEventsSubscription ) && this.activateEventsSubscription.unsubscribe();
		( this.deactivateEventsSubscription ) && this.deactivateEventsSubscription.unsubscribe();
		( this.routerEventsSubscription ) && this.routerEventsSubscription.unsubscribe();
	
	}


	// I get called once after the directive's inputs have been initialized.
	public ngOnInit() : void {

		// In order to help with natural scroll behavior, we have to listen for the
		// creation and destruction of router View component.s		
		this.activateEventsSubscription = this.routerOutlet.activateEvents.subscribe(
			( event: any ) : void => {

				this.handleActivateEvent();

			}
		);
		this.deactivateEventsSubscription = this.routerOutlet.deactivateEvents.subscribe(
			( event: any ) : void => {

				this.handleDectivateEvent();

			}
		);

		// In order to make sure the offsets don't get applied inappropriately in the
		// future, we have to listen for navigation events.
		this.routerEventsSubscription = this.router.events.subscribe(
			( event: NavigationEvent ) : void => {

				this.handleNavigationEvent( event );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I get called when a new router View component is being rendered.
	private handleActivateEvent() : void {

		if ( ! this.offsets.length ) {

			return;

		}

		console.group( "Ensuring Ancestral Scroll Offsets in New Navigation" );
		console.log( this.offsets.slice() );
		console.groupEnd();

		// At this point, the View-in-question has been mounted in the DOM (Document
		// Object Model). We can now walk back up the DOM and make sure that the
		// previously-recorded offsets (in the last "deactivate" event) are being applied
		// to the ancestral elements. This will prevent the browser's native desire to 
		// auto-scroll-down a document once the view has been injected. Essentially, this
		// ensures that we scroll back to the "expected top" as the user clicks through
		// the application.
		var node = this.elementRef.nativeElement.parentNode;

		while ( node ) {

			// If this is an ELEMENT node, set its offset.
			if ( node.nodeType === 1 ) {

				this.domUtils.scrollTo( node, this.offsets.shift() );

			}

			node = node.parentNode;

		}

		// At the top, we'll always set the window's scroll.
		this.domUtils.scrollTo( window, this.offsets.shift() );

	}


	// I get called when an existing router View component is being unmounted.
	private handleDectivateEvent() : void {

		// At this point, the View-in-question has already been removed from the 
		// document. Let's walk up the DOM (Document Object Model) and record the scroll
		// position of all scrollable elements. This will give us a sense of what the DOM
		// should look like after the next View is injected.
		var node = this.elementRef.nativeElement.parentNode;

		while ( node ) {

			// If this is an ELEMENT node, capture its offset.
			if ( node.nodeType === 1 ) {

				this.offsets.push( this.domUtils.getScrollTop( node ) );
				
			}

			node = node.parentNode;

		}

		// At the top, we'll always record the window's scroll.
		this.offsets.push( this.domUtils.getScrollTop( window ) );

	}


	// I get called whenever a router event is raised.
	private handleNavigationEvent( event: NavigationEvent ) : void {

		// The "offsets" are only meant to be used across a single navigation. As such,
		// let's clear out the offsets at the end of each navigation in order to ensure
		// that old offsets don't accidentally get applied to a future view mounted by
		// the current router-outlet.
		if ( event instanceof NavigationEnd ) {

			this.offsets.splice( 0, this.offsets.length );

		}

	}

}

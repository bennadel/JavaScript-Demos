
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NgZone } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: Not all browsers support "passive" event bindings. This can be done more
// gracefully with some feature-checks. But, for the sake of simplicity (since a
// scrolling demo is already quite complex), I'm only going to support browsers that
// support passive event bindings.
var PASSIVE = {
	passive: true
};

@Component({
	selector: "app-slack-scroller",
	queries: {
		contentRef: new ViewChild( "contentRef" ),
		scrollbarRef: new ViewChild( "scrollbarRef" ),
		scrollbarThumbRef: new ViewChild( "scrollbarThumbRef" ),
		viewportRef: new ViewChild( "viewportRef" )
	},
	styleUrls: [ "./slack-scroller.component.less" ],
	templateUrl: "./slack-scroller.component.html"
})
export class SlackScrollerComponent {

	// DOM-Reference / view-child queries (to be injected by Angular).
	public contentRef!: ElementRef;
	public scrollbarRef!: ElementRef;
	public scrollbarThumbRef!: ElementRef;
	public viewportRef!: ElementRef;

	private contentHeight: number;
	private draggingStateViewportBottom: number;
	private draggingStateViewportHeight: number;
	private draggingStateViewportTop: number;
	private hostRef: ElementRef;
	private scrollbarHeight: number;
	private scrollbarThumbHeight: number;
	private scrollHeight: number;
	private scrollPercentage: number;
	private scrollTop: number;
	private viewportHeight: number;
	private zone: NgZone;


	// I initialize the slack-scroller component.
	constructor(
		elementRef: ElementRef,
		zone: NgZone
		) {

		this.hostRef = elementRef;
		this.zone = zone;

		this.contentHeight = 0;
		this.draggingStateViewportBottom = 0;
		this.draggingStateViewportHeight = 0;
		this.draggingStateViewportTop = 0;
		this.scrollbarHeight = 0;
		this.scrollbarThumbHeight = 0;
		this.scrollHeight = 0;
		this.scrollPercentage = 0;
		this.scrollTop = 0;
		this.viewportHeight = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the view and its contents have been initialized.
	public ngAfterViewInit() : void {

		// After the view is initialized, we want to update the content-wrapper to be the
		// same size as the host element so that the scrollbar for the viewport (which is
		// hidden from view) doesn't affect the width of the projected-content.
		this.contentRef.nativeElement.style.width = `${ this.hostRef.nativeElement.clientWidth }px`;

		// Transition to our initial, passive state to listen from scrolling.
		this.passiveStateSetup();

	}


	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		// I don't know what state we're in, so just destroy "all the things!"
		this.passiveStateTeardown();
		this.pagingStateTeardown();
		this.draggingStateTeardown();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I calculate and store the scroll state of the content within the viewport. These
	// values are then used in subsequent calculations.
	// --
	// CAUTION: This method gets CALLED A LOT - it's execution needs to be super fast!
	private calculateViewportScrollPercentage() : void {

		// Get short-hand references to the native DOM elements.
		var viewportElement = this.viewportRef.nativeElement;

		if ( this.scrollHeight ) {

			this.scrollTop = viewportElement.scrollTop;
			this.scrollPercentage = ( this.scrollTop / this.scrollHeight );

		} else {

			this.scrollTop = 0;
			this.scrollPercentage = 0;

		}

	}


	// I return a value that is constrained by the given min and max values.
	private clamp( value: number, minValue: number, maxValue: number ) : number {

		return( Math.min( Math.max( value, minValue ), maxValue ) );

	}


	// I handle mousemove events for the dragging-state.
	// --
	// CAUTION: Using FAT-ARROW FUNCTION to generate bound instance method.
	private draggingStateHandleMousemove = ( event: MouseEvent ) : void => {

		// Get short-hand references to the native DOM elements.
		var viewportElement = this.viewportRef.nativeElement;

		// Calculate the location of the mouse within the smaller, "meaningful viewport"
		// that was determined at the beginning of the dragging-state. We'll need to then
		// take this smaller value and translate it onto the larger, true viewport.
		var clientY = this.clamp( event.clientY, this.draggingStateViewportTop, this.draggingStateViewportBottom );
		var localOffset = ( clientY - this.draggingStateViewportTop );
		var localOffsetPercentage = ( localOffset / this.draggingStateViewportHeight );

		// Scroll the viewport to the calculated location and then update the thumb to
		// match the viewport's state.
		viewportElement.scrollTop = ( localOffsetPercentage * this.scrollHeight );
		this.calculateViewportScrollPercentage();
		this.updateThumbPositionToMatchScrollPercentage();

	}


	// I handle mouseup events for the dragging-state.
	// --
	// CAUTION: Using FAT-ARROW FUNCTION to generate bound instance method.
	private draggingStateHandleMouseup = ( event: MouseEvent ) : void => {

		// Transition to the passive state.
		this.draggingStateTeardown();
		this.passiveStateSetup();
		
	}


	// I setup the dragging-state, initializing state values and binding all state-
	// specific event-handlers. The dragging-state moves the simulated scrollbar thumb
	// alongside the user's mouse, and then updates the viewport offset to match the
	// simulated scrollbar state.
	private draggingStateSetup( event: MouseEvent ) : void {

		// Get short-hand references to the native DOM elements.
		var viewportElement = this.viewportRef.nativeElement;
		var scrollbarElement = this.scrollbarRef.nativeElement;
		var scrollbarThumbElement = this.scrollbarThumbRef.nativeElement;

		// When the user clicks on the scrollbar-thumb, we need to use the mouse LOCATION
		// and the scrollbar-thumb SIZE to translate the viewport into a SLIGHTLY SMALLER
		// viewport. The reason for this is that we want the thumb's location to mirror
		// the location of the mouse. To do this, we're going to need to get the rendered
		// location of the viewport and the scrollbar thumb.
		var viewportRect = viewportElement.getBoundingClientRect();
		var scrollbarThumbRect = scrollbarThumbElement.getBoundingClientRect();

		// Figure out how the initial mouse location splits the thumb element in half.
		var initialY = event.clientY;
		var thumbLocalY = ( initialY - scrollbarThumbRect.top );

		// Now, reduce the "meaningful viewport" dimensions by the top-half and the
		// bottom-half of the thumb. This way, the viewport will be fully-scrolled when
		// the bottom of the thumb hits the bottom of scrollbar, even if the user's mouse
		// hasn't fully-reached the bottom of the viewport.
		this.draggingStateViewportTop = ( viewportRect.top + thumbLocalY );
		this.draggingStateViewportBottom = ( viewportRect.bottom - scrollbarThumbRect.height + thumbLocalY );
		this.draggingStateViewportHeight = ( this.draggingStateViewportBottom - this.draggingStateViewportTop );

		// Always show the scrollbar while dragging, even if the user's mouse leaves the
		// surface area of the viewport.
		scrollbarElement.classList.add( "scrollbar--dragging" );

		window.addEventListener( "mousemove", this.draggingStateHandleMousemove );
		window.addEventListener( "mouseup", this.draggingStateHandleMouseup );

	}


	// I teardown the dragging-state, removing all state-specific event-handlers.
	private draggingStateTeardown() : void {

		// Get short-hand references to the native DOM elements.
		var scrollbarElement = this.scrollbarRef.nativeElement;

		scrollbarElement.classList.remove( "scrollbar--dragging" );

		window.removeEventListener( "mousemove", this.draggingStateHandleMousemove );
		window.removeEventListener( "mouseup", this.draggingStateHandleMouseup );

	}


	// I setup the paging-state, initializing state values and binding all state-
	// specific event-handlers. The paging-state adjusts the viewport scroll offset by
	// one page, either up or down, in the direction of the mouse.
	private pagingStateSetup( event: MouseEvent ) : void {

		// Get short-hand references to the native DOM elements.
		var viewportElement = this.viewportRef.nativeElement;
		var scrollbarElement = this.scrollbarRef.nativeElement;
		var scrollbarThumbElement = this.scrollbarThumbRef.nativeElement;

		// Get the viewport coordinates of the scrollbar thumb - we need to see if the
		// user clicked ABOVE the thumb or BELOW the thumb.
		var scrollbarThumbRect = scrollbarThumbElement.getBoundingClientRect();

		// Scroll content UP by ONE PAGE.
		if ( event.clientY < scrollbarThumbRect.top ) {

			viewportElement.scrollTop = Math.max( 0, ( this.scrollTop - this.viewportHeight ) );

		// Scroll content DOWN by ONE PAGE.
		} else {

			viewportElement.scrollTop = Math.min( this.scrollHeight, ( this.scrollTop + this.viewportHeight ) );

		}

		this.calculateViewportScrollPercentage();
		this.updateThumbPositionToMatchScrollPercentage();

		// Transition to the passive state.
		// --
		// TODO: In the future, we could set a timer to see if the user holds-down the
		// mouse button, at which point we could continue to page the viewport towards
		// the mouse cursor. However, for this exploration, we're going to stick to a
		// single paging per mouse event.
		this.pagingStateTeardown();
		this.passiveStateSetup();

	}


	// I teardown the paging-state, removing all state-specific event-handlers.
	private pagingStateTeardown() : void {

		// Nothing to teardown for this state.

	}


	// I handle mousedown events for the passive-state.
	// --
	// CAUTION: Using FAT-ARROW FUNCTION to generate bound instance method.
	private passiveStateHandleScrollbarMousedown = ( event: MouseEvent ) : void => {

		// Get short-hand references to the native DOM elements.
		var scrollbarThumbElement = this.scrollbarThumbRef.nativeElement;

		// In order to prevent the user's click-and-drag gesture from highlighting a
		// bunch of text on the page, we have to prevent the default behavior of the
		// mousedown event.
		event.preventDefault();

		if ( event.target === scrollbarThumbElement ) {

			// Transition to the dragging state (the user is going to drag the thumb to
			// adjust scroll-offset of the viewport).
			this.passiveStateTeardown();
			this.draggingStateSetup( event );

		} else {

			// Transition to the paging state (the user is going to adjust the scroll-
			// offset of the viewport by increments of the viewport height).
			this.passiveStateTeardown();
			this.pagingStateSetup( event );

		}

	}


	// I handle scroll events for the passive-state.
	// --
	// CAUTION: Using FAT-ARROW FUNCTION to generate bound instance method.
	private passiveStateHandleViewportScroll = ( event: MouseEvent ) : void => {

		this.calculateViewportScrollPercentage();
		this.updateThumbPositionToMatchScrollPercentage();

	}


	// I setup the passive-state, initializing state values and binding all state-
	// specific event-handlers. The passive-state primarily listens for scroll events on
	// the viewport and then updates the simulated scrollbar to match the location.
	private passiveStateSetup() : void {

		// Get short-hand references to the native DOM elements.
		var viewportElement = this.viewportRef.nativeElement;
		var scrollbarElement = this.scrollbarRef.nativeElement;
		var scrollbarThumbElement = this.scrollbarThumbRef.nativeElement;

		// For the sake of performance, we're going to calculate the dimensions of the
		// viewport and other elements once at the start of the passive state; and then,
		// only calculate scroll-percentages going forward (as we react to events).
		this.viewportHeight = viewportElement.clientHeight;
		this.contentHeight = viewportElement.scrollHeight;
		this.scrollHeight = ( this.contentHeight - this.viewportHeight );
		this.scrollbarHeight = scrollbarElement.clientHeight;
		this.scrollbarThumbHeight = scrollbarThumbElement.clientHeight;

		// Since these are the initial state's event handlers, it should create a
		// cascading effect wherein every subsequent event handler is bound outside of
		// the Angular Zone. This should prevent any of the event handlers contained
		// within this component from triggering change-detection in the Angular app.
		this.zone.runOutsideAngular(
			() => {

				this.viewportRef.nativeElement.addEventListener( "scroll", this.passiveStateHandleViewportScroll, PASSIVE );
				this.scrollbarRef.nativeElement.addEventListener( "mousedown", this.passiveStateHandleScrollbarMousedown );

			}
		);

	}


	// I teardown the passive-state, removing all state-specific event-handlers.
	private passiveStateTeardown() : void {

		this.viewportRef.nativeElement.removeEventListener( "scroll", this.passiveStateHandleViewportScroll, PASSIVE );
		this.scrollbarRef.nativeElement.removeEventListener( "mousedown", this.passiveStateHandleScrollbarMousedown );

	}


	// I update the offset of the simulated scrollbar thumb to match the offset of the
	// content within the viewport element.
	private updateThumbPositionToMatchScrollPercentage() : void {

		// Get short-hand references to the native DOM elements.
		var scrollbarThumbElement = this.scrollbarThumbRef.nativeElement;

		var offset = ( ( this.scrollbarHeight - this.scrollbarThumbHeight ) * this.scrollPercentage );
		scrollbarThumbElement.style.transform = `translateY( ${ offset }px )`;

	}

}

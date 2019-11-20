
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Position {
	left: number;
	top: number;
}

@Component({
	selector: "app-root",
	queries: {
		anchorRef: new ViewChild( "anchorRef" ),
		popupRef: new ViewChild( "popupRef" )
	},
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div
			#anchorRef
			(mousedown)="handleMousedown( $event )"
			class="anchor"
			[style.left.px]="anchorPosition.left"
			[style.top.px]="anchorPosition.top">
			Drag Me
		</div>

		<div
			#popupRef
			class="popup"
			[class.is-constrained]="isConstrained"
			[style.left.px]="popupPosition.left"
			[style.top.px]="popupPosition.top">
			<br />
		</div>
	`
})
export class AppComponent {

	public anchorMouseOffset: Position;
	public anchorPosition: Position;
	public anchorRef!: ElementRef;
	public isConstrained: boolean;
	public popupPosition: Position;
	public popupRef!: ElementRef;

	// I initialize the app component.
	constructor() {

		this.anchorPosition = {
			left: 10,
			top: 120
		};
		this.anchorMouseOffset = {
			left: 0,
			top: 0
		};
		this.popupPosition = {
			left: -1000,
			top: -1000
		};
		this.isConstrained = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the mousedown event on the anchor.
	public handleMousedown( event: MouseEvent ) : void {

		// Canceling the mousedown event helps prevent native "selection" and "dragging"
		// behaviors in the browser.
		event.preventDefault();

		// Calculate the local position of the mouse, relative to the top-left corner of
		// the anchor element. This will allows us to create a more natural drag-effect
		// by maintaining this local offset as we reposition the anchor relative to the
		// user's mouse.
		// --
		// NOTE: The client(X|Y) coordinates are relative to the browser's viewport,
		// regardless of the window scroll offset.
		var anchorRect = this.anchorRef.nativeElement.getBoundingClientRect();
		this.anchorMouseOffset.left = ( event.clientX - anchorRect.left );
		this.anchorMouseOffset.top = ( event.clientY - anchorRect.top );

		// PERFORMANCE NOTE: Since these events are being bound from within the NgZone,
		// it means that Angular will trigger a change-detection digest after each event.
		// If you wanted to have more control, you could bind these events outside of the
		// NgZone, and then dip back into the NgZone explicitly as needed. For the
		// purposes of this demo, I'm keeping things simple. Let's just let the digest
		// fire, as needed, since we're going to be updating the position a lot anyway.
		window.addEventListener( "mousemove", this.handleMousemove );
		window.addEventListener( "mouseup", this.handleMouseup );

	}


	// I handle the mousemove event on the window.
	public handleMousemove = ( event: MouseEvent ): void => {

		// We can position the anchor anywhere we want - we are putting NO CONSTRAINTS on
		// where it can be placed. If the user accidentally drops it off the side of the
		// page, the user can just refresh the page to get it back.
		// --
		// NOTE: The client(X|Y) coordinates are relative to the browser's viewport,
		// regardless of the window scroll offset. As such, in order to position the
		// anchor - which is using absolute positioning relative to the document - we are
		// translating the client coordinates into "page" coordinates by incorporating
		// the window's scroll offset (page[X|Y]Offset).
		this.anchorPosition.left = ( event.clientX - this.anchorMouseOffset.left + window.pageXOffset );
		this.anchorPosition.top = ( event.clientY - this.anchorMouseOffset.top + window.pageYOffset );

		// In order to prevent the popup from being positioned outside of the viewport
		// (as best we can), we have to know its dimensions. This way, we can limit
		// offsets as the popup approaches the edge of the viewport.
		// --
		// PERFORMANCE NOTE: For a small improvement, we could gather these dimensions
		// of the popup at the time we first render it. However, then we'd have to store
		// them as component properties and I wanted to keep this as simple as possible.
		var popupRect = this.popupRef.nativeElement.getBoundingClientRect();
		var popupWidth = popupRect.width;
		var popupHeight = popupRect.height;
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;

		// NOTE: When positioning the popup, we are translating an ABSOLUTE position (the
		// anchor) into a FIXED position (the popup). As such, we have to take the window
		// scroll-offsets into account.

		// First, let's calculate the "natural" position of the popup relative to the
		// anchor. This would be the position if we didn't want to constrain the location
		// of the popup relative to the viewport.
		var naturalLeft = ( this.anchorPosition.left - window.pageXOffset );
		var naturalTop = ( this.anchorPosition.top + 40 - window.pageYOffset );

		// Second, let's calculate the constrained position of the popup relative to the
		// viewport (such that the popup doesn't overlap with the edge of the viewport).
		// --
		// NOTE: In the following calculations, the "10" is the distance we want to keep
		// the popup away from the edges of the viewport.
		var minLeft = 10;
		var maxLeft = ( windowWidth - popupWidth - 10 );
		var minTop = 10;
		var maxTop = ( windowHeight - popupHeight - 10 );

		// Make sure we don't go too far right or left.
		this.popupPosition.left = Math.min( naturalLeft, maxLeft );
		this.popupPosition.left = Math.max( minLeft, this.popupPosition.left );

		// Make sure we don't go too far down or up.
		this.popupPosition.top = Math.min( naturalTop, maxTop );
		this.popupPosition.top = Math.max( minLeft, this.popupPosition.top );

		// Check to see if the popup position has been constrained.
		this.isConstrained = (
			( this.popupPosition.left !== naturalLeft ) ||
			( this.popupPosition.top !== naturalTop )
		);

	}


	// I handle the mouseup event on the window. 
	public handleMouseup = () : void => {

		window.removeEventListener( "mousemove", this.handleMousemove );
		window.removeEventListener( "mouseup", this.handleMouseup );

		this.popupPosition.left = -1000;
		this.popupPosition.top = -1000;

	}

}

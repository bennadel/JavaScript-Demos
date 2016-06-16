
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Renderer } from "@angular/core";

export interface IPosition {
	left: number;
	top: number;
}

export interface ILocation {
	x: number,
	y: number
}

@Directive({
	selector: "[dragEnabled]",
	outputs: [ "positionChange" ]
})
export class DraggableDirective {

	// I hold the host element reference.
	public elementRef: ElementRef;

	// I hold the initial position of the element when the mouse is first depressed.
	public initialElementPosition: IPosition;

	// I hold the initial location of the mouse when it is first depressed.
	public initialMouseLocation: ILocation;

	// I am the event stream for position change values. This directive doesn't actually
	// implement any of the re-positioning of the host element - that is functionality is
	// deferred to the calling context.
	public positionChange: EventEmitter<IPosition>;

	// I hold the renderer abstraction that helps bind to events on the DOM.
	public renderer: Renderer;


	// I initialize the draggable directive.
	constructor( elementRef: ElementRef, renderer: Renderer ) {

		this.elementRef = elementRef;
		this.initialElementPosition = {
			left: 0,
			top: 0
		};
		this.initialMouseLocation = {
			x: 0,
			y: 0
		};
		this.positionChange = new EventEmitter( /* isAsync = */ false );
		this.renderer = renderer;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once, after the directive has been instantiated and its inputs have
	// been bound.
	public ngOnInit() {

		this.enterReadyState();

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I put the directive into a drag state where new position events are being emitted
	// as the mouse is moved around. The events indicate where the host element should 
	// be moved if the calling context is implementing the drag.
	private enterDragState( newX: number, newY: number ) : void {

		// NOTE: In the drag state, we are binding to the listeners on the global
		// target since the mouse may move outside the host element if the position of 
		// the element is not updating fast enough; or, if the calling context is NOT
		// implementing a change in position.

		var unbindMousemove = this.renderer.listenGlobal(
			"document",
			"mousemove",
			( event: MouseEvent ) : void => {

				// Try to prevent text from being highlighted by the drag action.
				event.preventDefault();

				// Get the change in mouse location.
				var deltaX = ( event.pageX - this.initialMouseLocation.x );
				var deltaY = ( event.pageY - this.initialMouseLocation.y );

				// Use the mouse delta to calculate the element's position delta.
				this.positionChange.next({
					left: ( this.initialElementPosition.left + deltaX ),
					top: ( this.initialElementPosition.top + deltaY )
				});

			}
		);

		// If the user mouses-up in the pre-drag state, they never passed the drag 
		// threshold. As such, just teardown the state and move back to ready state.
		var unbindMouseup = this.renderer.listenGlobal(
			"document",
			"mouseup",
			( event: MouseEvent ) : void => {

				unbindMousemove();
				unbindMouseup();
				this.enterReadyState();

			}
		);

	}


	// I put the directive into a pre-drag state where we are checking to see if the 
	// depressed mouse is moved passed a certain threshold delta. It is only after the
	// delta is surpassed that we will start to emit drag events.
	private enterPreDragState() : void {

		// NOTE: In the pre-drag state, we are binding to the listeners on the global
		// target since the mouse may move outside the host element before the drag 
		// behavior is activated.

		var unbindMousemove = this.renderer.listenGlobal(
			"document",
			"mousemove",
			( event: MouseEvent ) : void => {

				var mouseDelta = Math.max(
					Math.abs( event.pageX - this.initialMouseLocation.x ),
					Math.abs( event.pageY - this.initialMouseLocation.y )
				);

				// If the mouse has moved past the threshold, teardown the state and
				// move to the drag state.
				if ( mouseDelta > 3 ) {

					unbindMousemove();
					unbindMouseup();
					this.enterDragState( event.pageX, event.pageY );

				}

			}
		);

		// If the user mouses-up in the pre-drag state, they never passed the drag 
		// threshold. As such, just teardown the state and move back to ready state.
		var unbindMouseup = this.renderer.listenGlobal(
			"document",
			"mouseup",
			( event: MouseEvent ) : void => {

				unbindMousemove();
				unbindMouseup();
				this.enterReadyState();

			}
		);

	}


	// I put the directive into a ready / default state where all we're doing is
	// listening to see if the target element intends to be dragged.
	private enterReadyState() : void {

		// In the ready state, all we need to do is listen for the mousedown event on 
		// the target element. Such a mousedown could indicate an intent to drag.
		var unbindMousedown = this.renderer.listen( 
			this.elementRef.nativeElement,
			"mousedown",
			( event: MouseEvent ) : void => {

				// Store the location and position of the mouse and element so that we
				// can start to calculate the delta in the next state.
				this.initialMouseLocation.x = event.pageX;
				this.initialMouseLocation.y = event.pageY;
				this.initialElementPosition = this.getElementPosition( this.elementRef.nativeElement );

				// Teardown the ready state and move to the pre-drag state.
				unbindMousedown();
				this.enterPreDragState();

			}
		);

	}


	// I get the position of the given element relative to it's positioned parent.
	// --
	// CAUTION: I am using jQuery to calculate the position because, frankly, jQuery 
	// will do a better job of it than I will.
	private getElementPosition( nativeElement: HTMLElement ) : IPosition {

		var position = jQuery( nativeElement ).position();

		return({
			left: position.left,
			top: position.top
		});

	}

}

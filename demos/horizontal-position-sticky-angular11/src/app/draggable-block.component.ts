
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "bn-draggable-block",
	styleUrls: [ "./draggable-block.component.less" ],
	template: "<ng-content></ng-content>"
})
export class DraggableBlockComponent {

	private elementRef: ElementRef;
	private mouseLeft: number;
	private mouseTop: number;
	private windowScrollX: number;
	private windowScrollY: number;
	private zone: NgZone;

	// I initialize the draggable-block component.
	constructor(
		elementRef: ElementRef,
		zone: NgZone
		) {

		this.elementRef = elementRef;
		this.zone = zone;

		this.mouseLeft = 0;
		this.mouseTop = 0;
		this.windowScrollX = 0;
		this.windowScrollY = 0;

	}
	
	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Since we're not actually changing any view-models within our event bindings
		// (we're just changing the window scroll offsets), we can bind them outside of
		// the Angular Zone. This way, we don't trigger any change-detection digests.
		this.zone.runOutsideAngular(
			() => {

				this.elementRef.nativeElement.addEventListener( "mousedown", this.handleMousedown );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle the mousedown on the host element.
	private handleMousedown = ( event: MouseEvent ) => {

		event.preventDefault();

		// When the user beging so drag the block around, we have to record the mouse and
		// the window location so that we can calculate the change in the mousemove event
		// handler.
		this.mouseLeft = event.clientX;
		this.mouseTop = event.clientY;
		this.windowScrollX = window.scrollX;
		this.windowScrollY = window.scrollY;

		window.addEventListener( "mousemove", this.handleMousemove );
		window.addEventListener( "mouseup", this.handleMouseup );

	};


	// I handle the mousedown on the window.
	private handleMousemove = ( event: MouseEvent ) => {

		var deltaX = ( event.clientX - this.mouseLeft );
		var deltaY = ( event.clientY - this.mouseTop );

		// Scroll the window to a new location using a delta that's relative to the last
		// mouse location (note that it is on the opposite direction of the mouse delta).
		window.scrollTo(
			( this.windowScrollX - deltaX ),
			( this.windowScrollY - deltaY )
		);

		// Again, record the current offsets so that we can calculate the change the next
		// time this handler fires.
		this.mouseLeft = event.clientX;
		this.mouseTop = event.clientY;
		this.windowScrollX = window.scrollX;
		this.windowScrollY = window.scrollY;
		
	};


	// I handle the mouseup on the window.
	private handleMouseup = ( event: MouseEvent ) => {

		window.removeEventListener( "mousemove", this.handleMousemove );
		window.removeEventListener( "mouseup", this.handleMouseup );
		
	};

}


// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-draggable",
	styleUrls: [ "./draggable.component.less" ],
	template:
	`
		<ng-content></ng-content>
	`
})
export class DraggableComponent {
	// ...
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface MoveEvent extends Position {
	// ...
}

interface Position {
	left: number;
	top: number;
}

@Component({
	selector: "my-draggable-item",
	inputs: [
		"left",
		"top"
	],
	outputs: [
		"dragEndEvents: dragEnd",
		"dragStartEvents: dragStart",
		"moveEvents: move"
	],
	host: {
		"[style.left.px]": "left",
		"[style.top.px]": "top"
	},
	styleUrls: [ "./draggable-item.component.less" ],
	template:
	`
		<ng-content></ng-content>
	`
})
export class DraggableItemComponent implements OnInit, OnDestroy {

	public left!: number; // NOTE: Using "Definite Assignment Assertion".
	public top!: number; // NOTE: Using "Definite Assignment Assertion".

	public dragEndEvents: EventEmitter<void>;
	public dragStartEvents: EventEmitter<void>;
	public moveEvents: EventEmitter<MoveEvent>;

	private element: Element;
	private mousePosition: Position;
	private originalPosition: Position;

	// I initialize the draggable item component.
	constructor( elementRef: ElementRef ) {

		this.element = elementRef.nativeElement;

		this.dragEndEvents = new EventEmitter();
		this.dragStartEvents = new EventEmitter();
		this.moveEvents = new EventEmitter();

		this.mousePosition = {
			left: 0,
			top: 0
		};

		this.originalPosition = {
			left: 0,
			top: 0
		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being unmounted.
	public ngOnDestroy() : void {

		// Clean-up event handlers that we attached to the DOM.
		this.element.removeEventListener( "mousedown", this.handleMousedown, false );
		window.removeEventListener( "mousemove", this.handleMousemove, false );
		window.removeEventListener( "mouseup", this.handleMouseup, false );

	}


	// I get called once after the inputs have been checked for the first time.
	public ngOnInit() : void {

		if ( this.left === undefined ) {

			throw( new Error( "Required input [left] not provided." ) );

		}

		if ( this.top === undefined ) {

			throw( new Error( "Required input [top] not provided." ) );

		}

		this.element.addEventListener( "mousedown", this.handleMousedown, false );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle mousedown events on the element.
	private handleMousedown = ( event: MouseEvent ) : void => {

		// I in order to prevent Selection of text and other elements during the drag
		// operation, let's kill the default behavior of the mousedown event.
		event.preventDefault();

		// Record the position of the initial mousedown. This will help us figure out how
		// far the mouse moves in each subsequent mousemove event.
		this.mousePosition.left = event.clientX;
		this.mousePosition.top = event.clientY;

		// Record the current position of the item at the start of the drag workflow.
		// This will help us figure out how to emit move events with the suggested new
		// position. Each move event will be an absolute change (not a delta change).
		this.originalPosition.left = this.left;
		this.originalPosition.top = this.top;

		// Once an element has been selected for drag, we have to start paying attention
		// to the mousemove and mouseup events so that we know how to emit move events.
		// We are tracking this on the WINDOW, not on the draggable item (or draggable
		// container), since we want to be able to respond to the user no matter where
		// the user places their cursor.
		window.addEventListener( "mousemove", this.handleMousemove, false );
		window.addEventListener( "mouseup", this.handleMouseup, false );

		this.dragStartEvents.emit();

	}


	// I handle mousemove events on the window.
	private handleMousemove = ( event: MouseEvent ) : void => {

		// Determine the distance the mouse has moved since the last mouse event.
		var deltaLeft = ( event.clientX - this.mousePosition.left );
		var deltaTop = ( event.clientY - this.mousePosition.top );

		// The move event will contain the suggested new location of the item. Notice
		// that this emitted position is relative to the original location of the item
		// as the start of the drag workflow. This is what allows us to emit an absolute
		// change, not a relative change.
		this.moveEvents.emit({
			left: ( this.originalPosition.left + deltaLeft ),
			top: ( this.originalPosition.top + deltaTop )
		});
		
	}


	// I handle mouseup events on the window.
	private handleMouseup = ( event: MouseEvent ) : void => {

		window.removeEventListener( "mousemove", this.handleMousemove, false );
		window.removeEventListener( "mouseup", this.handleMouseup, false );

		this.dragEndEvents.emit();
		
	}

}

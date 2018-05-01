
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface TextSelectEvent {
	text: string;
	viewportRectangle: SelectionRectangle | null;
	hostRectangle: SelectionRectangle | null;
}

interface SelectionRectangle {
	left: number;
	top: number;
	width: number;
	height: number;
}

@Directive({
	selector: "[textSelect]",
	outputs: [ "textSelectEvent: textSelect" ]
})
export class TextSelectDirective implements OnInit, OnDestroy {

	public textSelectEvent: EventEmitter<TextSelectEvent>;

	private elementRef: ElementRef;
	private hasSelection: boolean;
	private zone: NgZone;

	// I initialize the text-select directive.
	constructor(
		elementRef: ElementRef,
		zone: NgZone
		) {

		this.elementRef = elementRef;
		this.zone = zone;

		this.hasSelection = false;
		this.textSelectEvent = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the directive is being unmounted.
	public ngOnDestroy() : void {

		// Unbind all handlers, even ones that may not be bounds at this moment.
		this.elementRef.nativeElement.removeEventListener( "mousedown", this.handleMousedown, false );
		document.removeEventListener( "mouseup", this.handleMouseup, false );
		document.removeEventListener( "selectionchange", this.handleSelectionchange, false );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Since not all interactions will lead to an event that is meaningful to the
		// calling context, we want to setup the DOM bindings outside of the Angular
		// Zone. This way, we don't trigger any change-detection digests until we know
		// that we have a computed event to emit.
		this.zone.runOutsideAngular(
			() => {

				// While there are several ways to create a selection on the page, this
				// directive is only going to be concerned with selections that were
				// initiated by MOUSE-based selections within the current element.
				this.elementRef.nativeElement.addEventListener( "mousedown", this.handleMousedown, false );

				// While the mouse-even takes care of starting new selections within the
				// current element, we need to listen for the selectionchange event in
				// order to pick-up on selections being removed from the current element.
				document.addEventListener( "selectionchange", this.handleSelectionchange, false );
				
			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I get the deepest Element node in the DOM tree that contains the entire range.
	private getRangeContainer( range: Range ) : Node {

		var container = range.commonAncestorContainer;

		// If the selected node is a Text node, climb up to an element node - in Internet
		// Explorer, the .contains() method only works with Element nodes.
		while ( container.nodeType !== Node.ELEMENT_NODE ) {

			container = container.parentNode;

		}

		return( container );

	}


	// I handle mousedown events inside the current element.
	private handleMousedown = () : void => {

		document.addEventListener( "mouseup", this.handleMouseup, false );

	}


	// I handle mouseup events anywhere in the document.
	private handleMouseup = () : void => {

		document.removeEventListener( "mouseup", this.handleMouseup, false );

		this.processSelection();

	}


	// I handle selectionchange events anywhere in the document.
	private handleSelectionchange = () : void => {

		// We are using the mousedown / mouseup events to manage selections that are
		// initiated from within the host element. But, we also have to account for
		// cases in which a selection outside the host will cause a local, existing
		// selection (if any) to be removed. As such, we'll only respond to the generic
		// "selectionchange" event when there is a current selection that is in danger
		// of being removed.
		if ( this.hasSelection ) {

			this.processSelection();

		}

	}


	// I determine if the given range is fully contained within the host element.
	private isRangeFullyContained( range: Range ) : boolean {

		var hostElement = this.elementRef.nativeElement;
		var selectionContainer = range.commonAncestorContainer;

		// If the selected node is a Text node, climb up to an element node - in Internet
		// Explorer, the .contains() method only works with Element nodes.
		while ( selectionContainer.nodeType !== Node.ELEMENT_NODE ) {

			selectionContainer = selectionContainer.parentNode;

		}

		return( hostElement.contains( selectionContainer) );

	}


	// I inspect the document's current selection and check to see if it should be
	// emitted as a TextSelectEvent within the current element.
	private processSelection() : void {

		var selection = document.getSelection();

		// If there is a new selection and an existing selection, let's clear out the
		// existing selection first.
		if ( this.hasSelection ) {

			// Since emitting event may cause the calling context to change state, we
			// want to run the .emit() inside of the Angular Zone. This way, it can
			// trigger change detection and update the views.
			this.zone.runGuarded(
				() => {

					this.hasSelection = false;
					this.textSelectEvent.next({
						text: "",
						viewportRectangle: null,
						hostRectangle: null
					});

				}
			);
			
		}

		// If the new selection is empty (for example, the user just clicked somewhere
		// in the document), then there's no new selection event to emit.
		if ( ! selection.rangeCount || ! selection.toString() ) {

			return;

		}

		var range = selection.getRangeAt( 0 );
		var rangeContainer = this.getRangeContainer( range );

		// We only want to emit events for selections that are fully contained within the
		// host element. If the selection bleeds out-of or in-to the host, then we'll
		// just ignore it since we don't control the outer portions.
		if ( this.elementRef.nativeElement.contains( rangeContainer ) ) {

			var viewportRectangle = range.getBoundingClientRect();
			var localRectangle = this.viewportToHost( viewportRectangle, rangeContainer );

			// Since emitting event may cause the calling context to change state, we
			// want to run the .emit() inside of the Angular Zone. This way, it can
			// trigger change detection and update the views.
			this.zone.runGuarded(
				() => {

					this.hasSelection = true;
					this.textSelectEvent.emit({
						text: selection.toString(),
						viewportRectangle: {
							left: viewportRectangle.left,
							top: viewportRectangle.top,
							width: viewportRectangle.width,
							height: viewportRectangle.height
						},
						hostRectangle: {
							left: localRectangle.left,
							top: localRectangle.top,
							width: localRectangle.width,
							height: localRectangle.height
						}
					});

				}
			);

		}

	}


	// I convert the given viewport-relative rectangle to a host-relative rectangle.
	// --
	// NOTE: This algorithm doesn't care if the host element has a position - it simply
	// walks up the DOM tree looking for offsets.
	private viewportToHost(
		viewportRectangle: SelectionRectangle,
		rangeContainer: Node
		) : SelectionRectangle {

		var host = this.elementRef.nativeElement;
		var hostRectangle = host.getBoundingClientRect();

		// Both the selection rectangle and the host rectangle are calculated relative to
		// the browser viewport. As such, the local position of the selection within the
		// host element should just be the delta of the two rectangles.
		var localLeft = ( viewportRectangle.left - hostRectangle.left );
		var localTop = ( viewportRectangle.top - hostRectangle.top );

		var node = rangeContainer;
		// Now that we have the local position, we have to account for any scrolling
		// being performed within the host element. Let's walk from the range container
		// up to the host element and add any relevant scroll offsets to the calculated
		// local position.
		do {

			localLeft += ( <Element>node ).scrollLeft;
			localTop += ( <Element>node ).scrollTop;

		} while ( ( node !== host ) && ( node = node.parentNode ) );

		return({
			left: localLeft,
			top: localTop,
			width: viewportRectangle.width,
			height: viewportRectangle.height
		});

	}

}

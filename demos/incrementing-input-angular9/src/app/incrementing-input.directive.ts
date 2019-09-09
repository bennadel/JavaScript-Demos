
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "input[incrementingInput]",
	outputs: [ "valueChange" ],
	host: {
		"(keydown.ArrowUp)": "handleKeydown( $event )",
		"(keydown.Shift.ArrowUp)": "handleKeydown( $event )",
		"(keydown.ArrowDown)": "handleKeydown( $event )",
		"(keydown.Shift.ArrowDown)": "handleKeydown( $event )"
	}
})
export class IncrementingInputDirective {

	public valueChange: EventEmitter<string>;

	private elementRef: ElementRef;
	private pendingSelectionEnd: number;
	private pendingSelectionStart: number;
	private pendingValue: string;
	private valueSnapshot: string;

	// I initialize the directive.
	constructor( elementRef: ElementRef ) {

		this.elementRef = elementRef;

		this.valueChange = new EventEmitter();
		// As the user increments a substring of the value, we want to be able to expand
		// the input Selection to contain the affected characters. In order to do this,
		// without mutating the Input directly, we have to keep track of the emitted
		// value so that we can test it against the rendered value of the input after
		// change-detection as occurred.
		this.pendingSelectionEnd = -1;
		this.pendingSelectionStart = -1;
		this.pendingValue = "";
		this.valueSnapshot = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the ArrowUp and ArrowDown keydown events on the input. 
	public handleKeydown( event: KeyboardEvent ) : void {

		// Get the current state of the input control.
		var value = this.elementRef.nativeElement.value;
		var start = this.elementRef.nativeElement.selectionStart;
		var end = start;

		// Based on the current selectionStart, we're going to spread out in both
		// directions, consuming characters that meet the following RegExp pattern. As we
		// do this, we have to use a pattern that is lenient enough to get partial
		// matches that wouldn't be valid on their own; but, that will become valid as we
		// gather more characters (ex, "-" that precedes "-4").
		var pattern = /^(-|[0-9])[0-9]*$/i;

		// Gather characters to the RIGHT of the selection start.
		while (
			( end < value.length ) &&
			pattern.test( value.slice( start, ( end + 1 ) ) )
			) {

			end++;

		}

		// Gather characters to the LEFT of the selection start.
		while (
			( start > 0 ) &&
			pattern.test( value.slice( ( start - 1 ), end ) )
			) {

			start--;

		}

		// If we couldn't gather any characters that matched the pattern, then the cursor
		// isn't near any incrementable value.
		if ( start === end ) {

			return;

		}

		// At this point, we should have located a substring that contains a numeric
		// value. Let's parse it as a number so we can start to manipulate it.
		var selectionValue = ( value.slice( start, end ) * 1 );

		// Our RegExp pattern should have constrained our search to numeric characters;
		// but, as a safe-guard, let's just confirm that the parsed value is actually
		// numeric before we start to use it a Number.
		if ( isNaN( selectionValue ) ) {

			return;

		}

		// If we've made it this far, we know that we have a selection and that the
		// characters within that selection have been parsed into a numeric value. This
		// means that we're going to apply custom behavior in response to this keyboard
		// event, which means we now need to cancel the default behavior of the event.
		event.preventDefault();

		var increment = this.getIncrementFromEvent( event );
		var prefix = value.slice( 0, start );
		var suffix = value.slice( end );
		var incrementedSelectionValue = ( selectionValue + increment ).toString();

		// Before we emit the (valueChange) event, we need to keep track of the proposed
		// value and its selection boundaries so that we can figure out (if at all) to
		// affect the selection state after the Directive content has been checked.
		this.pendingSelectionStart = start;
		this.pendingSelectionEnd = ( start + incrementedSelectionValue.length );
		this.pendingValue = ( prefix + incrementedSelectionValue + suffix );
		this.valueSnapshot = value;

		// Emit proposed value alteration.
		this.valueChange.emit( this.pendingValue );

	}


	// I get called after the projected content has been checked for changes.
	public ngAfterContentChecked() : void {

		var element = this.elementRef.nativeElement;

		// If we have a pending value based on a proposed increment, let's check to see
		// if the view has been updated to match the proposal. If so, we can reinstate
		// the selection of the incremented substring.
		if ( this.pendingValue && ( this.valueSnapshot !== element.value ) ) {

			// Only update the selection if the rendered value matches the proposed
			// value. If it does not, then the calling context applied an unrelated
			// change to the view-model.
			if ( element.value === this.pendingValue ) {

				element.selectionStart = this.pendingSelectionStart;
				element.selectionEnd = this.pendingSelectionEnd;

			}

			// Clear out the pending value - this will only give the view one chance to
			// update the view-model in accordance with our emit.
			this.pendingValue = "";
			this.pendingSelectionStart = -1;
			this.pendingSelectionEnd = -1;
			this.valueSnapshot = "";

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I determine which increment to use based on the given keyboard event.
	private getIncrementFromEvent( event: KeyboardEvent ) : number {

		if ( event.key === "ArrowUp" ) {

			return( event.shiftKey ? 10 : 1 );

		} else {

			return( event.shiftKey ? -10 : -1 );

		}

	}

}

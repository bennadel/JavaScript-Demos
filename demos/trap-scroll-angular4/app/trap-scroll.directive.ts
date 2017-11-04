
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { NgZone } from "@angular/core";
import { OnChanges } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

enum Direction {
	UP = "up",
	DOWN = "down",
	NONE = "none"
}

@Directive({
	selector: "[trapScroll]",
	inputs: [ "trapScroll", "trapKeyScroll" ]
})
export class TrapScrollDirective implements OnInit, OnChanges, OnDestroy {

	public trapScroll: boolean | string;
	public trapKeyScroll: boolean | string;

	private element: HTMLElement;
	private zone: NgZone;

	// I initialize the trap-scroll directive.
	constructor( elementRef: ElementRef, zone: NgZone ) {

		this.element = elementRef.nativeElement;
		this.zone = zone;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called every time the inputs properties are set.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// Normalize the inputs. Since the inputs can be passed-in as either string-based
		// attributes or as property values, we need to funnel both types of input into a
		// set of Booleans so that the rest of our logic can be properly typed.
		this.trapScroll = this.normalizeInputAsBoolean( this.trapScroll );
		this.trapKeyScroll = this.normalizeInputAsBoolean( this.trapKeyScroll );

		if ( "trapKeyScroll" in changes ) {

			// If the trapping of keyboard-based scrolling is turned on, we want to give
			// the element a tabIndex so that it can be focused. This will allow us to 
			// bind keyboard events directly to the element (as opposed to having to bind
			// them to the global object). This will also give the element a :focus 
			// outline, which is good for accessibility (but can be overridden in the 
			// parent component styles).
			if ( this.trapKeyScroll ) {

				this.element.tabIndex = -1; // Focus without tab-based navigation.

			} else {

				this.element.removeAttribute( "tabIndex" );

			}
			
		}

	}


	// I get called once when the directive is being unmounted.
	public ngOnDestroy() : void {

		this.element.removeEventListener( "wheel", this.handleWheelEvent, false );
		this.element.removeEventListener( "keydown", this.handleKeyboardEvent, false );
		
	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// Normally, we would add event handlers like this in the host bindings. However,
		// if we use the Angular event bindings, they will be run inside of the Angular 
		// Zone.js instance. Which means that Angular will trigger a change-detection 
		// digest FOR EVERY WHEEL EVENT (even if we try to detach this directive's change
		// detection reference). As such, we need to fall back to the DOM-native event
		// binding AND run them OUTSIDE OF THE ANGULAR ZONE. This way, Angular won't try
		// to trigger any change detection when our event-handlers are called.
		this.zone.runOutsideAngular(
			() : void => {

				// NOTE: All modern browsers support "wheel". As such, we'll apply this 
				// as a progressive enhancement and not worry about older browsers.
				this.element.addEventListener( "wheel", this.handleWheelEvent, false );
				this.element.addEventListener( "keydown", this.handleKeyboardEvent, false );

			}
		);
		
	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle the keyboard events for the local element.
	// --
	// CAUTION: Using fat-arrow binding for class method.
	private handleKeyboardEvent = ( event: KeyboardEvent ) : void => {

		if ( ! this.trapScroll || ! this.trapKeyScroll ) {

			return;

		}

		// Regardless of whether or not we're going to allow this keyboard event to be
		// applied locally, we want to stop the event from propagating. This way, we 
		// make sure that an ancestor instance of [trapScroll], higher up in the 
		// Document Object Model (DOM) tree, doesn't accidentally interfere with the
		// default behavior being applied locally.
		event.stopPropagation();

		// If the given keyboard event won't produce a local scroll (since the element
		// is fully scrolled in the given direction), let's prevent the default behavior
		// so that the event doesn't creating scrolling at a higher level in the DOM.
		if ( this.isScrolledInMaxDirection( this.getDirectionFromKeyboardEvent( event ) ) ) {

			event.preventDefault();

		}

	}


	// I handle the wheel events for the local element.
	// --
	// CAUTION: Using fat-arrow binding for class method.
	private handleWheelEvent = ( event: WheelEvent ) : void => {

		if ( ! this.trapScroll ) {

			return;

		}

		// Regardless of whether or not we're going to allow this wheel event to be 
		// applied locally, we want to stop the event from propagating. This way, we 
		// make sure that an ancestor instance of [trapScroll], higher up in the 
		// Document Object Model (DOM) tree, doesn't accidentally interfere with the
		// default behavior being applied locally.
		event.stopPropagation();

		// If the given wheel event won't produce a local scroll (since the element is
		// fully scrolled in the given direction), let's prevent the default behavior so
		// that the event doesn't creating scrolling at a higher level in the DOM.
		if ( this.isScrolledInMaxDirection( this.getDirectionFromWheelEvent( event ) ) ) {

			event.preventDefault();

		}

	}


	// I return the normalized scroll direction of the given keyboard event.
	private getDirectionFromKeyboardEvent( event: KeyboardEvent ) : Direction {

		switch ( event.key ) {
			case " ":

				return( event.shiftKey ? Direction.UP : Direction.DOWN );
				// @ts-ignore: TS7027: Unreachable code detected.

			break;
			case "ArrowUp":
			case "Home":
			case "PageUp":
				
				return( Direction.UP );
				// @ts-ignore: TS7027: Unreachable code detected.

			break;
			case "ArrowDown":
			case "End":
			case "PageDown":
				
				return( Direction.DOWN );
				// @ts-ignore: TS7027: Unreachable code detected.
				
			break;
			default:

				return( Direction.NONE );
				// @ts-ignore: TS7027: Unreachable code detected.

			break;
		}

	}


	// I return the normalized scroll direction of the given wheel event.
	private getDirectionFromWheelEvent( event: WheelEvent ) : Direction {

		var delta = ( event.deltaY || event.detail );

		return( ( delta <= 0 ) ? Direction.UP : Direction.DOWN );

	}


	// I determine if the element is currently scrolled to the maximum value in the
	// given direction.
	private isScrolledInMaxDirection( direction: Direction ) : boolean {

		return(
			( ( direction === Direction.UP ) && this.isScrolledToTheTop() ) ||
			( ( direction === Direction.DOWN ) && this.isScrolledToTheBottom() )
		);

	}


	// I determine if the current element is scrolled all the way to the bottom.
	private isScrolledToTheBottom() : boolean {

		return( ( this.element.clientHeight + this.element.scrollTop ) >= this.element.scrollHeight );

	}


	// I determine if the current element is scrolled all the way to the top.
	private isScrolledToTheTop() : boolean {

		return( ! this.element.scrollTop );

	}


	// I return a Boolean coercion for the given Input value.
	private normalizeInputAsBoolean( value: any ) : boolean {

		return( 
			// If the associated input attribute was included without any value, it will 
			// be passed-in as a string. As such, we want to consume the empty string as
			// an implicit truthy.
			( value === "" ) ||
			// If the associated input attribute is being used to set a property, then we
			// want to consume it as a Truthy value.
			!! value
		);

	}

}

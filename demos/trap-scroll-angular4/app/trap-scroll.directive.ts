
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

		this.element.removeEventListener( "wheel", this.handleEvent, false );
		this.element.removeEventListener( "keydown", this.handleEvent, false );
		
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
				this.element.addEventListener( "wheel", this.handleEvent, false );
				this.element.addEventListener( "keydown", this.handleEvent, false );

			}
		);
		
	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I determine if the given event should be prevented. We'll want to do this if the
	// event won't cause local scrolling and may bubble up to cause a scrolling action in
	// a parent element.
	private eventShouldBePrevented( event: WheelEvent | KeyboardEvent ) : boolean {

		var target = <HTMLElement>event.target;
		var direction = this.getDirectionFromEvent( event );

		// Check for embedded scrolling opportunities.
		while ( target !== this.element ) {

			// If the event will cause scrolling in an embedded element, then we DO NOT
			// want to prevent the default behavior of the event.
			if ( this.isScrollableElement( target ) && ! this.isScrolledInMaxDirection( target, direction ) ) {

				return( false );

			}

			target = <HTMLElement>target.parentNode;

		}

		// If we've made it this far, there weren't any embedded scrollable elements to
		// inspect. As such, we can now examine the container. If the event will cause
		// scrolling in container element, then we DO NOT want to prevent the default 
		// behavior of the event.
		return( this.isScrolledInMaxDirection( target, direction ) );

	}


	// I get the direction from the given event.
	private getDirectionFromEvent( event: WheelEvent | KeyboardEvent ) : Direction {

		if ( event instanceof WheelEvent ) {

			return( this.getDirectionFromWheelEvent( event ) );

		} else {

			return( this.getDirectionFromKeyboardEvent( event ) );

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


	// I handle both Wheel and Keyboard events, and prevent the default behaviors if the
	// events would cause scrolling at a higher point in the DOM tree.
	// --
	// CAUTION: Using fat-arrow binding for class method.
	private handleEvent = ( event: WheelEvent | KeyboardEvent ) : void => {

		if ( ! this.isTrappingEvent( event ) ) {

			return;

		}

		// Regardless of whether or not we're going to allow this event to be applied 
		// locally, we want to stop the event from propagating above this container. This
		// way, we make sure that an ancestor instance of [trapScroll], higher up in the
		// Document Object Model (DOM) tree, doesn't accidentally interfere with the 
		// default behavior being applied locally.
		// --
		// CAUTION: This will prevent the ability to perform some kinds of event 
		// delegation. However, in Angular, event delegation is not used very often.
		event.stopPropagation();

		// If the given event won't produce a local scroll in the current element or one
		// of its local descendants, then let's prevent the default behavior so that the
		// event doesn't creating scrolling at a higher level in the DOM.
		if ( this.eventShouldBePrevented( event ) ) {

			event.preventDefault();

		}

	}


	// I determine if the given element is a Form element that is relevant to key-based
	// scrolling events.
	private isFormElement( element: HTMLElement ) : boolean {

		return(
			( element.tagName === "TEXTAREA" ) ||
			( element.tagName === "INPUT" ) ||
			( element.tagName === "SELECT" )
		);

	}


	// I determine if the given element is scrollable.
	private isScrollableElement( element: HTMLElement ) : boolean {

		// If the element has an overflow that hides the content, then the scrollHeight
		// is still reported as larger than the clientHeight even though no scrolling on
		// the element can be performed.
		if ( getComputedStyle( element ).overflowY === "hidden" ) {

			return( false );

		}

		// If the scrollHeight is the same as the clientHeight, it should mean that 
		// there is no content that is outside the visible bounds of the given element.
		// Meaning, the element is only scrollable if these values don't match.
		return( element.scrollHeight !== element.clientHeight );

	}


	// I determine if the element is currently scrolled to the maximum value in the
	// given direction.
	private isScrolledInMaxDirection( element: HTMLElement, direction: Direction ) : boolean {

		return(
			( ( direction === Direction.UP ) && this.isScrolledToTheTop( element ) ) ||
			( ( direction === Direction.DOWN ) && this.isScrolledToTheBottom( element ) )
		);

	}


	// I determine if the current element is scrolled all the way to the bottom.
	private isScrolledToTheBottom( element: HTMLElement ) : boolean {

		return( ( element.clientHeight + element.scrollTop ) >= element.scrollHeight );

	}


	// I determine if the current element is scrolled all the way to the top.
	private isScrolledToTheTop( element: HTMLElement ) : boolean {

		return( ! element.scrollTop );

	}


	// I determine if the given event is being trapped by the current element.
	private isTrappingEvent( event: WheelEvent | KeyboardEvent ) : boolean {

		if ( ! this.trapScroll ) {

			return( false );

		}

		if ( event instanceof KeyboardEvent ) {

			if ( ! this.trapKeyScroll ) {

				return( false );

			}

			var target = <HTMLElement>event.target;

			// Dealing with embedded form elements is rather tricky. Some of the keys 
			// work as you might expect while other keys, like PageUp and Home, exhibit 
			// some funky behavior, acting on the page, not on the target element. As 
			// such, we'll just allow all keyboard events in a form element to work as
			// the browser originally intended. And, for the most part, they already
			// trap key events.
			if ( ( event instanceof KeyboardEvent ) && this.isFormElement( target ) ) {

				return( false );

			}

			// If this is a keyboard event, but the key isn't one that denotes a 
			// direction, then we won't trap it. This way, we only trap what we need
			// to and we let everything else bubble up through the DOM.
			if ( this.getDirectionFromKeyboardEvent( event ) === Direction.NONE ) {

				return( false );

			}

		}

		return( true );

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

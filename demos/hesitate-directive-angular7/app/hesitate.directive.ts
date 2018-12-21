
// Import the core angular services.
import { Directive } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { NgZone } from "@angular/core";
import { Renderer2 } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[hesitate]",
	inputs: [ "duration" ],
	outputs: [ "hesitateEvents: hesitate" ],
	// Let's export this Directive instance so that the calling context can explicitly
	// cancel a pending hesitation during a more intricate set of user interactions.
	exportAs: "hesitation"
})
export class HesitateDirective implements OnInit, OnDestroy {

	public duration: number;
	public hesitateEvents: EventEmitter<void>;

	private elementRef: ElementRef;
	private renderer: Renderer2;
	private unlisteners: Function[] | null;
	private timer: any; // TypeScript gets confused if we try to type this.
	private zone: NgZone;

	// I initialize the hesitate directive.
	constructor(
		elementRef: ElementRef,
		renderer: Renderer2,
		zone: NgZone
		) {

		this.elementRef = elementRef;
		this.renderer = renderer;
		this.zone = zone;

		this.duration = 2000;
		this.hesitateEvents = new EventEmitter();
		this.timer = 0;
		this.unlisteners = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I cancel any pending hesitation timer.
	// --
	// NOTE: This is method is PUBLIC so that it may be consumed as part of the EXPORTED
	// API in the View of the calling context.
	public cancel() : void {

		clearTimeout( this.timer );

	}


	// I get called once when the host element is being unmounted.
	public ngOnDestroy() : void {

		this.cancel();

		// If we have event-handler bindings, unbind them all.
		if ( this.unlisteners ) {

			for ( var unlistener of this.unlisteners ) {

				unlistener();

			}

		}

	}


	// I get called once after the host element has been mounted and the inputs have been
	// bound for the first time.
	public ngOnInit() : void {

		// Instead of using host bindings, which would trigger change-detection digests
		// when the events are triggered, we want to drop-down out of the core NgZone so
		// that we can setup our event-handlers without adding processing overhead.
		this.zone.runOutsideAngular(
			() => {

				this.unlisteners = [
					this.renderer.listen( this.elementRef.nativeElement, "mouseenter", this.handleMouseenter ),
					this.renderer.listen( this.elementRef.nativeElement, "mousedown", this.handleMousedown ),
					this.renderer.listen( this.elementRef.nativeElement, "mouseleave", this.handleMouseleave )
				];

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle the mousedown event inside the host element.	
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleMousedown = ( event: MouseEvent ) : void => {

		// If the user shows any mouse-activity (other than enter/leave) inside the host
		// element, we want to cancel the hesitation timer. Such mouse activity indicates
		// non-hesitation intent on behalf of the user.
		this.cancel();

	};


	// I handle the mouseevent event inside the host element.
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleMouseenter = ( event: MouseEvent ) : void => {

		// When the user enters the host, start the hesitation timer. This timer will be
		// fulfilled if the user remains inside of the host without performing any other
		// meaningful actions.
		this.timer = setTimeout( this.handleTimerThreshold, this.duration );

	};


	// I handle the mouseleave event inside the host element.
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleMouseleave = ( event: MouseEvent ) : void => {

		this.cancel();

	};


	// I handle the timer threshold event.
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleTimerThreshold = () : void => {

		// Once the hesitation timer threshold has been surpassed, we want to trigger an
		// output event. This time, however, we want to trigger Angular change-detection.
		// As such, we have set up into the Angular zone for the emission.
		this.zone.runGuarded(
			() => {

				this.hesitateEvents.emit();

			}
		);

	}

}

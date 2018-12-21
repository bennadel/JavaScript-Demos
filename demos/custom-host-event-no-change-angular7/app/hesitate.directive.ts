
// Import the core angular services.
import { Directive } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[hesitate]",
	inputs: [ "duration" ],
	outputs: [ "hesitateEvents: hesitate" ],
	// NOTE: We are going to synthesize a "hesitate" event by building on top of core
	// DOM events. However, since we know that no external state will change based on
	// these DOM events, we can bind them outside of the Angular Zone.
	host: {
		"(mouseenter.noChangeDetection)": "handleMouseenter()",
		"(mousedown.noChangeDetection)": "handleMousedown()",
		"(mouseleave.noChangeDetection)": "handleMouseleave()"
	},
	// Let's export this Directive instance so that the calling context can explicitly
	// cancel a pending hesitation during a more intricate set of user interactions.
	exportAs: "hesitation"
})
export class HesitateDirective implements OnDestroy {

	public duration: number;
	public hesitateEvents: EventEmitter<void>;

	private timer: any; // TypeScript gets confused if we try to type this.
	private zone: NgZone;

	// I initialize the hesitate directive.
	constructor( zone: NgZone ) {

		this.zone = zone;

		this.duration = 2000;
		this.hesitateEvents = new EventEmitter();
		this.timer = 0;

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

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I handle the mousedown event inside the host element.	
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleMousedown() : void {

		// If the user shows any mouse-activity (other than enter/leave) inside the host
		// element, we want to cancel the hesitation timer. Such mouse activity indicates
		// non-hesitation intent on behalf of the user.
		this.cancel();

	};


	// I handle the mouseevent event inside the host element.
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleMouseenter() : void {

		// When the user enters the host, start the hesitation timer. This timer will be
		// fulfilled if the user remains inside of the host without performing any other
		// meaningful actions.
		this.timer = setTimeout( this.handleTimerThreshold, this.duration );

	};


	// I handle the mouseleave event inside the host element.
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleMouseleave() : void {

		this.cancel();

	};


	// I handle the timer threshold event.
	// --
	// CAUTION: Currently OUTSIDE the core NgZone.
	private handleTimerThreshold = () : void => {

		// Once the hesitation timer threshold has been surpassed, we want to trigger an
		// output event. However, since all the underlying events were bound with the
		// .noChangeDetection modifier, we are currently executing outside of the Angular
		// Zone. As such, we have to step up into the Angular Zone before we call emit().
		this.zone.run(
			() => {

				this.hesitateEvents.emit();

			}
		);

	}

}

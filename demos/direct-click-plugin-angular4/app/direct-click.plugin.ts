
// Import the core angular services.
import { EventManager } from "@angular/platform-browser";
import { NgZone } from "@angular/core";

// Import these modules for their side-effects.

export class DirectClickPlugin {

	// CAUTION: This property is automatically injected by the EventManager service. It 
	// will be available by the time the addEventListener() method is called.
	public manager: EventManager;

	// ---
	// PUBLIC METHODS.
	// ---

	// I bind the "directclick" event to the given object.
	public addEventListener(
		element: HTMLElement,
		eventName: string,
		handler: Function
		) : Function {

		// By default, when we bind an event using the .addEventListener(), the event is
		// bound inside Angular's Zone. This means that when the event handler is 
		//invoked, Angular's change-detection algorithm will get automatically triggered.
		// When there is a one-to-one mapping of events to event handler calls, this 
		// makes sense. However, in this case, for the "directclick" event, not all 
		// "click" events will lead to an event handler invocation. As such, we want to 
		// bind the base "click" hander OUTSIDE OF THE ANGULAR ZONE, inspect the event, 
		// then RE-ENTER THE ANGULAR ZONE only in the case when we're about to invoke the
		// event handler. This way, the "click" events WILL NOT trigger change-detection;
		// but, the "directclick" events WILL TRIGGER change-detection.
		var zone: NgZone = this.manager.getZone();

		zone.runOutsideAngular( addClickHandler );

		return( removeClickHandler );

		// ---
		// LOCALLY-SCOPED FUNCTIONS.
		// ---

		// I handle the base "click" event OUTSIDE the Angular Zone.
		function addClickHandler() {

			element.addEventListener( "click", clickHandler, false );

		}

		// I remove the base "click" event.
		function removeClickHandler() {

			element.removeEventListener( "click", clickHandler, false );

		}

		// I handle the base "click" event.
		function clickHandler( event: Event ) : void {

			if ( event.target !== element ) {

				return;

			}

			// If the target of the click event is the bound element, then this "click"
			// event is a "directclick" event. At this point, we need to invoke the 
			// event-handler. So, we're going to RE-ENTER THE ANGULAR ZONE so that the
			// change-detection algorithm will be triggered.
			zone.run(
				function runInZoneSoChangeDetectionWillBeTriggered() {

					handler( event );

				}
			);

		}

	}


	// I bind the "directclick" event to the given global object.
	// --
	// CAUTION: Not currently supported - not sure it would even make sense.
	public addGlobalEventListener(
		element: string,
		eventName: string,
		handler: Function
		) : Function {

		throw( new Error( `Unsupported event target ${ element } for event ${ eventName }.` ) );

	}


	// I determine if the given event name is supported by this plugin. For each event
	// binding, the plugins are searched in the reverse order of the EVENT_MANAGER_PLUGINS
	// multi-collection. Angular will use the first plugin that supports the given event.
	public supports( eventName: string ) : boolean {

		return( eventName === "directclick" );

	}

}

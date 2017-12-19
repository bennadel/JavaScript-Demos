
// Import the core angular services.
import { EventManager } from "@angular/platform-browser";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export class MousedownOutsidePlugin {

	// CAUTION: This property is automatically injected by the EventManager. It will be
	// available by the time the addEventListener() method is called.
	public manager: EventManager;

	// ---
	// PUBLIC METHODS.
	// ---

	// I bind the "mousedownOutside" event to the given object.
	public addEventListener(
		element: HTMLElement,
		eventName: string,
		handler: Function
		) : Function {

		// By default, when we bind an event using the .addEventListener(), the event is
		// bound inside Angular's Zone. This means that when the event handler is 
		// invoked, Angular's change-detection algorithm will be triggered automatically.
		// When there is a one-to-one mapping of events to event handler calls, this 
		// makes sense. However, in this case, for the "mousedownOutside" event, not all
		// "mousedown" events will lead to an event handler invocation. As such, we want 
		// to bind the base "mousedown" hander OUTSIDE OF THE ANGULAR ZONE, inspect the 
		// event, then RE-ENTER THE ANGULAR ZONE in the case when we're about to invoke
		// the event handler. This way, the "mousedown" events WILL NOT trigger change-
		// detection; but, the subsequent "mousedownOutside" events (if any) WILL TRIGGER
		// change-detection.
		var zone: NgZone = this.manager.getZone();

		zone.runOutsideAngular( addMousedownHandler );

		return( removeMousedownHandler );

		// ---
		// LOCALLY-SCOPED FUNCTIONS.
		// ---

		// I handle the base "mousedown" event OUTSIDE the Angular Zone.
		function addMousedownHandler() {

			document.addEventListener( "mousedown", mousedownHandler, false );

		}

		// I remove the base "mousedown" event.
		function removeMousedownHandler() {

			document.removeEventListener( "mousedown", mousedownHandler, false );

		}

		// I handle the base "mousedown" event.
		function mousedownHandler( event: Event ) : void {

			var ignoreTargets: any[] | null = null;

			// By default, the mousedownOutside handler will respond to any mousedown 
			// events outside the current element. However, some of those events can be
			// ignored if the "data-ignoreMousedownOutside" attribute is provided (as 
			// a list of CSS selectors).
			// --
			// CAUTION: .dataset is not supported in IE10 (but getAttribute() would be
			// if you needed to support older browsers).
			if ( element.dataset.ignoremousedownoutside ) {

				ignoreTargets = Array.from( document.querySelectorAll( element.dataset.ignoremousedownoutside ) );

			}

			var target = <Node>event.target;

			// Since we're looking for events that originate outside of the current 
			// element (or any of the "ignore" elements), we have to walk up the DOM
			// (Document Object Model) tree in order to ensure that the event target is
			// not a descendant of the white-listed elements.
			while ( target ) {

				// If we've reached the element reference, this is an internal event and
				// we can safely ignore it.
				if ( target === element ) {

					return;

				}

				// If we've reached one of the ignorable elements, this is an internal 
				// event and we can safely ignore it.
				if ( ignoreTargets && ( ignoreTargets.indexOf( target ) !== -1 ) ) {

					console.warn( "Ignoring mousedown in target:", target );
					return;

				}

				target = target.parentNode;

			}

			// If we've made it this far, it means that the mousedown event was outside 
			// of the current element AND outside of any elements that we need to ignore.
			// At this point, we need to invoke the event-handler; as such, we're going 
			// to RE-ENTER THE ANGULAR ZONE so that the change-detection algorithm will 
			// be triggered after our handler is invoked.
			zone.runGuarded(
				function runInZoneSoChangeDetectionWillBeTriggered() {

					handler( event );

				}
			);

		}

	}


	// I bind the "mousedownOutside" event to the given global object.
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

		return( eventName === "mousedownOutside" );

	}

}

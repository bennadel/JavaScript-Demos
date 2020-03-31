
// Import the core angular services.
import { EventManager } from "@angular/platform-browser";

// Import the application components and services.
import { KeyboardEventHelper } from "./keyboard-event-helper";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I define how long the user has to complete an chained-event sequence before the
// internal state is reset and the chain has to be started-over.
// --
// TODO: If we were to package this plugin into a module, we'd likely want to provide a
// module-setting that would allow an application to override this timer duration.
var TIMER_DURATION = 3000;


export class KeyboardEventsChainedKeydownPlugin {

	// The manager will get injected by the EventPluginManager at runtime.
	// --
	// NOTE: Using Definite Assignment Assertion to get around initialization.
	public manager!: EventManager;

	// ---
	// PUBLIC METHODS.
	// ---

	// I bind the given event handler to the given element. Returns a function that
	// tears-down the event binding.
	public addEventListener(
		element: HTMLElement,
		higherOrderEventName: string,
		handler: Function
		) : Function {

		var eventNames = this.parseHigherOrderEventName( higherOrderEventName );

		return( this.setupEventBinding( element, eventNames, handler ) );

	}


	// I bind the given event handler to the given global element selector. Returns a
	// function that tears-down the event binding.
	public addGlobalEventListener(
		higherOrderElement: string,
		higherOrderEventName: string,
		handler: Function
		) : Function {

		var target = this.parseHigherOrderElement( higherOrderElement );
		var eventNames = this.parseHigherOrderEventName( higherOrderEventName );

		return( this.setupEventBinding( target, eventNames, handler ) );

	}


	// I determine if the given event name is supported by this plug-in. For each event
	// binding, the plug-ins are tested in the reverse order of the EVENT_MANAGER_PLUGINS
	// multi-collection. Angular will use the first plug-in that supports the event. In
	// this case, we are supporting KEYDOWN events that use a "+" concatenation.
	public supports( eventName: string ) : boolean {

		return(
			eventName.includes( "keydown." ) &&
			eventName.includes( "+" )
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I parse the "higher order" element selector into an actual browser DOM reference.
	private parseHigherOrderElement( selector: string ) : EventTarget {

		switch( selector ) {
			case "window":
				return( window );
			break;
			case "document":
				return( document );
			break;
			case "body":
				return( document.body );
			break;
			default:
				throw( new Error( `Element selector [${ selector }] not supported.` ) );
			break;
		}

	}


	// I parse the "higher order" event name into a collection of individual event names.
	private parseHigherOrderEventName( eventName: string ) : string[] {

		// We know that the event name starts with "keydown.". As such, we can strip that
		// portion off and then split the event on the "+" to get the individual sub-
		// event names.
		var eventNames = eventName
			.slice( "keydown.".length )
			.split( "+" )
			.map(
				( subEventName ) => {

					return( KeyboardEventHelper.parseEventName( subEventName ) );

				}
			)
		;

		console.log( "Parsed event names:", eventNames );

		return( eventNames );

	}


	// I bind the given event handler to the given event target. I can be used for both
	// local and global targets. Returns a function that tears-down the event binding.
	private setupEventBinding(
		target: EventTarget,
		eventNames: string[],
		handler: Function
		) : Function {

		var pendingEventNames = eventNames.slice();
		var timer: any = null;
		var zone = this.manager.getZone();

		// In order to bypass the change-detection system, we're going to bind the DOM
		// event handler outside of the Angular Zone. The calling context can always
		// choose to re-enter the Angular zone if it needs to (such as when synthesizing
		// an event).
		zone.runOutsideAngular( addProxyFunction );

		return( removeProxyFunction );

		// -- HOISTED FUNCTIONS. -- //

		// I add the proxy function as the DOM-event-binding.
		function addProxyFunction() {

			target.addEventListener( "keydown", proxyFunction, false );

		}

		// I remove the proxy function as the DOM-event-binding.
		function removeProxyFunction() {

			// Clear any pending timer so we don't attempt to mess with state after the
			// event-binding has been removed.
			( timer ) && window.clearTimeout( timer );

			target.removeEventListener( "keydown", proxyFunction, false );

		}

		// I reset the internal tracking for the chained-event sequence.
		function reset() {

			// Reset chained state.
			window.clearTimeout( timer );
			pendingEventNames = eventNames.slice();
			timer = null;

		}

		// I am the event-handler that is bound to the DOM. I keep track of the state of
		// the event sequence as the user triggers individual keydown events.
		function proxyFunction( event: KeyboardEvent ) {

			var eventName = KeyboardEventHelper.getEventName( event );

			// If there's no timer, then we're looking for the first event in the chained
			// event sequence.
			if ( ! timer ) {

				// If the current event DOES NOT MATCH the first event name in the chain,
				// ignore this event.
				if ( pendingEventNames[ 0 ] !== eventName ) {

					return;

				}

				// If the current event DOES MATCH the first event name in the chain,
				// setup the timer - this creates a constraint in which the chained
				// keydown events needs to be consumed.
				timer = window.setTimeout( reset, TIMER_DURATION );

			}

			// ASSERT: At this point, we've either just setup the timer for the first
			// event in the sequence; or, we're already part way through the event-chain.

			var pendingEventName = pendingEventNames.shift() !;

			// The incoming event matches the next event in the chained sequence.
			if ( pendingEventName === eventName ) {

				// CAUTION: Since this keyboard event is part of key combination, we want
				// to cancel the default behavior in case the user is trying to override
				// a native browser behavior.
				event.preventDefault();

				// If there are no more pending event-names, it means the user just
				// executed the last event in the chained sequence! We can now re-enter
				// the Angular Zone and invoke the callback.
				if ( ! pendingEventNames.length ) {

					zone.runGuarded(
						function runInZoneSoChangeDetectionWillBeTriggered() {

							handler( event );

						}
					);
					reset();
					// NOTE: Return is not really needed. Including it for clarity.
					return;

				}

			// The incoming event does NOT MATCH the next event in the chained sequence;
			// however, the incoming event is composed entirely of MODIFIER KEYS. In that
			// case, it's possible that the use is "building up" to the desired key. As
			// such, we're going to ignore intermediary events that only contain
			// modifiers.
			} else if ( KeyboardEventHelper.isModifierOnlyEvent( event ) ) {

				// Since we'll need to re-process this pending event, stuff it back into
				// the pending queue.
				pendingEventNames.unshift( pendingEventName );

			// The incoming event does NOT MATCH the next event in the chained sequence.
			// As such, we need to reset the internal state for tracking.
			} else {

				reset();

			}

		}

	}

}

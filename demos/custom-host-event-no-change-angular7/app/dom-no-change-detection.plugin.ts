
// Import the core angular services.
import { Component } from "@angular/core";
import { EventManager } from "@angular/platform-browser";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type EventTarget = Window | Document | HTMLElement;

// I provide support for basic DOM event bindings that are triggered outside of the
// Angular Zone. This is to facilitate workflows (like event synthesis) that would
// benefit from Angular's template-based event binding but don't need to trigger
// unnecessary change-detection digests.
export class DomEventsNoChangeDetectionPlugin {

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

		var eventName = this.parseHigherOrderEventName( higherOrderEventName );

		return( this.setupEventBinding( element, eventName, handler ) );

	}


	// I bind the given event handler to the given global element selector. Returns a
	// function that tears-down the event binding.
	public addGlobalEventListener(
		higherOrderElement: string,
		higherOrderEventName: string,
		handler: Function
		) : Function {

		var target = this.parseHigherOrderElement( higherOrderElement );
		var eventName = this.parseHigherOrderEventName( higherOrderEventName );

		return( this.setupEventBinding( target, eventName, handler ) );
		
	}


	// I determine if the given event name is supported by this plug-in. For each event
	// binding, the plug-ins are tested in the reverse order of the EVENT_MANAGER_PLUGINS
	// multi-collection. Angular will use the first plug-in that supports the event.
	public supports( eventName: string ) : boolean {

		return( eventName.endsWith( ".noChangeDetection" ) );

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


	// I parse the "higher order" event name into the event name that is recognizable
	// by the browser. For example, parses "click.noChangeDetection" into "click".
	private parseHigherOrderEventName( eventName: string ) : string {

		return( eventName.split( "." ).shift() || "" );

	}


	// I bind the given event handler to the given event target. I can be used for both
	// local and global targets. Returns a function that tears-down the event binding.
	private setupEventBinding(
		target: EventTarget,
		eventName: string,
		handler: Function
		) : Function {

		// In order to bypass the change-detection system, we're going to bind the DOM
		// event handler outside of the Angular Zone. The calling context can always
		// choose to re-enter the Angular zone if it needs to (such as when synthesizing
		// an event).
		this.manager.getZone().runOutsideAngular( addProxyFunction );

		return( removeProxyFunction );

		// -- Hoisted Functions -- //

		function addProxyFunction() {

			target.addEventListener( eventName, proxyFunction, false );

		}

		function removeProxyFunction() {

			target.removeEventListener( eventName, proxyFunction, false );

		}

		function proxyFunction( event: Event ) {

			handler( event );

		}

	}

}


// Import the core angular services.
import { EventManager } from "@angular/platform-browser";


interface EventBinding {
	type: string;
	keys: string;
	priority: number;
	terminal: boolean;
	handler: Function;
};

interface ParsedEventName {
	type: string;
	keys: string;
	priority: number;
	terminal: boolean;
};


// I provide a DOM event plugin that allows keydown and keyup events to be prioritized 
// at the document level, complete with granular prioritization and terminal events.
export class GlobalKeyEventsPlugin { /* WISH: extends KeyEventsPlugin | EventManagerPlugin */

	// I am the Event Plugin manager (injected by the plugin manager).
	public manager: EventManager;

	// I hold the collection of key bindings.
	private bindings: EventBinding[];
	
	// I am the Regular Expression pattern used to test and parse event names.
	private eventNamePattern: RegExp;

	// I determine if the root event handlers have been configured yet.
	private isConfigured: boolean;


	// I initialize the component.
	constructor() {

		this.bindings = [];
		this.isConfigured = false;

		// Captures several groups:
		// --
		// 1) {Required} Event type, ex: "keydown".
		// 2) {Required} Key combination, ex: "Command.H".
		// 3) {Required} Priority, ex "100".
		// 4) {Optional} Termianl flag, "T".
		this.eventNamePattern = /^(key(?:down|up))((?:\.[^.\s]+)+)\s*@\s*(\d+)\s*(T)?$/i;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I add a local event binding and return the deregistration function for the event.
	// --
	// CAUTION: Not supported. Ideally, this would be supplied by the base EventManagerPlugin
	// class; but, at the time of this writing (RC1) that class is not be exposed by any
	// of the Angular barrels.
	public addEventListener( 
		element: HTMLElement, 
		eventName: string, 
		handler: Function
		) : Function {
	
		throw( new Error( "Local event listener not implemented." ) );

	}

	
	// I add a global event binding and return the deregistration function for the event.
	// --
	// CAUTION: Event handlers are always bound to "document" regardless of the target
	// ("document" or "window") that is being supplied.
	public addGlobalEventListener(
		target: string, 
		eventName: string, 
		handler: Function 
		) : Function {

		this.ensureRootHandlers();

		var eventConfig = this.parseEventName( eventName );
		var eventBinding = {
			type: eventConfig.type,
			keys: eventConfig.keys,
			priority: eventConfig.priority,
			terminal: eventConfig.terminal,
			handler: handler
		};

		return( this.addBinding( eventBinding ) );

	}


	// I determine if the given event is supported by this plugin.
	// --
	// WARNING: This plugin only handles the GLOBAL version of events - all local
	// versions of "supported" events will throw an error.
	public supports( eventName: string ) : boolean {

		return( this.eventNamePattern.test( eventName ) );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I add the given event binding and return the deregistration function for it.
	private addBinding( eventBinding: EventBinding ) : Function {

		// Try to insert the binding in the bindings collection in priority order.
		for ( var i = 0, length = this.bindings.length ; i < length ; i++ ) {

			if ( this.bindings[ i ].priority <= eventBinding.priority ) {

				this.bindings.splice( i, 0, eventBinding );
				break;

			}

		}

		// If the offset matches the length at this point, we didn't break out of the
		// previous loop which means we didn't insert the binding. If so, just push
		// it onto the end.
		if ( i === length ) {

			this.bindings.push( eventBinding );

		}

		var deregistration = () => {

			this.removeBinding( eventBinding );

		};

		return( deregistration );

	}


	// I ensure that the root key handlers are configured.
	// --
	// CAUTION: These will remain bound for the duration of the application.
	private ensureRootHandlers() : void {

		if ( this.isConfigured ) {

			return;

		}

		this.isConfigured = true;
		this.manager.getZone().runOutsideAngular(
			() => {

				document.addEventListener( "keydown", this.handleKeyEvent, true );
				document.addEventListener( "keyup", this.handleKeyEvent, true );

			}
		);

	}


	// I find and return the event bindings that match the given event type and key 
	// configuration. The bindings are returned in DESCENDING PRIORITY order.
	private findBindingsForEvent( event: KeyboardEvent ) : EventBinding[] {

		var parts = [ this.getEventKey( event ).toLowerCase() ];

		if ( event.altKey ) parts.push( "alt" );
		if ( event.ctrlKey ) parts.push( "control" );
		if ( event.metaKey ) parts.push( "meta" );
		if ( event.shiftKey ) parts.push( "shift" );

		var keys = parts.sort().join( "." );

		var filteredBindings = this.bindings.filter(
			function operator( binding: EventBinding ) : boolean {

				return( 
					( binding.type === event.type ) && 
					( binding.keys === keys ) 
				);

			}
		);

		return( filteredBindings );

	}


	// I return the normalized key represented by the given keyboard event. This does 
	// not include modifiers.
	// --
	// CAUTION: Most of this logic is taken from the core KeyEventsPlugin code but, 
	// with some of the logic removed. This is simplified for the demo.	
	private getEventKey( event: KeyboardEvent ) : string {

		var key = ( event.key || event.keyIdentifier || "Unidentified" );

		if ( key.startsWith( "U+" ) ) {
			
			key = String.fromCharCode( parseInt( key.slice( 2 ), 16 ) );

		}

		var normalizationMap = {
			"\b": "Backspace",
			"\t": "Tab",
			"\x7F": "Delete",
			"\x1B": "Escape",
			"Del": "Delete",
			"Esc": "Escape",
			"Left": "ArrowLeft",
			"Right": "ArrowRight",
			"Up": "ArrowUp",
			"Down": "ArrowDown",
			"Menu": "ContextMenu",
			"Scroll": "ScrollLock",
			"Win": "OS",
			" ": "Space",
			".": "Dot"
		};

		return( normalizationMap[ key ] || key );

	}


	// I handle the keyboard events at the global level and invoke the matching locally-
	// bound handlers (in the Angular Zone instance).
	// --
	// CAUTION: Using arrow-function hack to pre-bind method context.
	private handleKeyEvent = ( event: KeyboardEvent ) : void => {

		if ( this.shouldIgnoreEvent( event ) ) {

			return;

		}

		var bindings = this.findBindingsForEvent( event );

		for ( var i = 0, length = bindings.length ; i < length ; i++ ) {

			var binding = bindings[ i ];

			var result = this.manager.getZone().runGuarded(
				function runInZone() {

					return( binding.handler( event ) )

				}
			);

			if ( binding.terminal || ( result === false ) ) {

				// NOTE: Since we're already at the root of the document, there's no
				// point in stopping propagation - there's nowhere else for the event
				// to go, other than to try lower-priority bindings.
				break;

			}

		}

	}


	// I normalized the keys string so that it can be consistently compared.
	private normalizeKeys( keys: string ) : string {

		var parts = keys
			.slice( 1 )
			.toLowerCase()
			.split( /\./g )
			.sort()
		;

		return( parts.join( "." ) );

	}


	// I parse the eventName into a normalized structure.
	private parseEventName( eventName: string ) : ParsedEventName {

		var parts = eventName.match( this.eventNamePattern );

		return({
			type: parts[ 1 ].toLowerCase(),
			keys: this.normalizeKeys( parts[ 2 ] ),
			priority: +parts[ 3 ],
			terminal: !! parts[ 4 ]
		});

	}


	// I remove the given event binding from the bindings collection.
	private removeBinding( eventBinding: EventBinding ) : void {

		var index = this.bindings.indexOf( eventBinding );

		// NOTE: We don't have to check the index because this will never be called with
		// anything other than a valid binding (as this is a closed system).
		this.bindings.splice( index, 1 );

	}


	// I determine if the given event should be ignored by the root event handler.
	private shouldIgnoreEvent( event: KeyboardEvent ) : boolean {

		// We need to ignore key events that are triggered by any kind of input control.
		// Otherwise, we run the risk of too many collisions with local key events.
		var inputPattern = /^(input|select|textarea)$/i;

		return( inputPattern.test( event.target.nodeName ) );

	}

}
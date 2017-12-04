// Import the core angular services.
import { Injectable } from "@angular/core";
import { NgZone } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

type Terminal = boolean | "match";

interface ListenerOptions {
	priority: number;
	terminal?: Terminal;
	terminalWhitelist?: string[];
	inputs?: boolean;
}

interface Listener {
	priority: number;
	terminal: Terminal;
	terminalWhitelist: TerminalWhitelist;
	inputs: boolean;
	bindings: Bindings;
}

interface Handler {
	( event: KeyboardEvent ) : boolean | void;
}

interface Bindings {
	[ key: string ]: Handler;
}

interface NormalizedKeys {
	[ key: string ]: string;
}

interface TerminalWhitelist {
	[ key: string ]: boolean;
}

export interface Unlisten {
	() : void;
}

// Map to normalized keys across different browser implementations.
// --
// https://github.com/angular/angular/blob/5.0.5/packages/platform-browser/src/browser/browser_adapter.ts#L25-L42
var KEY_MAP = {
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

// NOTE: These will only be applied after the key has been lower-cased. As such, both the
// alias and the final value (in this mapping) should also be lower-case.
var KEY_ALIAS = {
	command: "meta",
	ctrl: "control",
	del: "delete",
	down: "arrowdown",
	esc: "escape",
	left: "arrowleft",
	right: "arrowright",
	up: "arrowup"
};

@Injectable()
export class KeyboardShortcuts {

	private listeners: Listener[];
	private normalizedKeys: NormalizedKeys;
	private zone: NgZone;

	// I initialize the keyboard shortcuts service.
	constructor( zone: NgZone ) {

		this.zone = zone;

		this.listeners = [];
		this.normalizedKeys = Object.create( null );

		// Since we're going to create a root event-handler for the keydown event, we're
		// gonna do this outside of the NgZone. This way, we're not constantly triggering
		// change-detection for every key event - we'll only re-enter the Angular Zone 
		// when we have an event that is actually being consumed by one of our components.
		this.zone.runOutsideAngular(
			() : void => {

				window.addEventListener( "keydown", this.handleKeyboardEvent );

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I configure key-event listener at the given priority. Returns a Function that can
	// be used to unbind the listener.
	public listen( bindings: Bindings, options: ListenerOptions ) : Unlisten {

		var listener = this.addListener({
			priority: options.priority,
			terminal: this.normalizeTerminal( options.terminal ),
			terminalWhitelist: this.normalizeTerminalWhitelist( options.terminalWhitelist ),
			inputs: this.normalizeInputs( options.inputs ),
			bindings: this.normalizeBindings( bindings )
		});

		var unlisten = () : void => {
			
			this.removeListener( listener );

		};

		return( unlisten );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I add the listener to the internal collection in DESCENDING priority order.
	private addListener( listener: Listener ) : Listener {

		this.listeners.push( listener );
		this.listeners.sort(
			( a: Listener, b: Listener ) : number => {

				// We want to sort the listeners in DESCENDING priority order so that the 
				// higher-priority items are at the start of the collection - this will 
				// make it easier to loop over later (highest priority first).
				if ( a.priority < b.priority ) {
					
					return( 1 );

				} else if ( a.priority > b.priority ) {

					return( -1 );

				} else {

					return( 0 );

				}

			}
		);

		return( listener );

	}


	// I get the normalized event-key from the given event.
	// --
	// CAUTION: Most of this logic is taken from the core KeyEventsPlugin code but,
	// with some of the logic removed. This is simplified for the demo.
	private getKeyFromEvent( event: KeyboardEvent ) : string {

		var key = ( event.key || event[ "keyIdentifier" ] || "Unidentified" );

		if ( key.startsWith( "U+" ) ) {

			key = String.fromCharCode( parseInt( key.slice( 2 ), 16 ) );

		}

		var parts = [ KEY_MAP[ key ] || key ];

		if ( event.altKey ) parts.push( "Alt" );
		if ( event.ctrlKey ) parts.push( "Control" );
		if ( event.metaKey ) parts.push( "Meta" );
		if ( event.shiftKey ) parts.push( "Shift" );

		return( this.normalizeKey( parts.join( "." ) ) );

	}


	// I handle the keyboard events for the root handler (and delegate to the listeners).
	private handleKeyboardEvent = ( event: KeyboardEvent ) : void => {

		var key = this.getKeyFromEvent( event );
		var isInputEvent = this.isEventFromInput( event );
		var handler: Handler;

		// Iterate over the listeners in DESCENDING priority order.
		for ( var listener of this.listeners ) {

			if ( handler = listener.bindings[ key ] ) {

				// Execute handler if this is NOT an input event that we need to ignore.
				if ( ! isInputEvent || listener.inputs ) {

					// Right now, we're executing outside of the NgZone. As such, we 
					// have to re-enter the NgZone so that we can hook back into change-
					// detection. Plus, this will also catch errors and propagate them 
					// through application properly.
					var result = this.zone.runGuarded(
						() : boolean | void => {

							return( handler( event ) );

						}
					);

					// If the handler returned an explicit False, we're going to treat 
					// this listener as Terminal, regardless of the original settings.
					if ( result === false ) {

						return;

					// If the handler returned an explicit True, we're going to treat
					// this listener as NOT Terminal, regardless of the original settings.
					} else if ( result === true ) {

						continue;

					}

				}

				// If this listener is terminal for matches, stop propagation.
				if ( listener.terminal === "match" ) {

					return;

				}

			}

			// If this listener is terminal for all events, stop propagation (unless the
			// event is white-listed for propagation).
			if ( ( listener.terminal === true ) && ! listener.terminalWhitelist[ key ] ) {

				return;
				
			}

		} // END: For-loop.

	}


	// I determine if the given event originated from a form input element.
	private isEventFromInput( event: KeyboardEvent ) : boolean {

		if ( event.target instanceof Node ) {

			switch ( event.target.nodeName ) {
				case "INPUT":
				case "SELECT":
				case "TEXTAREA":
					return( true );
					// @ts-ignore: TS7027: Unreachable code detected.
				break;
				default:
					return( false );
					// @ts-ignore: TS7027: Unreachable code detected.
				break;
			}
			
		}

		return( false );

	}


	// I return a bindings collection in which the keys of the given bindings have been
	// normalized into a predictable format.
	private normalizeBindings( bindings: Bindings ) : Bindings {

		var normalized = Object.create( null );

		for ( var key in bindings ) {

			normalized[ this.normalizeKey( key ) ] = bindings[ key ];

		}

		return( normalized );

	}


	// I normalize the inputs option.
	private normalizeInputs( inputs: boolean | undefined ) : boolean {

		if ( inputs === undefined ) {

			return( false );

		}

		return( inputs );

	}


	// I return the given key in a normalized, predictable format.
	private normalizeKey( key: string ) : string {

		if ( ! this.normalizedKeys[ key ] ) {

			this.normalizedKeys[ key ] = key
				.toLowerCase()
				.split( "." )
				.map(
					( segment ) : string => {

						return( KEY_ALIAS[ segment ] || segment );

					}
				)
				.sort()
				.join( "." )
			;

		}

		return( this.normalizedKeys[ key ] );

	}


	// I normalize the terminal option.
	private normalizeTerminal( terminal: Terminal | undefined ) : Terminal {

		if ( terminal === undefined ) {

			return( true );

		}

		return( terminal );

	}


	// I normalize the terminalWhitelist option.
	private normalizeTerminalWhitelist( keys: string[] | undefined ) : TerminalWhitelist {

		var normalized = Object.create( null );

		if ( keys ) {

			for ( var key of keys ) {

				normalized[ this.normalizeKey( key ) ] = true;

			}
			
		}

		return( normalized );

	}


	// I remove the given listener from the internal collection.
	private removeListener( listenerToRemove: Listener ) : void {

		this.listeners = this.listeners.filter(
			( listener: Listener ) : boolean => {

				return( listener !== listenerToRemove );

			}
		);

	}

}

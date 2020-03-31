
// CAUTION: Much of what is in this file has been COPIED FROM THE ANGULAR PROJECT. As
// such, I'm not going to comment too much on it. It is here to help normalize the way
// keyboard events are configured by the developer and interpreted by the browser. To
// see how ANGULAR originally defined this data, read more in the source:
// --
// https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/events/key_events.ts

var DOM_KEY_LOCATION_NUMPAD = 3;

interface KeyMap {
	[ key: string ]: string;
};

// Map to convert some key or keyIdentifier values to what will be returned by the
// getEventKey() method.
var  _keyMap: KeyMap = {
  // The following values are here for cross-browser compatibility and to match the W3C
  // standard cf http://www.w3.org/TR/DOM-Level-3-Events-key/
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
  "Win": "OS"
};

// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
var _chromeNumKeyPadMap = {
  "A": "1",
  "B": "2",
  "C": "3",
  "D": "4",
  "E": "5",
  "F": "6",
  "G": "7",
  "H": "8",
  "I": "9",
  "J": "*",
  "K": "+",
  "M": "-",
  "N": ".",
  "O": "/",
  "\x60": "0",
  "\x90": "NumLock"
};


export class KeyboardEventHelper {

	// I return the key from the given KeyboardEvent with special keys normalized for
	// internal use.
	static getEventKey( event: KeyboardEvent ) : string {

		var key = KeyboardEventHelper.getEventKeyRaw( event ).toLowerCase();

		switch ( key ) {
			case " ":
				return( "space" );
			break;
			case ".":
				return( "dot" );
			break;
			default:
				return( key );
			break;
		}

	}


	// I return the raw key from the given KeyboardEvent. This is normalized for cross-
	// browser compatibility; but, doesn't represent a format that is normalized for
	// internal usage.
	static getEventKeyRaw( event: any ) : string {

		var key = event.key;

		if ( key == null ) {

			key = event.keyIdentifier;
			// keyIdentifier is defined in the old draft of DOM Level 3 Events
			// implemented by Chrome and Safari cf
			// http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
			if ( key == null ) {

				return( "Unidentified" );

			}

			if ( key.startsWith( "U+" ) ) {

				key = String.fromCharCode( parseInt( key.substring( 2 ), 16 ) );

				if ( ( event.location === DOM_KEY_LOCATION_NUMPAD ) && _chromeNumKeyPadMap.hasOwnProperty( key )  ) {

					// There is a bug in Chrome for numeric keypad keys:
					// https://code.google.com/p/chromium/issues/detail?id=155654
					// 1, 2, 3 ... are reported as A, B, C ...
					key = ( _chromeNumKeyPadMap as any )[ key ];

				}

			}

		}

		return( _keyMap[ key ] || key );

	}


	// I return the normalized key-combination from the given KeyboardEvent. This
	// includes the primary key as well as any modifier keys, composed in a consistent
	// order and format. The result of this method can be compared to the result of the
	// .parseEventName() method.
	static getEventName( event: KeyboardEvent ) : string {

		var parts: string[] = [];

		// Always add modifier keys in alphabetical order.
		( event.altKey ) && parts.push( "alt" );
		( event.ctrlKey ) && parts.push( "control" );
		( event.metaKey ) && parts.push( "meta" );
		( event.shiftKey ) && parts.push( "shift" );

		// Always add the key last.
		parts.push( KeyboardEventHelper.getEventKey( event ) );

		return( parts.join( "." ) );

	}


	// I determine if the given KeyboardEvent represents some combination of modifier
	// keys without any other key.
	static isModifierOnlyEvent( event: KeyboardEvent ) : boolean {

		switch ( KeyboardEventHelper.getEventKey( event ) ) {
			case "alt":
			case "control":
			case "meta":
			case "shift":
				return( true );
			break;
			default:
				return( false );
			break;
		}

	}


	// I parse the given key name for internal use. This allows for some alias to be
	// used in the event-bindings while still using a consistent internal representation.
	static parseEventKeyAlias( keyName: string ) : string {

		switch( keyName ) {
			case "esc":
				return( "escape" );
			break;
			default:
				return( keyName );
			break;
		}

	}


	// I parse the given keyboard event name into a consistent formatting. It is assumed
	// that the event-type (ex, keydown) has already been removed. The result of this
	// method can be compared to the result of the .getEventName() method.
	static parseEventName( eventName: string ) : string {

		var parts = eventName.toLowerCase().split( "." );

		var altKey = false;
		var controlKey = false;
		var metaKey = false;
		var shiftKey = false;

		// The key is always ASSUMED to be the LAST item in the event name.
		var key = KeyboardEventHelper.parseEventKeyAlias( parts.pop() ! );

		// With the remaining parts, let's look for modifiers.
		for ( var part of parts ) {

			switch ( part ) {
				case "alt":
					altKey = true;
				break;
				case "control":
					controlKey = true;
				break;
				case "meta":
					metaKey = true;
				break;
				case "shift":
					shiftKey = true;
				break;
				default:
					throw( new Error( `Unexpected event name part: ${ part }` ) );
				break;
			}

		}

		var normalizedParts: string[] = [];

		// Always add modifier keys in alphabetical order.
		( altKey ) && normalizedParts.push( "alt" );
		( controlKey ) && normalizedParts.push( "control" );
		( metaKey ) && normalizedParts.push( "meta" );
		( shiftKey ) && normalizedParts.push( "shift" );

		// Always add the key last.
		normalizedParts.push( key );

		return( normalizedParts.join( "." ) );

	}

}

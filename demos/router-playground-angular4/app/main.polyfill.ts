
// Import these libraries for their side-effects.
import "core-js/client/shim.min.js";
import "zone.js/dist/zone.js";
import "reflect-metadata/Reflect.js";

// Load the Web Animations API polyfill for most browsers (basically any browser other than Chrome and Firefox).
// import "web-animations-js/web-animations.min.js";



// Polyfill for CustomEvent function (needed for IE).
// --
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
(function () {

	// Type-cast window to <any> so that we can add missing feature to it without the 
	// TypeScript compiler complaining.
	var win = <any>window;

	if ( typeof( win.CustomEvent ) === "function" ) {

		return false;

	}

	var defaultParams: any = {
		bubbles: false,
		cancelable: false,
		detail: undefined 
	};

	function CustomEvent ( eventType: string, params: any ) : Event {

		params = ( params || defaultParams );

		var event = <any>document.createEvent( "CustomEvent" );
		event.initCustomEvent( eventType, params.bubbles, params.cancelable, params.detail );

		return( <Event>event );

	}

	CustomEvent.prototype = win.Event.prototype;

	win.CustomEvent = CustomEvent;

})();

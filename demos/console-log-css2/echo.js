window.echo = (function echoFactory() {
	"use strict";

	var stylers = {
		// Text colors.
		black: "color: black",
		red: "color: red",
		green: "color: green",
		blue: "color: blue",
		yellow: "color: yellow",
		magenta: "color: magenta",
		cyan: "color: cyan",
		white: "color: white",
		gray: "color: gray",
		gold: "color: gold",

		// Background colors.
		bgBlack: "background-color: black",
		bgRed: "background-color: red",
		bgGreen: "background-color: green",
		bgBlue: "background-color: blue",
		bgYellow: "background-color: yellow",
		bgMagenta: "background-color: magenta",
		bgCyan: "background-color: cyan",
		bgWhite: "background-color: white",
		bgGray: "background-color: gray",
		bgGold: "background-color: gold",

		// Text modifiers.
		bold: "font-weight: bold",
		lighter: "font-weight: lighter",
		italic: "font-style: italic",
		strikethrough: "text-decoration: line-through",
		underline: "text-decoration: underline",
		large: "font-size: 16px",
		larger: "font-size: 22px",
		largest: "font-size: 26px",
		massive: "font-size: 36px",

		// Block modifiers.
		padded: "display: inline-block ; padding: 4px 6px",
		rounded: "display: inline-block ; border-radius: 4px"
	};

	var rootStyler = "";

	// As "styler" functions are called, they are going to push values and CSS onto this
	// queue. Then, when the "log" functions are called, this queue will be processed and
	// cleared (for the next set of styler invocations).
	var logItemQueue = [];

	// When the "styler" functions are called, they populate the queue (above). As such,
	// their return value isn't directly consumable. Therefore, they return this token
	// which helps our queue-processor differentiate from a styler value vs. a raw value.
	// And, the embedded warning helps the developer understand where / if they made a
	// mistake in how the styler return value was used.
	var ECHO_TOKEN = {
		warning: "This value should not be used directly - it should be an argument to an echo invocation."
	};
	var RESET_INPUT = "%c ";
	var RESET_CSS = "";

	var coreApi = {
		log: wrapConsoleFunction( console.log ),
		warn: wrapConsoleFunction( console.warn ),
		error: wrapConsoleFunction( console.error ),
		trace: wrapConsoleFunction( console.trace ),
		group: wrapConsoleFunction( console.group ),
		groupEnd: wrapConsoleFunction( console.groupEnd ),
		defineStyler: defineStyler,
		defineRootStyler: defineRootStyler
	};

	// We want all of our "stylers" to hang off the core API. And, since the collection
	// of stylers can change over time (using aliases and customizations), we have to
	// proxy the core API such that we can dynamically see if a styler is being accessed.
	var coreApiProxy = new Proxy(
		coreApi,
		{
			get: function( target, prop, receiver ) {

				// Intercept styler access.
				if ( prop in stylers ) {

					return( createStylerProxy( prop ) );

				}

				return( target[ prop ] );

			}
		}
	);

	return( coreApiProxy );

	// ---
	// PUBLIC METHODS.
	// ---

	// I define the root CSS that all other styles will start with.
	// --
	// NOTE: This method should be called before any other stylers are created.
	function defineRootStyler( rawCSS ) {

		rootStyler = rawCSS;
		return( this );

	}


	// I allow new stylers to be defined. The "newStyler" can be a string of raw CSS; or,
	// it can be a reference to another styler.
	function defineStyler( name, newStyler ) {

		if ( typeof( newStyler ) === "string" ) {

			stylers[ name ] = newStyler;
			return( this );

		} else {

			stylers[ name ] = newStyler.proxyCSS;
			return( this );

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// Every "styler" needs to hang off of very other styler. And, as each styler is
	// accessed, it needs to aggregate the pending CSS from all of the previous stylers
	// in the access path. To do this, we're going to use a Proxy object.
	function createStylerProxy( rootProp, rootCSS = "" ) {

		var proxyCSS = ( rootCSS + ";" + stylers[ rootProp ] );

		// Every "styler" ultimately needs to be a Function call that applies the
		// aggregate CSS to the given value.
		var applyAggregateCSS = function( value ) {

			logItemQueue.push({
				value: value,
				css: ( rootStyler + ";" + proxyCSS )
			});

			return( ECHO_TOKEN );

		};

		var stylerProxy = new Proxy(
			applyAggregateCSS,
			{
				get: function( target, prop ) {

					// Since we can alias styler proxies, we need a way to return the
					// aggregated CSS for any given proxy.
					if ( prop === "proxyCSS" ) {

						return( proxyCSS );

					}

					if ( prop in stylers ) {

						return( createStylerProxy( prop, proxyCSS ) );

					}

				}
			}
		);

		return( stylerProxy );

	}


	// I provide an echo-based wrapper for the given Console Function. This uses an
	// internal queue to aggregate values before calling the underlying Console Function
	// with the desired CSS formatting.
	function wrapConsoleFunction( consoleFunction ) {

		function consoleFunctionWrapper() {

			// As we loop over the arguments, we're going to aggregate a set of inputs
			// and modifiers. The Inputs will ultimately be collapsed down into a single
			// string that acts as the first console.log parameter while the modifiers
			// are then SPREAD into console.log as 2...N.
			// --
			// NOTE: After each input/modifier pair, I'm adding a RESET pairing. This
			// implicitly resets the CSS after every formatted pairing.
			var inputs = [];
			var modifiers = [];

			for ( var rawArg of arguments ) {

				// When the styler methods are called, they return a special token. This
				// token indicates that we should pull the corresponding value out of the
				// QUEUE instead of trying to consume the given argument directly.
				if ( rawArg === ECHO_TOKEN ) {

					var item = logItemQueue.shift();

					inputs.push( ( "%c" + item.value ), RESET_INPUT );
					modifiers.push( item.css, RESET_CSS );

				// For every other argument type, output the value directly.
				} else {

					if (
						( typeof( rawArg ) === "object" ) ||
						( typeof( rawArg ) === "function" )
						) {

						inputs.push( "%o", RESET_INPUT );
						modifiers.push( rawArg, RESET_CSS );

					} else {

						inputs.push( ( "%c" + rawArg ), RESET_INPUT );
						modifiers.push( RESET_CSS, RESET_CSS );

					}

				}

			}

			consoleFunction( inputs.join( "" ), ...modifiers );

			// Once we output the aggregated value, reset the queue. This should have
			// already been emptied by the .shift() calls; but the explicit reset here
			// acts as both a marker of intention as well as a fail-safe.
			logItemQueue = [];

		}

		return( consoleFunctionWrapper );

	}

})();

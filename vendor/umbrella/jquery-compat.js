"use strict";

// First, I want to add a number of event-type convenience methods. Meaning, adding a
// .click() method instead of an .on(click) method. This just makes the transition from
// jQUery to Umbrella JS a bit easier.
var eventTypes = [
	"click",
	"error",
	"focus",
	"keydown",
	"keyup",
	"load",
	"mousedown",
	"mouseenter",
	"mouseleave",
	"mouseup",
	"scroll",
	"submit"
];

eventTypes.forEach(
	function iterator( eventType ) {

		// u.prototype.mouseenter = function proxyFunction( handler ) { .. }
		u.prototype[ eventType ] = function proxyFunction() {

			var restArguments = Array.prototype.slice.call( arguments );

			if ( restArguments.length ) {

				return( u.prototype.on.apply( this, [ eventType ].concat( restArguments ) ) );

			}

			// If the convenience method is invoked with NO ARGUMENTS, we're going to
			// consider it a request to trigger the native method on the underlying
			// nodes. Some events use native DOM methods; others simulate the event using
			// trigger.
			switch ( eventType ) {
				case "blur":
				case "click":
				case "focus":
				case "submit":

					// Use the native DOM methods.
					this.each(
						function iterator( node ) {

							node[ eventType ]();

						}
					);

				break;
				default:

					// Use the event simulation.
					this.trigger( eventType );

				break;
			}
			return( this );

		};

	}
);

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

u.prototype.appendTo = function( target ) {

	u( target ).append( this );
	return( this );

};

u.prototype.css = function( styleProps ) {

	this.each(
		function iterator( node ) {

			Object.assign( node.style, styleProps );

		}
	);
	return( this );

};

// CAUTION: The hide/show methods bake in the assumption that showing and hiding are
// always based on block elements. Meaning, these methods do not store the previous
// display value and reinstate it, they always use "block" to restore visibility.
u.prototype.hide = function() {

	return( this.css({ display: "none" }) );

};

u.prototype.prependTo = function( target ) {

	u( target ).prepend( this );
	return( this );

};

u.prototype.prop = function( name, value ) {

	if ( value === undefined ) {

		return( this.first()[ name ] );

	}

	this.each(
		function iterator( node ) {

			node[ name ] = value;

		}
	);
	return( this );

};

// CAUTION: The hide/show methods bake in the assumption that showing and hiding are
// always based on block elements. Meaning, these methods do not store the previous
// display value and reinstate it, they always use "block" to restore visibility.
u.prototype.show = function() {

	return( this.css({ display: "block" }) );

};

u.prototype.val = function( value ) {

	return( this.prop( "value", value ) );

}

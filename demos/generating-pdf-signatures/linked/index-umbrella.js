
// Some augmentation to the Umbrella.js API to make it easier to use.

u.prototype.appendTo = function( target ) {

	u( target ).append( this );
	return( this );

};

u.prototype.css = function( styleProps ) {

	this.each(
		function iterator( node ) {

			for ( var name in styleProps ) {

				node.style.setProperty( name, styleProps[ name ] );

			}

		}
	);
	return( this );

};

u.prototype.prop = function( name, value ) {

	// Getter mode, only acts on the first element.
	if ( value === undefined ) {

		return( this.first()[ name ] );

	}

	// Setter mode, applies value to all elements.
	this.each(
		function iterator( node ) {

			node[ name ] = value;

		}
	);
	return( this );

};

u.prototype.val = function( value ) {

	return( this.prop( "value", value ) );

};

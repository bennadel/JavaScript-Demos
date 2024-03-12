
// Constants for the types.
var ARRAY = "array";
var BOOLEAN = "boolean";
var NULL = "null";
var NUMBER = "number";
var OBJECT = "object";
var STRING = "string";

/**
* I return the constant denoting the type of the given value.
*/
function getType( value ) {

	if ( value === null ) {

		return( NULL );

	}

	if ( isString( value ) ) {

		return( STRING );

	}

	if ( isNumber( value ) ) {

		return( NUMBER );

	}

	if ( isBoolean( value ) ) {

		return( BOOLEAN );

	}

	if ( isArray( value ) ) {

		return( ARRAY );

	}

	return( OBJECT );

}

/**
* I determine if the given value is an array.
*/
function isArray( value ) {

	return( value instanceof Array );

}

/**
* I determine if the given value is a Boolean.
*/
function isBoolean( value ) {

	return( typeof value === "boolean" );

}

/**
* I determine if the given value is a number.
*/
function isNumber( value ) {

	return( typeof value === "number" );

}

/**
* I determine if the given value is a string.
*/
function isString( value ) {

	return( typeof value === "string" );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
* I provide means of persisting state in the URL hash.
*/
var hashStore = {
	get: function() {

		try {

			return( atob( window.location.hash.slice( 1 ) ) );

		} catch ( error ) {

			console.error( error );
			return( "" );

		}

	},
	set: function( data ) {

		try {

			window.location.hash = btoa( data );

		} catch ( error ) {

			console.error( error );

		}

	}

};

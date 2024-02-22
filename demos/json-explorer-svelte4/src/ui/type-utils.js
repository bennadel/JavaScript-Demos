
// Constants for the types.
export var ARRAY = "array";
export var BOOLEAN = "boolean";
export var NULL = "null";
export var NUMBER = "number";
export var OBJECT = "object";
export var STRING = "string";

/**
* I return the constant denoting the type of the given value.
*/
export function getType( value ) {

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
export function isArray( value ) {

	return( value instanceof Array );

}

/**
* I determine if the given value is a Boolean.
*/
export function isBoolean( value ) {

	return( typeof value === "boolean" );

}

/**
* I determine if the given value is a number.
*/
export function isNumber( value ) {

	return( typeof value === "number" );

}

/**
* I determine if the given value is a string.
*/
export function isString( value ) {

	return( typeof value === "string" );

}

// Passing a string to an :string argument.
logString( "I am a String" );

// Passing a Boolean to a :string argument - this will raise a type-checking error.
logString( true );

// Passing an ANY to a :string argument - this will NOT RAISE a type-checking error 
// because ANY essentially "opts out" of type-checking.
// --
// Read More: https://github.com/Microsoft/TypeScript/issues/9999
logString( <any>( new Date() ) );

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

function logString( value: string ) : void {

	if ( value.toLowerCase ) {

		console.log( value.toLowerCase() );
		
	}

	// Even if we pass-in an ANY type, opting out of parameter type checking, the 
	// :string type is still used to validate the parameter / value consumption 
	// within the function body itself. As such, this guard statement will raise a 
	// type-checking error because .getTime() is NOT a property of a String.
	if ( value.getTime ) {

		console.log( value.getTime() );

	}

}

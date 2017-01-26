
// Here we are defining an interface for a Function that accepts two arguments and 
// returns nothing (in this case, it's the typical Node.js callback pattern).
interface ICallback {
	( error: Error, result?: number ) : void;
}


// I generate a random number and pass it to the given callback which is expected to
// uphold the ICallback interface (ie, accepts error or result).
function getRandomNumber( callback: ICallback ) : void {

	var value = Math.random();

	( value >= 0.5 )
		// Invoke callback as result callback.
		? callback( null, value )

		// Invoke callback as error callback (no result).
		: callback( new Error( "Oops, random number too low." ) )
	;

}


// Now, let's test our random number generator a couple of times to get random results.
for ( var i = 0 ; i < 10 ; i++ ) {

	getRandomNumber(
		( error: Error, result: number ) : void => {

			console.log( `${ i }:`, ( result || error.message ) );

		}
	);
	
}














console.log( " - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - " );
console.log( " - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - " );
console.log( " - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - " );













// It is also technically possible to define a Function / Callback signature inline 
// by using the (() => X) syntax; but, for the sake of readability, please please please
// don't do this -- don't be that guy.

// Example: As an argument (to takeCallback() function).
function takeCallback( callback: ( error: Error, result?: number ) => void ) : void {
	// ...
}

// Example: As a return value (from buildCallback() function).
function buildCallback() : ( error: Error, result?: number ) => void {

	return callback;

	function callback( error: Error, result: number ) : void {
		// ...
	}

}

// NOTE: If you browser supports ES6, you can simply "extends Error". But, not all 
// browsers support ES6 class definitions yet.

interface ErrorSubclass extends Error {
	// Here, we are defining an interface - ErrorSubclass - that shares the same name as 
	// our class. In TypeScript, this allows us to define aspects of the Class that we
	// don't actually have to implement in the class definition. In this case, we're 
	// using the interface to tell TypeScript that ErrorSubclass extends Error even 
	// though our class definition doesn't use "extends". We're doing this here so that
	// TypeScript doesn't try to implement the extends on the class itself - we're going
	// to do it explicitly with the .prototype.
}

// I am a "hacky" class that helps extend the core Error object in TypeScript. This 
// class uses a combination of TypeScript and old-school JavaScript configurations.
class ErrorSubclass {

	public name: string;
	public message: string;
	public stack: string;

	// I initialize the Error subclass hack / intermediary class.
	constructor( message: string ) {

		this.name = "ErrorSubclass";
		this.message = message;

		// CAUTION: This doesn't appear to work in IE, but does work in Edge. In
		// IE, it shows up as undefined.
		this.stack = ( new Error( message ) ).stack;

	}

}

// CAUTION: Instead of using the "extends" on the Class, we're going to explicitly 
// define the prototype as extending the Error object.
ErrorSubclass.prototype = <any>Object.create( Error.prototype );


// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


interface AppErrorOptions {
	message: string;
	detail?: string;
	extendedInfo?: string;
	code?: string;
	rootError?: any;
}

class AppError extends ErrorSubclass {

	public name: string;
	public detail: string;
	public extendedInfo: string;
	public code: string;
	public rootError: any;


	// I initialize the AppError with the given options.
	constructor( options: AppErrorOptions ) {

		super( options.message );

		this.name = "AppError";
		this.detail = ( options.detail || "" );
		this.extendedInfo = ( options.extendedInfo || "" );
		this.code = ( options.code || "" );
		this.rootError = ( options.rootError || null );

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I am here to ensure that public methods can work with a Class that extends an
	// object that extends Error.
	public testPublicMethod() : string {

		return( "Public method exists on the Error sub-class." );

	}

}


// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


try {

	throw( new Error( "Boom!" ) );

// NOTE: The value in a catch() block has an implicit ANY type and cannot be given a more
// specific type annotation. This makes sense because there's no way to consistently know 
// the root cause of an error at compile time.
} catch ( error ) {

	logError( <Error>error );
	
	try {

		// Wrap the caught error in a custom AppError.
		throw(
			new AppError({
				message: "Something went horribly wrong!",
				detail: "You crossed the streams!",
				code: "gb",
				rootError: error
			})
		);

	} catch ( nestedError ) {

		// NOTE: Using TypeScript to cast the "any" type in the catch-block to an 
		// explicit AppError. This way, we can see if the AppError correctly fits into
		// the "Error" type expected by the logError() function.
		logError( <AppError>nestedError );

		// Test to make sure the public method works (ie, that inheritance worked
		// without screwing up the concrete class).
		console.info( nestedError.testPublicMethod() );
		
	}

}


// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


// I log the given error object to the console.
function logError( error: Error ) : void {

	group( "Log Error" );
	console.log( "Error instance: ", ( error instanceof Error ) );
	console.log( "AppError instance: ", ( error instanceof AppError ) );
	console.log( "Message: " + error.message );

	// If we're dealing with an AppError, we can output additional properties.
	// --
	// NOTE: In TypeScript, this IF-expression is known as a "Type Guard", and will
	// tell TypeScript to treat the "error" value as an instance of "AppError" for the
	// following block, which is great because we will get the extra type-protection
	// for the values on the AppError class.
	if ( error instanceof AppError ) {

		console.log( "Detail: " + error.detail );
		console.log( "Extended Info: " + error.extendedInfo );
		console.log( "Code: " + error.code );
		console.log( "Root Error: " + error.rootError.message );

	}
	
	// NOTE: The .stack property is only populated in IE 10+ AND, even then, only when
	// an error instance is thrown. Also, it looks like this might not get populated on
	// sub-classes in 
	console.log( error.stack );
	groupEnd();

}


// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //


// I safely define a "console.group()" method, which is not available in some IE.
function group( name: string ) : void {

	console.group
		? console.group( name )
		: console.log( "- - - [ " + name + " ] - - - - - - - - - - - - - -" )
	;

}


// I safely define a "console.groupEnd()" method, which is not available in some IE.
function groupEnd() : void {

	console.groupEnd
		? console.groupEnd()
		: console.log( "- - - [ END ] - - - - - - - - - - - - - -" )
	;

}

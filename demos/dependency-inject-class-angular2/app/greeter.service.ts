
// Most of the time, when we want Angular to dependency-inject a Class, we want it to
// inject an INSTANCE of that Class. But, sometimes, we just want to inject the Class 
// itself so that the recipient of the Class can take care of instantiation (perhaps
// creating multiple instances from the Class). In that case, the thing we're injecting 
// isn't of "type Class", it's of "type newable". Now, to get Angular and TypeScript to
// work together to inject a "newable" value, we need two different constructs:
// --
// * A dependency-injection token.
// * A newable Interface that returns the correct Type.
// --
// In TypeScript, we can sort of merge those two concepts by creating a Class that 
// implements an Interface of same name (as the Class). When a Class and an Interface
// have the same name, it allows you to define methods on the Interface without having
// to implement them in the Class. By using this feature, we can create a Type 
// (ie, Class) that will act as both the dependency-injection token and as the type 
// annotation that defines the newable behavior.
// --
// Read more: https://github.com/Microsoft/TypeScript/issues/9699

// The Interface defines the newable behavior (which returns GreeterService).
export interface NewableGreeterService {
	new( name: string ): GreeterService;
}

// The Class defines the Type (which also acts as our dependency-injection token).
export class NewableGreeterService implements NewableGreeterService {
	// ...
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export class GreeterService {

	protected name: string;

	// I initialize the Greeter service.
	constructor( name: string ) {

		this.name = name;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return a greeting message.
	public getGreeting() : string {

		return( `Hello, ${ this.name }.` );

	}

}

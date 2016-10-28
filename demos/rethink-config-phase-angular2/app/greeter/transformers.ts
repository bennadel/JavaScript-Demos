
// I am the interface that must be implemented by all greet transformers.
export interface IGreetTransformer {
	transform( value: string ) : string;
}


// I am the core transformer that is used, no matter what collection of transformers have
// been configured for dependency-injection.
export class CoreGreetTransformer implements IGreetTransformer {

	// I transform the given value as part of the Greeter reduction.
	public transform( name: string ) : string {

		return( "Hello " + name + "." );

	}

}

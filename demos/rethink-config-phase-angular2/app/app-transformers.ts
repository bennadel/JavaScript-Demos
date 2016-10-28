
// Import the application components and services.
import { IGreetTransformer } from "./greeter/greeter.module";


export class YellingTransformer implements IGreetTransformer {

	// I transform the given value as part of the Greeter reduction.
	public transform( value: string ) : string {

		return( value.toUpperCase().replace( /\./g, "!" ) );

	}

}


export class ComplimentTransformer implements IGreetTransformer {

	// I transform the given value as part of the Greeter reduction.
	public transform( value: string ) : string {

		return( value + " You look beautiful this morning." );

	}

}

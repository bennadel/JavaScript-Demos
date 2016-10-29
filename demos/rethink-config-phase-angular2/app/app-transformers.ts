
// Import the application components and services.
import { IGreetTransformer } from "./greeter/greeter.module";


// I add a compliment to the end of the greeting.
export class ComplimentTransformer implements IGreetTransformer {

	// I transform the given value as part of the Greeter reduction.
	public transform( value: string ) : string {

		return( value + " You look beautiful this morning." );

	}

}


// I convert the greeting to UPPERCASE!!! FOR THE WIN!!!
export class YellingTransformer implements IGreetTransformer {

	// I transform the given value as part of the Greeter reduction.
	public transform( value: string ) : string {

		return( value.toUpperCase().replace( /\./g, "!" ) );

	}

}

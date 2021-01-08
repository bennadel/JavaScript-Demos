
// Import the core angular services.
import { forwardRef } from "@angular/core";
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Ultimately, the password strength will evaluate to a NUMBER; but, in order to make our
// internal code more intelligible, I'm going to use an ENUM to associate some human-
// consumable values to the given numbers. This way, if the parent application wants to
// implement their own set of Strength calculations, they just have to evaluate to a
// number - they don't necessarily have to use our internal set of numbers.
export enum Strength {
	VERY_WEAK = 1,
	WEAK = 2,
	GOOD = 3,
	STRONG = 4,
	EXCELLENT = 5
}

// We're going to use an Abstract Class as our "injectable" so that the parent
// application can override the strength calculations provider.
// --
// NOTE: The Password Strength MODULE is going to provide a default implementation for
// this dependency-injection token using the "useClass" semantics below.
@Injectable({
	providedIn: "root",
	useClass: forwardRef( () => DefaultPasswordStrengthServiceImplementation )
})
export abstract class PasswordStrengthService {

	public abstract evaluatePassword( value: string ) : number;

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Our DEFAULT IMPLEMENTATION for the password strength calculation will just use the raw
// length of the input to determine the strength.
@Injectable({
	providedIn: "root"
})
export class DefaultPasswordStrengthServiceImplementation extends PasswordStrengthService {

	// I evaluate the strength of the given password value.
	public evaluatePassword( value: string ) : number {

		if ( value.length <= 5 ) {

			return( Strength.VERY_WEAK );

		} else if ( value.length <= 10 ) {

			return( Strength.WEAK );

		} else if ( value.length <= 15 ) {

			return( Strength.GOOD );

		} else if ( value.length <= 20 ) {

			return( Strength.STRONG );

		} else {

			return( Strength.EXCELLENT );

		}

	}

}

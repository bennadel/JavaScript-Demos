
// Import the core angular services.
import { InjectionToken } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I am the Dependency-Injection (DI) token for the Greeter collection.
export var GREETERS = new InjectionToken<Greeter[]>( "Greeter[] Multi Token" );

export interface Greeter {
	greet( name: string ) : string;
}

export class NiceGreeter implements Greeter {

	public greet( name: string ) : string {

		return( `Hello ${ name }, so nice to meet you.` );

	}

}

export class MeanGreeter implements Greeter {

	public greet( name: string ) : string {

		return( `What evs ${ name }, talk to the hand!` );

	}

}

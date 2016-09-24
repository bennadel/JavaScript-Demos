
// Import the core angular services.
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// Import the rxJs modules for their side-effects.
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";

export interface IAccount {
	id: number;
	name: string;
}

@Injectable()
export class AccountService {

	// I initialize the service.
	constructor() {
		
		// ...

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get the account of the current user. Returns a stream.
	// --
	// CAUTION: Implements a 2.5 second delay for demo.
	public getAccount() : Observable<IAccount> {

		var stream = Observable
			.of({
				id: 4,
				name: "Kim"
			})
			.do(
				function() {

					console.group( "getAccount() - simulated network latency." );
					console.log( "Initiating request." );
					console.log( "Waiting 2,500ms ..." );
					
				}
			)
			.delay( 2500 ) // To make the demo interesting.
			.do(
				function() {

					console.log( "Wait over - delivering data." );
					console.groupEnd();
					
				}
			)
		;

		return( stream );

	}

}

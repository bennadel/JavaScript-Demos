
// Import the application components and services.
import { _ } from "~/app/shared/services/lodash-extended";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface DelayedResolveOperator<T> {
	() : T;
}

export class PartialHelper {

	// I create and return a promise that will eventually resolve with result of the 
	// operator. The goal here is to simulate network latency while using local data.
	// This is just for demonstration purposes.
	static simulateNetworkLatency<T>( operator: DelayedResolveOperator<T>, delay: number = 0 ) : Promise<T> {

		// When we invoke the operator() method, we want to do this in the Promise 
		// constructor in order to ensure any errors result in a rejected promise.
		var promise = new Promise<T>(
			( resolve, reject ) : void => {

				var payload = operator();

				setTimeout(
					() : void => {

						resolve( payload );

					},
					( delay || _.random( 100, 750 ) )
				);

			}
		);

		return( promise );

	}

}

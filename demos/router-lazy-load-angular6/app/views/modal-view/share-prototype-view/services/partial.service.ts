
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	prototype: Prototype;
}

interface Prototype {
	id: number;
	name: string;
}

export class PartialService {

	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the partial payload for the view.
	public get( prototypeID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var prototype = sampleDataIndex.prototypes[ prototypeID ];

				if ( ! prototype ) {

					throw( new Error( "NotFound" ) );

				}

				return({
					prototype: {
						id: prototype.id,
						name: prototype.name
					}
				});

			}
		);

		return( promise );

	}

}

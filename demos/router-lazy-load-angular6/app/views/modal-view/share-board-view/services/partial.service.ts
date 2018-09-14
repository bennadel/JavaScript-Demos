
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	board: Board;
}

interface Board {
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
	public get( boardID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var board = sampleDataIndex.boards[ boardID ];

				if ( ! board ) {

					throw( new Error( "NotFound" ) );

				}

				return({
					board: {
						id: board.id,
						name: board.name
					}
				});

			}
		);

		return( promise );

	}

}

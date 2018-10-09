
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	freehand: Freehand;
}

interface Freehand {
	id: number;
	name: string;
}

@Injectable({
	providedIn: "root"
})
export class PartialService {

	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the partial payload for the view.
	public get( freehandID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var freehand = sampleDataIndex.freehands[ freehandID ];

				if ( ! freehand ) {

					throw( new Error( "NotFound" ) );

				}

				return({
					freehand: {
						id: freehand.id,
						name: freehand.name
					}
				});

			}
		);

		return( promise );

	}

}

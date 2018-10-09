
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	screens: Screen[];
}

interface Screen {
	id: number;
	prototypeID: number;
	name: string;
	filename: string;
	isArchived: boolean;
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
	public get( prototypeID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var prototype = sampleDataIndex.prototypes[ prototypeID ];

				if ( ! prototype ) {

					throw( new Error( "NotFound" ) );

				}

				return({
					screens: prototype.screens.map(
						( screen ) : Screen => {

							return({
								id: screen.id,
								prototypeID: screen.prototypeID,
								name: screen.name,
								filename: screen.filename,
								isArchived: screen.isArchived
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}

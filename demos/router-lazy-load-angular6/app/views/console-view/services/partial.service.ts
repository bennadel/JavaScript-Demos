
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	prototype: Prototype;
	screens: Screen[];
}

interface Prototype {
	id: number;
	name: string;
}

interface Screen {
	id: number;
	name: string;
	filename: string;
}

export class PartialService {

	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the partial payload for the console view.
	public get( prototypeID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var prototype = sampleDataIndex.prototypes[ prototypeID ];

				if ( ! prototype ) {

					throw( new Error( "NotFound" ) );

				}

				var activeScreens = prototype.screens.filter(
					( screen ) : boolean => {

						return( ! screen.isArchived );

					}
				);

				if ( ! activeScreens.length ) {

					throw( new Error( "EmptyPrototype" ) );

				}

				return({
					prototype: {
						id: prototype.id,
						name: prototype.name
					},
					screens: activeScreens.map(
						( screen ) : Screen => {

							return({
								id: screen.id,
								name: screen.name,
								filename: screen.filename
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}

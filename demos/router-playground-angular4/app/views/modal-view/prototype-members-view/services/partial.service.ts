
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	prototype: Prototype;
	members: User[];
	users: User[];
}

interface Prototype {
	id: number;
	name: string;
}

interface User {
	id: number;
	name: string;
	initials: string;
	avatarUrl: string;
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
					},
					members: prototype.members.map(
						( user ) => {

							return({
								id: user.id,
								name: user.name,
								initials: user.initials,
								avatarUrl: user.avatarUrl
							});

						}
					),
					users: sampleData.users.map(
						( user ) => {

							return({
								id: user.id,
								name: user.name,
								initials: user.initials,
								avatarUrl: user.avatarUrl
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}

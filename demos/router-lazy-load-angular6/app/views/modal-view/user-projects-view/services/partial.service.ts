
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// Import the application components and services.
import { _ } from "~/app/shared/services/lodash-extended";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	boards: Board[];
	prototypes: Prototype[];
	user: User;
}

interface Board {
	id: number;
	name: string;
	isMember: boolean;
}

interface Prototype {
	id: number;
	name: string;
	isMember: boolean;
}

interface User {
	id: number;
	name: string;
	initials: string;
	avatarUrl: string;
}

export class PartialService {

	// I return the partial payload for the view.
	public get( userID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var user = sampleDataIndex.users[ userID ];

				if ( ! user ) {

					throw( new Error( "NotFound" ) );

				}

				return({
					user: {
						id: user.id,
						name: user.name,
						initials: user.initials,
						avatarUrl: user.avatarUrl
					},
					boards: sampleData.boards.map(
						( board ) => {

							return({
								id: board.id,
								name: board.name,
								isMember: !! _.find( board.members, { id: user.id } )
							});

						}
					),
					prototypes: sampleData.prototypes.map(
						( prototype ) => {

							return({
								id: prototype.id,
								name: prototype.name,
								isMember: !! _.find( prototype.members, { id: user.id } )
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}

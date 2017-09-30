
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	board: Board;
	members: User[];
	items: BoardItem[];
}

interface Board {
	id: number;
	name: string;
}

interface BoardItem {
	id: number;
	name: string;
	type: string;
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
					},
					members: board.members.map(
						( user ) => {

							return({
								id: user.id,
								name: user.name,
								initials: user.initials,
								avatarUrl: user.avatarUrl
							});

						}
					),
					items: board.items.map(
						( item ) : BoardItem => {

							return({
								id: item.id,
								name: item.name,
								type: item.type
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}

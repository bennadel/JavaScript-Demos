
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	board: Board;
	item: Item;
	comments: Comment[];
}

interface Board {
	id: number;
	name: string;
}

interface Item {
	id: number;
	name: string;
	type: string;
}

interface Comment {
	id: number;
	content: string;
	user: {
		id: number;
		name: string;
		initials: string;
		avatarUrl: string;
	};	
}

export class PartialService {

	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the partial payload for the view.
	public get( itemID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var item = sampleDataIndex.boardItems[ itemID ];

				if ( ! item ) {

					throw( new Error( "NotFound" ) );

				}

				var board = sampleDataIndex.boards[ item.boardID ];

				return({
					board: {
						id: board.id,
						name: board.name
					},
					item: {
						id: item.id,
						name: item.name,
						type: item.type
					},
					comments: item.comments.map(
						( comment ) => {

							return({
								id: comment.id,
								content: comment.content,
								user: {
									id: comment.user.id,
									name: comment.user.name,
									initials: comment.user.initials,
									avatarUrl: comment.user.avatarUrl
								}
							});

						}
					)
				});

			}
		);

		return( promise );

	}

}

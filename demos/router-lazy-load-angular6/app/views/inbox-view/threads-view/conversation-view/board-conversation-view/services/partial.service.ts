
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	board: {
		id: number;
		name: string;
	};
	boardItem: {
		id: number;
		type: string;
	};
	comments: {
		id: number;
		content: string;
		user: {
			id: number;
			name: string;
			initials: string;
			avatarUrl: string;
		};		
	}[];
}

export class PartialService {

	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I return the conversation-oriented partial payload for the board conversation 
	// view.
	public get( boardItemID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var boardItem = sampleDataIndex.boardItems[ boardItemID ];

				if ( ! boardItem ) {

					throw( new Error( "NotFound" ) );

				}

				var board = sampleDataIndex.boards[ boardItem.boardID ];

				return({
					board: {
						id: board.id,
						name: board.name
					},
					boardItem: {
						id: boardItem.id,
						type: boardItem.type
					},
					comments: boardItem.comments.map(
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

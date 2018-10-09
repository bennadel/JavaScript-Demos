
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	boards: Board[];
	prototypes: Prototype[];
}

interface Board {
	id: number;
	name: string;
}

interface Prototype {
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

	// I return the partial payload for the inbox view.
	public get() : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				return({
					boards: this.getBoards(),
					prototypes: this.getPrototypes()
				});

			}
		);

		return( promise );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private getBoards() : Board[] {
		
		var data = sampleData.boards
			// Limit this to boards that have at least one board item with a comment.
			.filter(
				( board ) : boolean => {

					var hasConversations = board.items.some(
						( item ) : boolean => {

							return( !! item.comments.length );

						}
					);

					return( hasConversations );

				}
			)
			.map(
				( board ) => {

					return({
						id: board.id,
						name: board.name
					});

				}
			)
		;

		return( data );

	}


	private getPrototypes() : Prototype[] {

		var data = sampleData.prototypes
			// Limit this to prototypes that have at least one screen with a conversation.
			.filter(
				( prototype ) : boolean => {

					var hasConversations = prototype.screens.some(
						( screen ) : boolean => {

							return( !! screen.conversations.length );

						}
					);

					return( hasConversations );

				}
			)
			.map(
				( prototype ) => {

					return({
						id: prototype.id,
						name: prototype.name
					});

				}
			)
		;

		return( data );

	}

}

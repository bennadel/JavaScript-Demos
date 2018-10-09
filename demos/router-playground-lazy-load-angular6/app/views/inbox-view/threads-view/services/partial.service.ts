
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { _ } from "~/app/shared/services/lodash-extended";
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	threads: Thread[];
}

interface Thread {
	id: number;
	name: string;
	teaser: string;
	user: {
		id: number;
		name: string;
		initials: string;
		avatarUrl: string;
	};
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

	// I return the boards-oriented partial payload for the threads view.
	public getForBoard( boardID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				return({
					threads: this.getBoardThreads( boardID )
				});

			}
		);

		return( promise );

	}


	// I return the prototypes-oriented partial payload for the threads view.
	public getForPrototype( prototypeID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				return({
					threads: this.getPrototypeThreads( prototypeID )
				});

			}
		);

		return( promise );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	private getBoardThreads( boardID: number ) : Thread[] {
		
		var board = sampleDataIndex.boards[ boardID ];

		if ( ! board ) {

			throw( new Error( "NotFound" ) );

		}

		var data = board.items
			// Limit this to board items that have comments.
			.filter(
				( item ) : boolean => {

					return( !! item.comments.length );

				}
			)
			.map(
				( item ) : Thread => {

					var comment = _.last( item.comments );

					return({
						id: comment.id,
						name: item.type,
						teaser: comment.content,
						user: {
							id: comment.id,
							name: comment.user.name,
							initials: comment.user.initials,
							avatarUrl: comment.user.avatarUrl
						}
					});

				}
			)
		;

		return( data );

	}


	private getPrototypeThreads( prototypeID: number ) : Thread[] {

		var prototype = sampleDataIndex.prototypes[ prototypeID ];

		if ( ! prototype ) {

			throw( new Error( "NotFound" ) );

		}

		var data = prototype.screens
			// Limit this to screens that have conversations.
			.filter(
				( screen ) : boolean => {

					return( !! screen.conversations.length );

				}
			)
			.map(
				( screen ) : Thread[] => {

					var threads = screen.conversations.map(
						( converation ) => {

							var comment = _.last( converation.comments );

							return({
								id: converation.id,
								name: screen.name,
								teaser: comment.content,
								user: {
									id: comment.id,
									name: comment.user.name,
									initials: comment.user.initials,
									avatarUrl: comment.user.avatarUrl
								}
							});

						}
					);

					return( threads );

				}
			)
		;

		return( _.flatten( data ) );

	}

}

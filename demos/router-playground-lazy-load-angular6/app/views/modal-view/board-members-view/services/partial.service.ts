
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Payload {
	board: Board;
	members: User[];
	users: User[];
}

interface Board {
	id: number;
	name: string;
}

interface User {
	id: number;
	name: string;
	initials: string;
	avatarUrl: string;
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

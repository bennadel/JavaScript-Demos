
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	user: User;
}

interface User {
	id: number;
	name: string;
	initials: string;
	email: string;
	avatarUrl: string;
}

@Injectable({
	providedIn: "root"
})
export class PartialService {

	// I return the partial payload for the user detail view.
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
						email: user.email,
						avatarUrl: user.avatarUrl
					}
				});

			}
		);

		return( promise );

	}

}

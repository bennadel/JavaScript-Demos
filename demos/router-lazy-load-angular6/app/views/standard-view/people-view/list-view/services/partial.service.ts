
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	users: User[];
}

interface User {
	id: number;
	name: string;
	initials: string;
	email: string;
	avatarUrl: string;
}

export class PartialService {

	// I return the partial payload for the inbox view.
	public get() : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				return({
					users: sampleData.users.map(
						( user ) => {

							return({
								id: user.id,
								name: user.name,
								initials: user.initials,
								email: user.email,
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

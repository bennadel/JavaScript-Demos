
// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleDataIndex } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	update: ProductUpdate;
}

interface ProductUpdate {
	id: number;
	message: string;
	staff: {
		name: string;
		initials: string;
	}
}

export class PartialService {

	// I return the partial payload for the product-updates detail view.
	public get( productUpdateID: number ) : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				var update = sampleDataIndex.productUpdates[ productUpdateID ];

				if ( ! update ) {

					throw( new Error( "NotFound" ) );

				}

				return({
					update: {
						id: update.id,
						message: update.message,
						staff: {
							name: update.staff.name,
							initials: update.staff.initials
						}
					}
				});

			}
		);

		return( promise );

	}

}

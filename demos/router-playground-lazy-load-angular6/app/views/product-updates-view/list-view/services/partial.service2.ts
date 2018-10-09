
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	updates: ProductUpdate[];
}

interface ProductUpdate {
	id: number;
	message: string;
	staff: {
		name: string;
		initials: string;
	}
}

@Injectable({
	providedIn: "root"
})
export class PartialService2 {

	// I return the partial payload for the product-updates list view.
	public get() : Promise<Payload> {

		var promise = PartialHelper.simulateNetworkLatency(
			() : Payload => {

				return({
					updates: sampleData.productUpdates.map(
						( productUpdate ) => {

							return({
								id: productUpdate.id,
								message: productUpdate.message.substring( 0, 50 ),
								staff: {
									name: productUpdate.staff.name,
									initials: productUpdate.staff.initials
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

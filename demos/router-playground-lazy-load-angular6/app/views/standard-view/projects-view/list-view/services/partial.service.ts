
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { PartialHelper } from "~/app/shared/services/partial-helper";
import { sampleData } from "~/app/shared/services/sample-data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Payload {
	boards: Board[];
	freehands: Freehand[];
	prototypes: Prototype[];
}

interface Board {
	id: number;
	name: string;
}

interface Freehand {
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
					freehands: this.getFreehands(),
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
		
		var data = sampleData.boards.map(
			( board ) => {

				return({
					id: board.id,
					name: board.name
				});

			}
		);

		return( data );

	}


	private getFreehands() : Freehand[] {
		
		var data = sampleData.freehands.map(
			( freehand ) => {

				return({
					id: freehand.id,
					name: freehand.name
				});

			}
		);

		return( data );

	}


	private getPrototypes() : Prototype[] {

		var data = sampleData.prototypes.map(
			( prototype ) => {

				return({
					id: prototype.id,
					name: prototype.name
				});

			}
		);

		return( data );

	}

}

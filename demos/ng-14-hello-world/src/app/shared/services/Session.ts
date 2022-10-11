
// Import core Angular modules.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class Session {

	public userID: string;

	constructor() {

		this.userID = "bennadel";

	}

}

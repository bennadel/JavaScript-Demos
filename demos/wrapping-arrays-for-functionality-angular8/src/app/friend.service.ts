
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Friend {
	id: number;
	name: string;
	email: string;
	createdAt: Date;
}

@Injectable({
	providedIn: "root"
})
export class FriendService {

	// I initialize the friend service.
	constructor() {
		// ...
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get the collection of Friends. Returns a Promise.
	public async getFriends() : Promise<Friend[]> {

		return([
			{
				"id": 1,
				"name": "Kim",
				"email": "kim@coolbeans.kim",
				"createdAt": new Date( "November 1, 2012" )
			},
			{
				"id": 2,
				"name": "Joanna",
				"email": "jojo@postmastergeneral.jo",
				"createdAt": new Date( "October 15, 2017" )
			},
			{
				"id": 3,
				"name": "Alison",
				"email": "ali@mmmmail.ali",
				"createdAt": new Date( "February 7, 2016" )
			},
			{
				"id": 4,
				"name": "Sam",
				"email": "sammy@samnet.uk.sam",
				"createdAt": new Date( "July 4, 2013" )
			},
			{
				"id": 5,
				"name": "Marty",
				"email": "marty.party@org.mary",
				"createdAt": new Date( "March 13, 2019" )
			},
			{
				"id": 6,
				"name": "Ellen",
				"email": "ellensmith@gmail.ell",
				"createdAt": new Date( "November 5, 2016" )
			}
		]);

	}

}

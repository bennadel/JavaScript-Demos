
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Person {
	id: string;
	name: string;
	email: string;
}

@Injectable({
	providedIn: "root"
})
export class PeopleService {

	// I get the person with the given ID. Returns a Promise.
	public async getPerson( id: string ) : Promise<Person> {

		var people = await this.getPeople();
		var person = people.find(
			( person ) => {

				return( person.id === id );

			}
		);

		if ( ! person ) {

			throw( new Error( "Not found." ) );

		}

		return( person );

	}


	// I get the people. Returns a Promise.
	public async getPeople() : Promise<Person[]> {

		return([
			{
				id: `user-1j`,
				name: "Jo-Hanna",
				email: "jojo@bennadel.com"
			},
			{
				id: "user-f9aa",
				name: "Tricia",
				email: "tricia@bennadel.com"
			},
			{
				id: "user-z01",
				name: "Kit",
				email: "kit@bennadel.com"
			},
			{
				id: "user-l4m",
				name: "Sam",
				email: "sam@bennadel.com"
			},
			{
				id: "user-pq2",
				name: "Helena",
				email: "hell-hath@bennadel.com"
			}
		]);

	}

}

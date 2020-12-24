
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	email: string;
	avatarUrl: string;
	lastLoginAt: string;
	city: string;
	state: string;
	country: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {
	
	public users: User[];

	// I initialize the app component.
	constructor() {

		this.users = [];

		while ( this.users.length < 100 ) {

			this.addUser();

		}

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a demo user to the users collection.
	public addUser() : void {

		this.users.unshift({
			id: ( this.users.length + 1 ),
			name: "Ben Nadel",
			email: "ben@bennadel.com",
			avatarUrl: "https://bennadel-cdn.com/images/global/ben-nadel-avatar.jpg",
			lastLoginAt: "Today",
			city: "Irvington",
			state: "New York",
			country: "US"
		});

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="swapItems()">Swap Items</a>
			&mdash;
			<a (click)="swapCollection()">Swap Collection</a>
		</p>
		
		<ul>
			<li *ngPureFor="let user of users">
				{{ user.id }} - {{ user.name }}
			</li>
		</ul>
	`
})
export class AppComponent {
	
	public users: User[];

	// I initialize the app component.
	constructor() {

		this.users = this.generateUsers();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I keep the same data, but swap the top-level collection reference.
	public swapCollection() : void {

		this.users = this.users.slice();

	}


	// I keep the same top-level collection reference, but swap the low-level item
	// references. As the items are swapped, the IDs are incremented so that we can see
	// if the DOM nodes are being updated in the View.
	public swapItems() : void {

		for ( var i = 0, length = this.users.length ; i < length ; i++ ) {

			var user = this.users[ i ];

			// Mutate the users collection, swapping in a new item at the current index.
			this.users[ i ] = {
				id: ( user.id + 1 ),
				name: user.name
			};

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I generate the collection of users using the given size.
	private generateUsers( count: number = 10 ) : User[] {

		var users: User[] = [];

		for ( var i = 0 ; i < count ; i++ ) {

			users.push({
				id: i,
				name: `User ${ i }`
			});

		}

		return( users );

	}

}

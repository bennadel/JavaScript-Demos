
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Friend {
	id: number;
	name: string;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h2>
			Friends
		</h2>

		<p>
			<a (click)="cycleFriends()">Cycle friends</a>
			&mdash;
			<a (click)="toggleFriends()">Toggle friends</a>
		</p>

		<ul *ngIf="isShowingFriends">
			<ng-template
				ngFor
				let-friend
				[ngForOf]="friends"
				[ngForTrackBy]="( 'id' | trackByProperty )">

				<li [mySpy]="friend.name">
					{{ friend.name }}
				</li>

			</ng-template>
		</ul>
	`
})
export class AppComponent {
	
	public friends: Friend[];
	public isShowingFriends: boolean;

	// I initialize the app component.
	constructor() {

		this.friends = this.generateFriends();
		this.isShowingFriends = true;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I re-create the collection of friends, thereby breaking any "object identity"
	// references to the old view-model.
	public cycleFriends() : void {

		console.warn( "Cycling friends collection." );
		this.friends = this.generateFriends();

	}


	// I toggle the rendering of the friends collection.
	public toggleFriends() : void {

		console.warn( "Toggling friends collection." );
		this.isShowingFriends = ! this.isShowingFriends;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return a new collection of friends.
	private generateFriends() : Friend[] {

		return([
			{ id: 1, name: "Liz" },
			{ id: 2, name: "Joanna" },
			{ id: 3, name: "Kim" }
		]);

	}

}

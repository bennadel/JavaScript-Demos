
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	email: string;
	avatarUrl: string;
	startedAt: number;
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div *ngFor="let user of users">

			<bn-badge [user]="user"></bn-badge>

		</div>

		<!--
			We know this one will break because there is no [user] binding. This is just
			here to demonstrate what it looks like when it breaks.
		-->
		<div>
			<bn-badge></bn-badge>
		</div>
	`
})
export class AppComponent {

	public users: User[];

	// I initialize the app component.
	constructor() {

		this.users = [
			{
				id: 1,
				name: "Kim Doro",
				email: "ben+kim@bennadel.com",
				avatarUrl: "http://www.gravatar.com/avatar/5cbcec91c352ed84fa4ad6fc42fd2a05.jpg?s=150",
				startedAt: Date.now()
			},
			{
				id: 2,
				name: "Sarah O'Neill",
				email: "ben+sarah@bennadel.com",
				avatarUrl: "http://www.gravatar.com/avatar/a65ac17d587bc4b2a0d4075fc8cb2938.jpg?s=150",
				startedAt: Date.now()
			},
			{
				id: 3,
				name: "Tricia Nakatomi",
				email: "ben+tricia@bennadel.com",
				avatarUrl: "http://www.gravatar.com/avatar/e75d5660d83e33924a51b22cc1db0a91.jpg?s=150",
				startedAt: Date.now()
			}
		];

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ApiClient } from "./api-client";

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
		<p>
			<a (click)="loadFriends()">Load Friends</a>.
		</p>

		<ng-template [ngIf]="friends.length">
			<h2>
				You have {{ friends.length }} friends!
			</h2>

			<ul>
				<li *ngFor="let friend of friends">
					{{ friend.name }} ( id: {{ friend.id }} )
				</li>
			</ul>
		</ng-template>
	`
})
export class AppComponent {

	public friends: Friend[];

	private apiClient: ApiClient;

	// I initialize the app-component.
	constructor( apiClient: ApiClient ) {

		this.apiClient = apiClient;
		this.friends = [];

		// In order to demonstrate that Axios will engage the XSRF protection, let's
		// set an XSRF-TOKEN cookie.
		// --
		// NOTE: This would normally be some unpredictable value set by the server.
		document.cookie = "XSRF-TOKEN=server-generated-token";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I load the list of friends.
	public async loadFriends() : Promise<void> {

		try {

			// NOTE: For the sake of simplicity, I'm letting the Component talk directly
			// to the ApiClient. However, in a production app, I'd create an abstraction
			// around Friend access (ie, something like FriendService or FriendGateway)
			// which would handle the low-level details of the ApiClient request and
			// error handling. But, since this is just a post about using Axios in
			// Angular, I'm removing the middle man for the controlled scenario.
			this.friends = await this.apiClient.get<Friend[]>({
				url: "api/friends.json",
				params: {
					limit: 10
				}
			});

		} catch ( error ) {

			console.error( error );

		}

	}

}

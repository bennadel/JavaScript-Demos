
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { OnInit } from "@angular/core";

// Load modules for side-effects.
import "rxjs/add/operator/retry";

// Import the application components and services.
import { FriendService } from "./friend.service";
import { IFriend } from "./friend.service";

@Component({
	selector: "my-app",

	// CAUTION: Notice that we are using the ASYNC pipe THREE times in this template.
	template:
	`
		<p *ngIf="( ( friends | async ) === null )">
			<em>Loading....</em>
		</p>

		<ul *ngIf="( ( friends | async ) !== null )">
			<li *ngFor="let friend of friends | async">
				{{ friend.name }}
			</li>
		</ul>
	`
})
export class AppComponent implements OnInit {

	public friends: Observable<IFriend[]>;

	private friendService: FriendService;


	// I initialize the component.
	constructor( friendService: FriendService ) {
		
		this.friendService = friendService;
		this.friends = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once after the component has been instantiated and the inputs have 
	// been bound for the first time.
	public ngOnInit() : void {

		// Get the friend stream.
		// --
		// NOTE: Instead of extracting the "friends" collection from the stream, we are
		// going to be using the Async Pipe in the template to automatically bind to the
		// stream response.
		this.friends = this.friendService
			.getFriends()
			.retry( 2 ) // If request fails, try again, 2 more times.
		;

	}

}

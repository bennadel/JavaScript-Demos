
// Import the core angular services.
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { FriendService } from "./friend.service";
import { IFriend } from "./friend.service";

@Component({
	selector: "my-app",
	template:
	`
		<p *ngIf="! friends">
			<em>Loading....</em>
		</p>

		<ul *ngIf="friends">
			<li *ngFor="let friend of friends">
				{{ friend.name }}
			</li>
		</ul>
	`
})
export class AppComponent implements OnInit {

	public friends: IFriend[];

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
		// NOTE: This subscription here represents only the local reaction to the stream;
		// the underlying stream (Http request) will still execute no matter what. Heck,
		// you shouldn't even think about the fact that this IS an HTTP request (most of
		// the time).
		var subscription = this.friendService
			.getFriends()
			.subscribe(
				( friends: IFriend[] ) => {
			
					this.friends = friends;
			
					console.log( "Friends loaded." );
			
				}
			)
		;

		// Here's the question you need to ask yourself - should the following line be
		// tied to the underlying implementation of the FriendService?
		// --
		// subscription.unsubscribe();

	}

}

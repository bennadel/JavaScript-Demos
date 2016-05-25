
// Import the core angular services.
import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { OnInit } from "@angular/core";

// Import the application components and services.
// --
// NOTE: I'm aliasing the Friend interface just to experiment with the syntax.
import { Friend as IFriend } from "./friend.service";
import { FriendService } from "./friend.service";


// I provide the root component of the application.
@Component({
	selector: "my-app",
	providers: [ FriendService, HTTP_PROVIDERS ],
	template: 
	`
		<div *ngIf="isLoading" class="loading">
			Loading friends...
		</div>

		<div *ngIf="isDoneLoading">

			<p>
				You Have {{ friends.length }} friends!
			</p>

			<ul>
				<li *ngFor="let friend of friends" [class.is-bff]="friend.isBFF">
					<span>{{ friend.name }}</span>
				</li>
			</ul>

		</div>
	`
})
export class AppComponent implements OnInit {

	// I hold the collection of friends to display.
	public friends: IFriend[];

	// I provide access to the friend repository.
	public friendService: FriendService;

	// I determine if the data has been fully loaded.
	public isDoneLoading: boolean;
	public isLoading: boolean;


	// I initialize the component.
	constructor( friendService: FriendService ) {

		this.friends = [];
		this.friendService = friendService;
		this.isDoneLoading = false;
		this.isLoading = true;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I get called once after the component has been instantiated and the input
	// properties have been bound.
	public ngOnInit(): void {

		this.friendService
			.getFriends()
			.subscribe( handleResolve.bind( this ) )
		;

		function handleResolve( newFriends: IFriend[] ) : void {

			this.friends = newFriends;

			// Flag the data as fully loaded.
			this.isLoading = false;
			this.isDoneLoading = true;

		}

	}

}

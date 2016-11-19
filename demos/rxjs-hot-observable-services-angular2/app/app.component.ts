
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { OnInit } from "@angular/core";

// Import the application components and services.
import { FriendService } from "./friend.service";
import { IFriend } from "./friend.service";

@Component({
	selector: "my-app",

	// CAUTION: Notice that we are using the ASYNC pipe THREE times in this template.
	// --
	// NOTE: I don't recommend this approach - this is just an exploration of the way
	// Async Pipe interacts with streams returned from the "service layer".
	template:
	`
		<p>
			<a (click)="loadData()">Reload Data</a>
			&nbsp;|&nbsp;
			<a (click)="fireAndForget()">Fire and Forget</a>
		</p>

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


	// I make a request to get friend data; BUT, don't subscribe to the resultant stream.
	public fireAndForget() : void {

		this.friendService.getFriends();

	}


	// I make a request to get friend data.
	public loadData() : void {

		// Get the friend stream.
		// --
		// NOTE: Instead of extracting the "friends" collection from the stream, we are
		// going to be using the Async Pipe in the template to automatically bind to the
		// stream response.
		this.friends = this.friendService.getFriends();

		// In addition to using Async Pipe, we'll also imperatively subscribe to the 
		// stream so that we can monitor the results (and errors).
		this.friends.subscribe(
			( value: IFriend[] ) : void => {

				console.log( "Service Success!", value );

			},
			( error: any ) : void => {

				console.log( "Service Error!", error );

			}
		);

	}


	// I get called once after the component has been instantiated and the inputs have 
	// been bound for the first time.
	public ngOnInit() : void {

		this.loadData();

	}

}

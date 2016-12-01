
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
		<p>
			<a (click)="reload()">Reload Friends</a>
		</p>

		<ul *ngIf="friends.length">
			<li *ngFor="let friend of friends">
				{{ friend.name }} - <a (click)="remove( friend )">Remove</a>
			</li>
		</ul>

		<input 
			type="text" 
			[value]="form.name"
			(input)="form.name = $event.target.value" 
			(keydown.Enter)="addFriend()"
		/>
		<button type="button" (click)="addFriend()">Add Friend</button>
	`
})
export class AppComponent implements OnInit {

	public form: { 
		name: string;
	};
	public friends: IFriend[];

	private friendService: FriendService;


	// I initialize the component.
	constructor( friendService: FriendService ) {
		
		this.friendService = friendService;
		this.friends = [];
		this.form = {
			name: ""
		};

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I add a new friend using the form field value.
	public addFriend() : void {

		this.friendService
			.createFriend( this.form.name )
			.subscribe(
				( id: number ) : void => {

					this.form.name = "";
					this.reload();

				}
			)
		;

	}


	// I get called once after the component has been initialized and the inputs have 
	// been bound for the first time.
	public ngOnInit() : void {

		this.reload();

	}


	// I reload the list of friends.
	public reload() : void {

		this.friendService
			.getFriends()
			.subscribe(
				( friends: IFriend[] ) : void => {

					this.friends = friends;

				}
			)
		;

	}


	// I remove the given friend from the collection.
	public remove( friend: IFriend ) : void {

		// Optimistically remove from local collection.
		this.friends = this.friends.filter(
			( value: IFriend ) : boolean => {

				return( value !== friend );

			}
		);

		this.friendService
			.removeFriend( friend.id )
			.subscribe(
				() : void => {

					this.reload();

				}
			)
		;

	}

}

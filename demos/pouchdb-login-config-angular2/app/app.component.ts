
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { FriendService } from "./friend.service";
import { IFriend } from "./friend.service";
import { PouchDBService } from "./pouchdb.service";

interface IAddForm {
	name: string;
}

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<!-- BEIGN: Logged-out view. -->
		<template [ngIf]="( user === null )">

			<ul>
				<li>
					<a (click)="login( 'ben' )">Login as Ben</a>
				</li>
				<li>
					<a (click)="login( 'kim' )">Login as Kim</a>
				</li>
			</ul>

		</template>
		<!-- END: Logged-out view. -->


		<!-- BEIGN: Logged-in view. -->
		<template [ngIf]="( user !== null )">

			<p>
				<strong>Logged-in as {{ user }}</strong>.
				<a (click)="logout()">Logout</a>.
			</p>

			<ul>
				<li *ngFor="let friend of friends">
					{{ friend.name }} 
					&mdash;
					<a (click)="deleteFriend( friend )">Delete</a>
				</li>
			</ul>

			<div class="form">

				<input 
					type="text"
					[value]="addForm.name"
					(input)="addForm.name = $event.target.value"
					(keydown.Enter)="processAddForm()" 
				/>
				<button type="button" (click)="processAddForm()">Add Friend</button>

			</div>

		</template>
		<!-- END: Logged-in view. -->
	`
})
export class AppComponent {

	public addForm: IAddForm;
	public friends: IFriend[];
	public user: string;

	private friendService: FriendService;
	private pouchdbService: PouchDBService;


	// I initialize the component.
	constructor( 
		friendService: FriendService,
		pouchdbService: PouchDBService
		) {
		
		this.friendService = friendService;
		this.pouchdbService = pouchdbService;

		this.addForm = {
			name: ""
		};

		// To start out, the Friends collection will be empty; and, it must remain 
		// empty until the user logs-in because, until then, the PouchDB database has
		// not been configured and we won't know where to read data from.
		this.friends = [];
		this.user = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I delete the given friend from the list.
	public deleteFriend( friend: IFriend ) : void {

		this.friendService
			.deleteFriend( friend.id )
			.then(
				() : void => {

					this.loadFriends();

				},
				( error: Error ) : void => {

					console.log( "Error:", error );

				}
			)
		;

	}


	// I login the user with the given identifier. 
	public login( userIdentifier: string ) : void {

		// Now that a new user is logging in, we want to teardown any existing PouchDB
		// database and reconfigure a new PouchDB database for the given user. This way,
		// each user gets their own database in our database-per-user model.
		// --
		// CAUTION: For simplicity, this is in the app-component; but, it should probably 
		// be encapsulated in some sort of "session" service.
		this.pouchdbService.configureForUser( userIdentifier );
		this.user = userIdentifier;

		// Once the new database is configured (synchronously), load the user's friends.
		this.loadFriends();

	}


	// I log the current user out.
	public logout() : void {

		// When logging the user out, we want to teardown the currently configured 
		// PouchDB database. This way, we can ensure that rogue asynchronous actions
		// aren't going to accidentally try to interact with the database.
		// --
		// CAUTION: For simplicity, this is in the app-component; but, it should probably 
		// be encapsulated in some sort of "session" service.
		this.pouchdbService.teardown();
		this.user = null;

		this.friends = [];

	}


	// I process the "add" form, creating a new friend with the given name.
	public processAddForm() : void {

		if ( ! this.addForm.name ) {

			return;

		}

		this.friendService
			.addFriend( this.addForm.name )
			.then(
				( id: string ) : void => {

					console.log( "New friend added:", id );

					this.loadFriends();
					this.addForm.name = "";

				},
				( error: Error ) : void => {

					console.log( "Error:", error );

				}
			)
		;

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I load the persisted friends collection into the list.
	private loadFriends() : void {

		this.friendService
			.getFriends()
			.then(
				( friends: IFriend[] ) : void => {

					// NOTE: Since the persistence layer is not returning the data 
					// in any particular order, we're going to explicitly sort the 
					// collection by name.
					this.friends = this.friendService.sortFriendsCollection( friends );

				},
				( error: Error ) : void => {

					console.log( "Error", error );

				}
			)
		;

	}

}

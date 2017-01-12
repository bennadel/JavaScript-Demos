
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { FriendService } from "./friend.service";
import { IFriend } from "./friend.service";
import { ISyncResult } from "./pouchdb.service";
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
				<a (click)="logout()">Logout</a>
				&nbsp;|&nbsp;
				<a (click)="syncData()">Sync remote database</a>.
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

		// In order to keep this demo as simple as possible, I've already created the two 
		// remote databases in Cloudant (CouchDB as a Service) and have provisioned API 
		// keys for them (one for each remote database), which I am hard-coding here. 
		// When the user logs-in, they will be able to sync with the associated remote 
		// database in our database-per-user model.
		// --
		// NOTE: I am not doing any automatic sync because sync => HTTP requests to 
		// Cloudant, which has a dollars-and-cents cost to it. In each application, you
		// have to figure out where the right balance of real-time syncing, usability, 
		// and cost can be found.
		var demoCredentials = {
			ben: {
				local: {
					identifier: "ben"
				},
				remote: {
					url: "https://bennadel.cloudant.com/js-demo-pouchdb-cloudant-sync-ben",
					key: "sedenawaysizediesettedur",
					password: "3c9b6ca8303e9b34e42296c87a22aa1223ad7770"
				}
			},
			kim: {
				local: {
					identifier: "kim"
				},
				remote: {
					url: "https://bennadel.cloudant.com/js-demo-pouchdb-cloudant-sync-kim",
					key: "tintralowallsedidiatedis",
					password: "209e6040a87352e428fcb3c8f6b922924c300ddc"
				}
			}
		};

		// Now that a new user is logging in, we want to teardown any existing PouchDB
		// database and reconfigure a new PouchDB setup for the the current user. This 
		// includes both the local database as well as the remote CouchDB (Cloudant)
		// database acting as our remote replica. This way, each user gets their own 
		// database in our database-per-user model.
		// --
		// CAUTION: For simplicity, this is in the app-component; but, it should probably 
		// be encapsulated in some sort of "session" service.
		this.pouchdbService.configureForUser( demoCredentials[ userIdentifier ] );
		this.user = userIdentifier;

		// Once the new database is configured (synchronously), load the user's friends.
		this.loadFriends();

	}


	// I log the current user out.
	public logout() : void {

		// When logging the user out, we want to teardown the currently configured 
		// PouchDB database. This way, we can ensure that rogue asynchronous actions
		// aren't going to accidentally try to interact with the database.
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


	// I sync the local PouchDB database with the remote CouchDB / Cloudant database. If
	// new documents are pulled down, I reload the list of friends to help keep the user
	// interface up-to-date.
	public syncData() : void {

		console.info( "Synchronizing remote database." );

		this.pouchdbService
			.sync()
			.then(
				( results: ISyncResult ) : void => {

					// When we "sync" the two databases, documents may move in either 
					// direction - Push or Pull. And, since this is performed using 
					// "bulk" operations, it's possible that some of the documents will
					// create errors (version conflicts) while each overall request still
					// completes successfully.
					console.group( "Remote sync completed." );
					console.log( "Docs pulled:", results.pull.docs.length );
					console.log( "Docs pushed:", results.push.docs.length );
					console.log( "Errors:", ( results.pull.errors.length + results.push.errors.length ) );
					console.groupEnd();

					// We don't really care if we PUSHED docs to the remote server; but,
					// if we PULLED new docs down, we'll want to re-render the list of 
					// friends to display the newly acquired documents.
					if ( results.pull.docs.length ) {

						console.log( `Since we pulled ${ results.pull.docs.length } docs, re-render friends.` );
						this.loadFriends();

					}

					// Since replication / syncing is performed using bulk operations, 
					// it's possible that some of the documents failed to replicate due
					// to version conflicts - warn for errors.
					if ( results.pull.errors.length || results.push.errors.length ) {

						console.warn( "Some of the documents resulted in error:" );
						console.log( results.pull.errors );
						console.log( results.push.errors );

					}

				},
				( error: any ) : void => {

					console.warn( "Remote sync failed, critically." );
					console.error( error );

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

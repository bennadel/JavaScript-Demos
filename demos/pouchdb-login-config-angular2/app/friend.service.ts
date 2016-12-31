
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { IPouchDBAllDocsResult } from "./pouchdb.interfaces";
import { IPouchDBGetResult } from "./pouchdb.interfaces";
import { IPouchDBPutResult } from "./pouchdb.interfaces";
import { IPouchDBRemoveResult } from "./pouchdb.interfaces";
import { PouchDBService } from "./pouchdb.service";


export interface IFriend {
	id: string;
	name: string;
}

interface IPouchDBGetFriendResult extends IPouchDBGetResult {
	name: string;
}


@Injectable()
export class FriendService {

	private pouchdbService: PouchDBService;


	// I initialize the Friend service.
	constructor( pouchdbService: PouchDBService ) {

		// Rather than constructing a PouchDB instance directly, we're going to use the
		// PouchDBService to provide a database instance on the fly. This way, the 
		// configuration for the PouchDB instance can be changed at any point during the
		// application life-cycle. Each database interaction starts with a call to 
		// this.getDB() to access the "current" database rather than a cached one.
		this.pouchdbService = pouchdbService;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I add a new friend with the given name. Returns a promise of the generated id.
	public addFriend( name: string ) : Promise<string> {

		// NOTE: All friends are given the key-prefix of "friend:". This way, when we go
		// to query for friends, we can limit the scope to keys with in this key-space.
		var promise = this.getDB()
			.put({
				_id: ( "friend:" + ( new Date() ).getTime() ),
				name: name
			})
			.then(
				( result: IPouchDBPutResult ) : string => {

					return( result.id );

				}
			)
		;

		return( promise );

	}


	// I delete the friend with the given id. Returns a promise.
	public deleteFriend( id: string ) : Promise<void> {

		this.testId( id );

		// NOTE: For the "delete" action, we need to perform a series of database calls.
		// In reality, these will be "instantaneous". However, philosophically, these are
		// asynchronous calls. As such, I am setting the DB to a function-local value in
		// order to ensure that both database calls - that compose the one workflow - are
		// made on the same database. This eliminates the possibility that the "current 
		// database" may change in the middle of these chained actions.
		var db = this.getDB();

		// When we delete a document, we have to provide a document that contains, at the
		// least, the "_id" and the "_rev" property. Since the calling context doesn't 
		// have this, we'll use the .get() method to get the current doc, then use that 
		// result to delete the winning revision of the document.
		var promise = db
			.get( id )
			.then(
				( doc: IPouchDBGetFriendResult ) : any => {

					return( db.remove( doc ) );

				}
			)
			.then(
				( result: IPouchDBRemoveResult ) : void => {

					// Here, I'm just stripping out the result so that the PouchDB 
					// response isn't returned to the calling context.
					return;

				}
			)
		;

		return( promise );

	}


	// I get the collection of friends (in no particular sort order). Returns a promise.
	public getFriends() : Promise<IFriend[]> {

		var promise = this.getDB()
			.allDocs({
				include_docs: true,

				// In PouchDB, all keys are stored in a single collection. So, in order 
				// to return just the subset of "Friends" keys, we're going to query for
				// all documents that have a "friend:" key prefix. This is known as 
				// "creative keying" in the CouchDB world.
				startkey: "friend:",
				endKey: "friend:\uffff"
			})
			.then(
				( result: IPouchDBAllDocsResult ) : IFriend[] => {

					// Convert the raw data storage into something more natural for the
					// calling context to consume.
					var friends = result.rows.map(
						( row: any ) : IFriend => {

							return({
								id: row.doc._id,
								name: row.doc.name
							});

						}
					);

					return( friends );

				}
			)
		;

		return( promise );

	}


	// I sort the given collection of friends (in place) based on the name property.
	public sortFriendsCollection( friends: IFriend[] ) : IFriend[] {

		friends.sort(
			function( a: IFriend, b: IFriend ) : number {

				if ( a.name.toLowerCase() < b.name.toLowerCase() ) {

					return( -1 );

				} else {

					return( 1 );

				}

			}
		);

		return( friends );

	}


	// I test the given id to make sure it is valid for the Friends key-space. Since all
	// PouchDB documents are stored in a single collection, we have to ensure that the 
	// given ID pertains to the subset of documents that represents Friends. If the id is
	// valid, I return quietly; otherwise, I throw an error.
	public testId( id: string ) : void {

		if ( ! id.startsWith( "friend:" ) ) {

			throw( new Error( "Invalid Id" ) );

		}

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I return the currently-configured PouchDB instance.
	private getDB() : any {

		return( this.pouchdbService.getDB() );

	}

}

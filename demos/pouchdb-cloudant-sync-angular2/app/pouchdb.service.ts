
// Import the core angular services.
// --
// The PouchDB library is delivered as a CommonJS module and I am not yet sure how to 
// configure my System.js setup to allow for a more simple import statement. This is the
// only thing that I can get to work at this time.
// --
// CAUTION: TypeScript still complains, "Cannot find module 'pouchdb'."
import * as PouchDB from "pouchdb";

// Import the application components and services.
import { IPouchDBSyncChangeResult } from "./pouchdb.interfaces";
import { IPouchDBSyncCompleteResult } from "./pouchdb.interfaces";

interface IUserCredentials {
	local: {
		identifier: string;
	};
	remote: {
		url: string;
		key: string;
		password: string;
	};
}

export interface ISyncResult {
	pull: {
		docs: any[],
		errors: any[]
	};
	push: {
		docs: any[],
		errors: any[]
	};
};

export class PouchDBService {

	private localDatabase: any;
	private pendingSync: Promise<ISyncResult>;
	private remoteDatabase: any;


	// I initialize the service.
	constructor() {

		this.localDatabase = null;
		this.pendingSync = null;
		this.remoteDatabase = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I teardown any existing PouchDB instance and configure a new one for the given
	// user identifier. All subsequent calls to getDB() will return the newly configured
	// PouchDB instance.
	public configureForUser( userCredentials: IUserCredentials ) : void {

		this.teardown();

		this.localDatabase = new PouchDB( this.getDatabaseName( userCredentials.local.identifier ) );
		this.remoteDatabase = new PouchDB(
			userCredentials.remote.url,
			{
				auth: {
					username: userCredentials.remote.key,
					password: userCredentials.remote.password
				},
				// The database already exists - no need for PouchDB to check to see 
				// if it exists (and try to create it). This saves on some API requests.
				skip_setup: true
			}
		);

		// NOTE: We are not doing any active Sync / replication when the two databases 
		// are configured; for this demo, it is being performed explicitly in the root 
		// component by the user.

		console.warn( "Configured new PouchDB database for,", this.localDatabase.name );

	}


	// I get the active PouchDB instance. Throws an error if no PouchDB instance is 
	// available (ie, user has not yet been configured with call to .configureForUser()).
	public getDB() : any {

		if ( ! this.localDatabase ) {

			throw( new Error( "Database is not available - please configure an instance." ) );

		}

		return( this.localDatabase );

	}


	// I sync the remote and local CouchDB databases. Returns a promise that results to 
	// a custom sync result.
	public sync() : Promise<ISyncResult> {

		// If there's already a sync operation in progress, just return the pending 
		// Promise. This will provide light throttling of sync requests.
		if ( this.pendingSync ) {

			return( this.pendingSync );

		}

		var promise = this.pendingSync = new Promise(
			( resolve, reject ) : void => {

				var result: ISyncResult = {
					pull: {
						docs: [],
						errors: []
					},
					push: {
						docs: [],
						errors: []
					}
				};

				this.localDatabase.sync( this.remoteDatabase )
					// A change event is emitted for each direction - one for "push" and
					// one for "pull"; but, only if there are changes for that direction.
					// We want to aggregate the change events, so when each one happens,
					// we'll just overwrite the "direction" results.
					.on(
						"change",
						( eventValue: IPouchDBSyncChangeResult ) : void => {

							result[ eventValue.direction ].docs = eventValue.change.docs;
							result[ eventValue.direction ].errors = eventValue.change.errors;

						}
					)
					// The complete event just shows some overall stats about the sync 
					// operation that could have been deduced, in part, by the various
					// "change" events that were fired.
					.on(
						"complete",
						( eventValue: IPouchDBSyncCompleteResult ) : void => {

							// We don't actually need any of the data from the completed
							// event - it just signified that the result has been fully
							// populated.
							resolve( result );

							// Once the sync operation has completed, clear out the 
							// pending promise. This won't affect the out-of-scope
							// references to it; but, it will allow new sync operations
							// to be initiated.
							this.pendingSync = null;

						}
					)
					// An error event signifies a critical error - not a document-level
					// problem in the bulk operations.
					.on(
						"error",
						( eventValue: any ) : void => {

							reject( eventValue );

							// Allow new sync operations to be initiated.
							this.pendingSync = null;

						}
					)
				;

			}
		);

		return( promise );

	}


	// I teardown / deconfigure the existing database instance (if there is one). 
	// --
	// CAUTION: Subsequent calls to .getDB() will fail until a new instance is configured
	// with a call to .configureForUser().
	public teardown() : void {

		if ( ! this.localDatabase ) {
			
			return;

		}

		this.pendingSync = null;

		this.localDatabase.close();
		this.localDatabase = null;

		this.remoteDatabase.close();
		this.remoteDatabase = null;

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I return a normalized database name for the given user identifier.
	private getDatabaseName( userIdentifier: string ) : string {

		// Database naming restrictions from https://wiki.apache.org/couchdb/HTTP_database_API
		// --
		// A database must be named with all lowercase letters (a-z), digits (0-9), or 
		// any of the _$()+-/ characters and must end with a slash in the URL. The name 
		// has to start with a lowercase letter (a-z)... Uppercase characters are NOT 
		// ALLOWED in database names.
		var dbName = userIdentifier
			.toLowerCase()
			.replace( /[^a-z0-9_$()+-]/g, "-" )
		;

		return( "js-demo-pouchdb-cloudant-sync-angular2-" + dbName );

	}

}

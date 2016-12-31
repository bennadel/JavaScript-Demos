
// The PouchDB library is delivered as a CommonJS module and I am not yet sure how to 
// configure my System.js setup to allow for a more simple import statement. This is the
// only thing that I can get to work at this time.
// --
// CAUTION: TypeScript still complains, "Cannot find module 'pouchdb'."
import * as PouchDB from "pouchdb";

export class PouchDBService {

	private db: any;


	// I initialize the service.
	constructor() {

		this.db = null;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I teardown any existing PouchDB instance and configure a new one for the given
	// user identifier. All subsequent calls to getDB() will return the newly configured
	// PouchDB instance.
	public configureForUser( userIdentifier: string ) : void {

		this.teardown();
		this.db = new PouchDB( this.getDatabaseName( userIdentifier ) );

		// TODO: Setup replication for remote database (not needed for this demo).

		console.warn( "Configured new PouchDB database for,", this.db.name );

	}


	// I get the active PouchDB instance. Throws an error if no PouchDB instance is 
	// available (ie, user has not yet been configured with call to .configureForUser()).
	public getDB() : any {

		if ( ! this.db ) {

			throw( new Error( "Database is not available - please configure an instance." ) );

		}

		return( this.db );

	}


	// I teardown / deconfigure the existing database instance (if there is one). 
	// --
	// CAUTION: Subsequent calls to .getDB() will fail until a new instance is configured
	// with a call to .configureForUser().
	public teardown() : void {

		if ( ! this.db ) {
			
			return;

		}

		// TODO: Stop remote replication for existing database (not needed for this demo).
		
		this.db.close();
		this.db = null;

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

		return( "javascript-demos-pouchdb-angular2-" + dbName );

	}

}

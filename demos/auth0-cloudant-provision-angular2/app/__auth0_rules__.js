
function addCloudantInfo( user, context, callback ) {

	// CAUTION: Since all of my JavaScript Demos are going through the same Auth0 
	// account, I need to make the demos "forward compatible". As such, each Rule will 
	// be tied to a specific client ID that I'll be creating anew for each demo. This 
	// way, only the rules associated with a particular demo will be applied to the 
	// authenticating user.
	if ( context.clientID !== "BxjlFCNofp00qollw06emBULwBCxkELn" ) {

		return( callback( null, user, context ) );

	}

	// Ensure application meta-data exists.
	user.app_metadata = ( user.app_metadata || {} );

	// If the user already has a CouchDB database provisioned, move on to the next Rule -
	// no need to do any work!
	if ( user.app_metadata.couchDB ) {

		return( callback( null, user, context ) );

	}


	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //


	// If we've made it this far, the user does NOT yet have a CouchDB database cached
	// in their app_metadata. As such, we'll need to provision one if it doesn't exist
	// and create login credentials for it (ie, an API key).

	// Require the core node modules.
	var Cloudant = require( "cloudant@1.4.1" );
	var crypto = require( "crypto" );
	var Q = require( "q@1.4.1" );

	// Create our Cloudant API client - this is a thin wrapper around Nano - a minimal
	// CouchDB driver for Node.js. Cloudand adds additional Cloudant-specific 
	// functionality like API key, CORS, and Search methods.
	// --
	// Cloudant: https://github.com/cloudant/nodejs-cloudant/tree/627095c3c71b5af503e295f3be7db30809335676#authorization-and-api-keys
	// Nano: https://github.com/apache/couchdb-nano
	// --
	// NOTE: I'm using a specific commit for Cloudant since only v1.4.1 is available 
	// inside WebTask.io, which is where this Rule will execute.
	var cloudant = new Cloudant({
		account: configuration.CloudantApiUsername,
		password: configuration.CloudantApiPassword
	});

	// Prepare the CouchDB configuration that we're going to build and cache.
	var couchDB = {
		host: configuration.CloudantHost,
		name: getDatabaseName( user ),
		key: "",
		password: ""
	};

	Q.when()
		// First, we're going to create the CouchDB database on Cloudant, if it doesn't
		// exist; or, return the existing one for this user.
		.then(
			function handleResolve() {

				return( provisionDatabase( couchDB.name ) );
				
			}
		)
		// Once we have the database, we're going to provision a new API key for this 
		// user and grant Read, Write, and Replicator access to the above database.
		.then(
			function handleResolve( result ) {

				return( provisionApiKey( couchDB.name ) );

			}
		)
		// Once we have the API key provisioned, we'll want to cache it with the
		// app_metadata so that it will be available across logins (for this user).
		.then(
			function handleResolve( result ) {

				couchDB.key = result.key;
				couchDB.password = result.password;

				// Inject the CouchDB into the app_metadata for this login transaction - 
				// this will make it available on the next get-profile request.
				// --
				// CAUTION: The content of the app_metadata is APPENDED to the user 
				// Profile in addition to be being made available as the app_metadata key.
				// As such, be careful not to overwrite any core Profile properties.
				user.app_metadata.couchDB = couchDB;

				// Persist the augmented app_metadata across logins.
				return( setAppMetadata( user.user_id, user.app_metadata ) );

			}
		)
		// Once the CouchDB credentials have been persisted to the app_metadata, we can
		// move onto the next authorization rule.
		.then(
			function handleResolve( result ) {

				callback( null, user, context );

			}
		)
		.catch(
			function handleError( error ) {

				console.log( "Something went wrong with authorization:" );
				console.log( error );
				console.log( ( error && error.stack ) || "No stacktrace available." );

				// If something went wrong during the database provisioning, then we 
				// can't let the user into the application, even if they authenticated
				// properly - they will need to try and login again so that the database
				// can try to be provisioned again.
				callback( new UnauthorizedError( "Database could not be provisioned at this time, please try to login again." ) );

			}
		)
	;


	// ------------------------------------------------------------------------------- //
	// Workflow Methods.
	// ------------------------------------------------------------------------------- //


	// I create a new API key and assign it permissions to the given database. Returns
	// a promise that resolves to the new API key credentials.
	function provisionApiKey( name ) {

		var apiKeyResult = null;

		var promise = Q
			.all([
				createApiKey(), // Create a new API key.
				getSecurity( name ) // Get the current permissions for the given database.
			])
			.spread(
				function handleResolve( apiKey, security ) {

					// Hold on to the key so that we can return it in the final resolve.
					apiKeyResult = apiKey;

					// Grant the new API key permissions on the given database.
					security[ apiKey.key ] = [ "_reader", "_writer", "_replicator" ];

					// Persist the permissions back to Cloudant.
					return( setSecurity( name, security ) );

				}
			)
			// Once the security has been persisted, resolve with the API key so that we
			// can expose the new credentials.
			.then(
				function handleResolve( result ) {

					return( apiKeyResult );

				}
			)
		;

		return( promise );

	}


	// I create the given database if doesn't exist. Resolves with "get" promise.
	function provisionDatabase( name ) {

		// Rather than trying to GET the database first to see if it exists, let's just
		// try to create it and let the resultant error indicate that it already exists.
		// This is less efficient, but more straightforward.
		var promise = createDatabase( name ).then(
			function handleResult( result ) {

				// If it was just created, return the NEW database.
				return( getDatabase( name ) );

			},
			function handleError( error ) {

				// If it already existed, return the EXISTING database.
				return( getDatabase( name ) );

			}
		);

		return( promise );

	}


	// ------------------------------------------------------------------------------- //
	// Utility Methods.
	// ------------------------------------------------------------------------------- //


	// General note about Q (Promise) and Cloudant -- the Callback for API calls through
	// the Cloudant lib are invoked with two parameters:
	// --
	// - Body: The HTTP response body from CouchDB, if no error. JSON or binary.
	// - Header: The HTTP response header from CouchDB, if no error.
	// --
	// The problem with this is that if the Q (our Promise library) proxy methods are 
	// invoked with more than one resolution parameter, Q will resolve the promise with
	// an Array of the given values. Since I only want the first parameter - the body -
	// I will pluck the first result with .get(0). For example:
	// --
	// Q.ninvoke( cloudant, "some_method" ).get( 0 )
	// --


	// I generate a new API key for Cloudant security. Returns a promise.
	function createApiKey() {

		// Resolves to type: 
		// {
		//   key: string;
		//   password: string;
		//   ok: boolean;
		// }
		var promise = Q
			.ninvoke( cloudant, "generate_api_key" )
			.get( 0 )
		;

		return( promise );

	}


	// I create a new database with the given name.
	function createDatabase( name ) {

		// Resolves to type:
		// {
		//   ok: boolean;
		// }
		var promise = Q
			.ninvoke( cloudant.db, "create", name )
			.get( 0 )
		;

		return( promise );

	}


	// I get the database with the given name.
	function getDatabase( name ) {

		// Resolves to type:
		// {
		//   db_name: string;
		//   doc_count: number;
		//   ... several others ...
		// }
		var promise = Q
			.ninvoke( cloudant.db, "get", name )
			.get( 0 )
		;

		return( promise );

	}


	// I calculate the normalized database name that should be used for the user with
	// the given email address. Since databases are based on physical file storage, 
	// database names are constrained to the lowest common denominator for all operating
	// systems: 
	// --
	// - All lower case.
	// - Must start with a-z.
	// - Can only have a-z, 0-9, and any of following ==> _$()+-/ <==. 
	// --
	function getDatabaseName( user ) {

		// Since this is a PUBLIC DEMO, I don't want to end up creating thousands of
		// databases as people try this out. As such, I'm going to bucket the databases 
		// by the first letter of the hash of the email.
		var hash = crypto
			.createHash( "md5" )
			.update( user.email )
			.digest( "hex" )
			.toLowerCase()
		;

		var matches = hash.match( /[a-z]/ );
		var letter = ( ( matches && matches[ 0 ] ) || "a" );

		return( "email-hash--" + letter );

	}


	// I get the security settings for the given database.
	function getSecurity( name ) {

		// The Security API has a weird asymmetry. When you SET the security, it expects
		// an object containing the users / keys being assigned to the database. But, 
		// when you GET the security, it returns the settings name-spaced to "cloudant".
		// I believe this is because Cloudant applies its own layer of security on top 
		// of the CouchDB security. In order to normalize the API, we're going to pluck 
		// the "cloudant" key out of the result so that the GET and SET operations both 
		// use an object containing security assignments.
		var promise = Q
			.ninvoke( cloudant.use( name ), "get_security" )
			.spread(
				function( result, headers ) {

					// CAUTION: If the database was just provisioned, it won't have the
					// "cloudant" name-space on it yet. On subsequent requests, however,
					// it may be defined if the security has been updated.
					return( result.cloudant || {} );

				}
			)
		;

		return( promise );

	}


	// I set the app_metadata for the given Auth0 user_id.
	function setAppMetadata( userID, appMetadata ) {

		var promise = Q.ninvoke( auth0.users, "updateAppMetadata", userID, appMetadata );

		return( promise );

	}


	// I set the security configuration for the given database.
	function setSecurity( name, security ) {

		// Resolves to type:
		// {
		//   ok: boolean;
		// }
		var promise = Q
			.ninvoke( cloudant.use( name ), "set_security", security )
			.get( 0 )
		;

		return( promise );
		
	}

}

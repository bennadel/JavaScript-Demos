function addLoginCount( user, context, callback ) {

	// Ensure that the user_meteadata exists.
	// --
	// NOTE: It won't exist on the user object until one of the rules explicitly 
	// creates it (or we assign metadata to the user through something like the API).
	user.user_metadata = ( user.user_metadata || {} );

	// NOTE: I believe that stats.loginsCount always exists; but, the documentation only
	// goes so far as confirming "stats" - it doesn't state that loginsCount is always
	// available. As such, I am trying to be safe about accessing it.
	user.user_metadata.loginCount = ( context.stats && context.stats.loginsCount ) 
		? context.stats.loginsCount
		: 0
	;
	
	callback( null, user, context );

}


function addLoginAudit( user, context, callback ) {
	
	// Ensure that the user_meteadata exists.
	// --
	// NOTE: It won't exist on the user object until one of the rules explicitly 
	// creates it (or we assign metadata to the user through something like the API).
	user.user_metadata = ( user.user_metadata || {} );

	// Ensure that the login audit log exists.
	user.user_metadata.logins = ( user.user_metadata.logins || [] );	

	// Track the current login (in descending order).
	user.user_metadata.logins.unshift({
		ip: context.request.ip,
		userAgent: context.request.userAgent,
		createdAt: Date.now()
	});

	// Limit the audit log to only 10 most recent logins.
	user.user_metadata.logins = user.user_metadata.logins.slice( 0, 10 );
	
	// At this point, all we've done is updated the in-memory user-metadata associated 
	// with this login request. Now, we have to push this data back over to Auth0 (from
	// the current webtask.io server), using an API call, so that these changes will be
	// persisted over to the next login.
	auth0.users
		.updateUserMetadata( user.user_id, user.user_metadata )
		.then(
			function handleResolve() {

				callback( null, user, context );

			}
		)
		.catch(
			function handleError( error ) {

				callback( error );

			}
		)
	;

}



/*

Notes:


Auth0 allows you to store metadata, or data related to each user that has not come from the identity provider. There are two kinds of metadata:

user_metadata:
==============
Stores user attributes (such as user preferences) that do not impact a user's core functionality;

app_metadata:
=============
Stores information (such as a user's support plan, security roles, or access control groups) that can impact a user's core functionality, such as how an application functions or what the user can access.


NOTE: An authenticated user can modify data in their profile's user_metadata, but not in their app_metadata.

.... Built by the team that brought you Auth0, Webtask 

*/

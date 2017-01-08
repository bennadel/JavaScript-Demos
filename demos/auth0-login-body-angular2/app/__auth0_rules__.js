
function addRequestBodyAnalysis( user, context, callback ) {

	// Since every Rule runs during the Auth0 authentication / authorization workflow,
	// there's no implicit way to skip a Rule. But, each login transaction reports the 
	// Client ID making the request. As such, we can explicitly bail out of any Rule 
	// that is meant to be associated with a different Client ID.
	if ( context.clientID !== "K3zOzhAsrok9mx6yrrwDcbMggFC9QxjZ" ) {

		return( callback( null, user, context ) );

	}

	// If you pass additional key-value pairs in during authentication, the non-core
	// keys (ie, not the keys like "email", "code", "passcode", etc), are made available
	// in the Rules engine as part of the Request Body collection.
	var params = ( context.request.body.params || {} );

	// CAUTION: For some reason, all of the "simple values" in the request.context.body 
	// come through as Strings. Arrays are still arrays and Objects are still objects; 
	// but, all of the non-complex values come through as strings. So, for example:
	// --
	// - ( true ) comes through as ( "true" ).
	// - ( 3 ) comes through as ( "3" ).
	// - ( null ) comes through as ( "" ).
	// - ( undefined ) comes through as ( "" ).
	// --
	// So, just be careful about how you use your triple-equals comparison!
	if ( params.reconnectDatabase === "true" ) {

		user.bodyAnalysis = "Your database has been reconnected!";

	} else {

		user.bodyAnalysis = "No additional params were provided.";

	}

	// Move on to next Rule.
	callback( null, user, context );

}

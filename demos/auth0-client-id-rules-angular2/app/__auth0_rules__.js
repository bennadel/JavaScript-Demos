
function addMessageInfo_ClientOne( user, context, callback ) {

	// Since every Rule runs during Auth0 authentication / authorization, there's no 
	// implicit way to skip a Rule. But, each login transaction reports the Client ID
	// making the request. As such, we can explicitly bail out of any Rule that is 
	// meant to be associated with a specific Client ID.
	if ( context.clientID !== "v07m1dBLNy5yecCg1B7QDiDDYhhRlduW" ) {

		return( callback( null, user, context ) );

	}

	user.message = "Client One: Are you thinking what I'm thinking, Pinky?";

	// Move on to next Rule.
	callback( null, user, context );

}

// .... 

function addMessageInfo_ClientTwo( user, context, callback ) {

	// Since every Rule runs during Auth0 authentication / authorization, there's no 
	// implicit way to skip a Rule. But, each login transaction reports the Client ID
	// making the request. As such, we can explicitly bail out of any Rule that is 
	// meant to be associated with a specific Client ID.
	if ( context.clientID !== "1rGDpEiO80x8os6sJpsTnHImxwLzzx0P" ) {

		return( callback( null, user, context ) );

	}

	user.message = "Client Two: I think so Brain, but I don't think you can legally marry JavaScript.";

	// Move on to next Rule.
	callback( null, user, context );

}

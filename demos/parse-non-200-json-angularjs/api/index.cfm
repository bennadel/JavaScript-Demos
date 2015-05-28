<cfscript>
	
	param name="url.test" type="string" default="";

	// Set up the default API response settings.
	response = {
		statusCode = 200,
		statusText = "OK",
		data = ""
	};

	// Check to see which status-code we are going to test. Each of the status codes, 
	// regardless of an indicated success ( 2xx ) or failure ( 4xx, 5xx ) will return
	// JSON (JavaScript Object Notation) to the client.
	if ( url.test == 200 ) {

		response.data = {
			"id" = 4,
			"name" = "Kim",
			"codeName" = "Awesome Sauce"
		};

	} else if ( url.test == 400 ) {

		response.statusCode = 400;
		response.statusText = "Bad Request";

		response.data = {
			"type" = "App.BadRequest",
			"message" = "You can't do that!",
			"code" = 40343
		};

	} else if ( url.test == 500 ) {

		response.statusCode = 500;
		response.statusText = "Server Error";

		response.data = {
			"type" = "App.ServerError",
			"message" = "Something has gone horribly wrong!",
			"code" = 666666
		};

	} else {

		throw( type = "App.UnexpectedTestCase" );

	}

</cfscript>

<cfheader 
	statuscode="#response.statusCode#" 
	statustext="#response.statusText#" 
	/>

<!--- Reset the output buffers and stream JSON to the client. --->
<cfcontent 
	type="application/json" 
	variable="#charsetDecode( serializeJson( response.data ), 'utf-8' )#" 
	/>

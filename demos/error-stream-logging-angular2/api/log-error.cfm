<cfscript>
	
	// Extract the incoming request data.
	requestHeaders = getHttpRequestData().headers;
	requestBody = getHttpRequestData().content;

	// We are expecting "application/json" data to be coming into this API.
	// If the incoming request is not announcing itself as JSON, bail out.
	if ( ! findNoCase( "/json", requestHeaders[ "content-type" ] ) ) {

		throw( 
			type = "BadRequest",
			message = "API expects data in application/json format.",
			detail = "Data posted as [#requestHeaders[ "content-type" ]#]."
		);

	}

	// Parse the posted JSON and append to the native form scope.
	structAppend( form, deserializeJson( trim( toString( requestBody ) ) ) );

	// For this demo, we're just going to echo back the error to make it easier
	// to see that the data went through successfully.
	responseMessage = {
		"success": true,
		"echo": {
			"location": form.location,
			"stackTrace": form.stackTrace
		}
	};

</cfscript>

<!--- Stream response back to client. --->
<cfcontent 
	type="application/json; charset=utf-8" 
	variable="#charsetDecode( serializeJson( responseMessage ), 'utf-8' )#"
	/>
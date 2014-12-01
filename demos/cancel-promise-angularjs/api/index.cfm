<cfscript>
	
	// Sleep for 3-seconds to give our demo time to cancel the promise.
	sleep( 3 * 1000 );

	friends = [
		{
			"id" = 1,
			"name" = "Sarah"
		},
		{
			"id" = 2,
			"name" = "Tricia"
		},
		{
			"id" = 3,
			"name" = "Kim"
		}
	];

	responseBody = serializeJson( friends );

</cfscript>

<cfcontent
	type="application/x-json"
	variable="#charsetDecode( responseBody, 'utf-8' )#"
	/>

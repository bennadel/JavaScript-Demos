<cfscript>

	// ******************************************************************************* //
	// ******************************************************************************* //
	// CAUTION: WRITING USER-PROVIDED FILES TO AN ACCESSIBLE WEB LOCATION IS EXTREMELY
	// DANGEROUS AND SHOULD NEVER EVER EVER EVER BE DONE IN A PRODUCTION APPLICATION.
	// --
	// I am doing this only because the server-side file-handling is not the point of
	// the demo - it is here only to facilitate the Angular code. In reality, allowing
	// a user to upload a file and then reference it directly allows for REMOTE CODE
	// EXECUTION which is a critical security vulnerability.
	// ******************************************************************************* //
	// ******************************************************************************* //

	try {

		// Enforce URL parameters.
		param name="url.clientFilename" type="string";
		param name="url.mimeType" type="string";

		fileWrite(
			expandPath( "/uploads/#url.clientFilename#" ),
			getHttpRequestData().content
		);

		// Return the web-accessible file location of the upload (for the demo).
		response = {
			"url": "./api/uploads/#url.clientFilename#"
		};

		cfcontent(
			type = "application/json",
			variable = charsetDecode( serializeJson( response ), "utf-8" )
		);

	} catch ( any error ) {

		cfheader( statusCode = 500 );
		cfcontent(
			type = "application/json",
			variable = charsetDecode( serializeJson( error ), "utf-8" )
		);

	}

</cfscript>

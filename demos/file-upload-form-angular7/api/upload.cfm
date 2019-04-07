<cfscript>

	// CAUTION: Exercise caution when saving user-provided files to a publicly-accessible
	// location on a web-server - it could create a remote-code execution vulnerability.

	try {

		// --------------------------------------------------------------------------- //
		// --------------------------------------------------------------------------- //

		// When the Lucee server sees a "multipart/form-data" post, it automatically
		// parses the data and appends it to the FORM scope. For files, Lucee put's the
		// TEMP FILE PATH into the form-field.
		param name="form.name" type="string";
		param name="form.email" type="string";
		param name="form.memo" type="string";
		param name="form.resume" type="string" default="";
		param name="form.sample" type="string" default="";

		uploadDirectory = expandPath( "/uploads/upload-#createUuid()#/" );

		directoryCreate( uploadDirectory );

		// Save the user-submitted job-application data.
		fileWrite(
			file = ( uploadDirectory & "meta-data.json" ),
			data = serializeJson({
				name: form.name,
				email: form.email,
				memo: form.memo
			})
		);

		// When saving uploaded files in the form-post, the fileUpload() method will copy
		// the file-binary from the server's temp directory - ie, getTempDirectory() -
		// into the destination folder using the original clientFilename of the file.

		// If the user did NOT upload a file, the "resume" form-field will be empty.
		if ( len( form.resume ) ) {

			fileUpload(
				destination = uploadDirectory,
				fileField = "resume"
			);

		}

		// If the user did NOT upload a file, the "sample" form-field will be empty.
		if ( len( form.sample ) ) {

			fileUpload(
				destination = uploadDirectory,
				fileField = "sample"
			);

		}

		// --------------------------------------------------------------------------- //
		// --------------------------------------------------------------------------- //

		cfcontent(
			type = "text/plain",
			variable = charsetDecode( serializeJson( "OK" ), "utf-8" )
		);

	} catch ( any error ) {

		// For the sake of the demo, just serialize and return the error.
		// --
		// CAUTION: In a production app, you never want to return the raw error as this
		// will expose private information about your application and server.
		cfheader( statusCode = 500 );
		cfcontent(
			type = "application/json",
			variable = charsetDecode( serializeJson( error ), "utf-8" )
		);

	}

</cfscript>

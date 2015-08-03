<cfscript>
	
	userInput = "FOO";

	INPUT_FOO = "foo";
	INPUT_BAR = "bar";
	INPUT_BAZ = "baz";

	switch ( userInput ) {

		case INPUT_FOO:
			writeOutput( "User entered 'Foo'." );
		break;

		case INPUT_BAR:
			writeOutput( "User entered 'Bar'." );
		break;

		case INPUT_BAZ:
			writeOutput( "User entered 'Baz'." );
		break;

	}

</cfscript>
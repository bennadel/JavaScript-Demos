<cfscript>

	// Simulate request-specific, dynamic configuration using random values.
	switch ( randRange( 1, 3 ) ) {
		case "1":

			company = {
				"id": 1,
				"name": "Acme Corp",
				"established": 1908
			};

		break;
		case "2":

			company = {
				"id": 2,
				"name": "Evil Corp",
				"established": 2007
			};

		break;
		case "3":

			company = {
				"id": 3,
				"name": "Happy Corp",
				"established": 1980
			};

		break;
	}

	config = {
		"company": company,
		"version": "2019.01.11.6.19.0"
	};

</cfscript>

<!--- ------------------------------------------------------------------------------ --->
<!--- ------------------------------------------------------------------------------ --->

<!--- Reset the output buffer. --->
<cfcontent type="text/html; charset=utf-8" />

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />

	<title>
		Using Embedded Data To Provide Request-Specific Application Configuration In Angular 7.2.0 (CFML Version)
	</title>

	<cfoutput>
		<script type="text/javascript">

			// Since the Angular application needs to be configured on a per-request
			// basis, we can provide the ColdFusion data in the JavaScript context by
			// serializing the data on the ColdFusion server and then parsing it on the
			// client as JSON.
			// --
			// NOTE: By using the encodeForJavaScript() function, we are preventing the
			// injection of Cross-Site Scripting (XSS) attacks in any user-provided
			// content that may exist within the configuration payload (ex, company.name).
			window.appConfig = JSON.parse( "#encodeForJavaScript( serializeJson( config ) )#" );

		</script>
	</cfoutput>
</head>
<body>

	<h1>
		Using Embedded Data To Provide Request-Specific Application Configuration In Angular 7.2.0 (CFML Version)
	</h1>

	<my-app></my-app>

<script type="text/javascript" src="build/main.205133e77faef2c0e2b7.js"></script><script type="text/javascript" src="build/runtime.f0dde21f71700b84f182.js"></script><script type="text/javascript" src="build/vendors~main.a7b483fcdb35e174d85f.js"></script></body>
</html>

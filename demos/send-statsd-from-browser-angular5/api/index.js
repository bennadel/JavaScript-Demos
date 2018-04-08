
// Require the core node modules.
var chalk = require( "chalk" );
var express = require( "express" );

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var app = express();

// Enable middleware to automatically parse JSON request payloads.
app.use( express.json() );

// For the demo, since we're posting from port :80 to :8080, we need to enable CORS
// (Cross-Origin Resource Sharing). This is evaluated by the browser through the OPTIONS
// METHOD check. For simplicity, we're going to allow all (*) origins.
// --
// NOTE: In a "normal app", I probably wouldn't be posting to a different port. I'm only
// doing this because my port :80 is already in use on my local development environment.
app.use(
	function ( request, response, next ) {

		// Taken from: https://enable-cors.org/server_expressjs.html
		response.header( "Access-Control-Allow-Origin", "*" );
		response.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
		next();

	}
);

// This is our browser-sent StatsD metrics proxy route.
app.post(
	"/metrics-proxy",
	function ( request, response, next ) {

		console.log( chalk.red.bold( "Metrics sent from browser." ) );

		// This route-handler will send metrics to our Time-Series Database (TSDB). And,
		// as it will pass-through browser-provided (ie, USER-PROVIDED) values, we have
		// to take care to white-list the metrics that can be sent. Assume that if
		// something CAN be abused, someone will FIND A WAY to abuse it. If nothing else,
		// we don't want people filling our TSDB with garbage values.
		for ( var dataInput of request.body.dataInputs ) {

			switch ( dataInput.metric ) {
				case "angular-app.box.hide":
				case "angular-app.box.show":
				case "angular-app.interactions.first-click":
				case "angular-app.users":

					// At this point, we could use a normal StatsD client to forward this
					// metric onto the StatsD server. It should be noted, however, that I
					// am not performing any aggregation on the browser. As such, these
					// metrics values will be slightly delayed and show up as "clumps" in
					// the TSDB.
					// --
					// NOTE: For the demo, I'm just simulating a simple UDP string.
					console.log(
						chalk.green( ` ➜ ${ chalk.bold( "Sending:" ) }` ),
						chalk.green( formatDataInput( dataInput ) )
					);

				break;
				default:

					console.log(
						chalk.dim.italic( " > Suspicious input skipped:" ),
						chalk.dim.italic( dataInput.metric )
					);

				break;
			}

		}

		response.status( 200 );
		response.json( true );

	}
);

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I format the data-input for the demo output. This is intended to mimic the formatting
// used by a real StatsD / DogStatsD client.
function formatDataInput( dataInput ) {

	switch ( dataInput.type ) {
		case "counter":
			var indicator = "c";
		break;
		case "gauge":
			var indicator = "g";
		break;
		case "histogram":
			var indicator = "h";
		break;
		case "set":
			var indicator = "s";
		break;
		case "timing":
			var indicator = "ms";
		break;
	}

	var tags = ( dataInput.tags && dataInput.tags.length )
		? `|#${ dataInput.tags.join( "," ) }`
		: ""
	;

	return( `${ dataInput.metric }:${ dataInput.value }|${ indicator }${ tags }` );

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Start the HTTP server.
app.listen(
	8080,
	function handleListen() {

		console.log( "Node.js demo server listening on port :8080" );	

	}
);

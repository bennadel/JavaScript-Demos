;(function sandbox( win, doc, undefined ) {

	"use strict";

	// If the user has consumed the pre-load library hook, we have to make sure not to 
	// overwrite the reference as this may break the user's application.
	var logger = win.logger = ( win.logger || [] );

	// I log the given event with the optional meta-data.
	logger.log = function( eventType, data ) {

		console.info( "Event: [", eventType, "] with data [", JSON.stringify( data || "" ), "]." );

	};

	// ---
	// ---

	// Now that the 3rd-party library has been fully loaded, we have to flush the queue.
	// Since this object is really an array at heart, we can just keep shifting items off
	// the front and piping them through to the newly-defined .log() method.
	while ( logger.length ) {

		logger.log.apply( logger, logger.shift() );

	}

})( window, document );
(function() { "use strict";

	window.analytics = {
		identify: identify,
		track: track
	};

	function identify( userID, traits ) {

		console.group( "analytics-service.js (remote script)" );
		console.log( ".identify()" );
		console.log( "userID:", userID );
		console.log( "traits:", traits );
		console.groupEnd();

	}

	function track( eventID, eventProperties ) {

		console.group( "analytics-service.js (remote script)" );
		console.log( ".track()" );
		console.log( "eventID:", eventID );
		console.log( "eventProperties:", eventProperties );
		console.groupEnd();

	}

})();
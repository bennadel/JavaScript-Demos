(function( ng, app ) {
	"use strict";

	app.factory( "data", DemoDataFactory );

	function DemoDataFactory() {

		var roles = [ "Admin", "Manager", "Designer", "Engineer", "Reviewer" ];
		var dates = [ "Just now", "A few minutes ago", "Today", "Yesterday", "Last week", "Last month", null ];
		var locations = [ "New York", "Los Angeles", "Boston", "Chicago", "Miami", "Austin", "Atlanta" ];
		var avatarUrls = [ "./avataaars-1.png", "./avataaars-2.png", "./avataaars-3.png", null ];
		var people = [];

		for ( var i = 1 ; i < 301 ; i++ ) {

			people.push({
				id: i,
				name: ( "Person " + i ),
				email: ( "person-" + i + "@example.com" ),
				role: getRandom( roles ),
				documents: Math.floor( Math.random() * 100 ),
				lastSeen: getRandom( dates ),
				location: getRandom( locations ),
				initials: ( "P" + i ),
				avatarUrl: getRandom( avatarUrls )
			});

		}

		// Return public API.
		return({
			people: people,
			roles: roles
		});

		// ---
		// PRIVATE METHODS.
		// ---

		function getRandom( collection ) {

			var randomIndex = Math.floor( Math.random() * collection.length );

			return( collection[ randomIndex ] );

		}

	}

})( angular, app );

angular.module( "Demo" ).directive(
	"friendsList",
	function() {

		// Return the directive configuration.
		return({
			controller: "FriendsListController",
			link: link,
			restrict: "A",
			templateUrl: "friends-list/friends-list.htm"
		});


		// I bind the JavaScript events to the scope.
		function link( scope, element, attributes ) {

			console.log( "Friends list directive linking." );

		}

	}
);
angular.module( "Demo" ).directive(
	"enemiesList",
	function() {

		// Return the directive configuration.
		return({
			controller: "EnemiesListController",
			link: link,
			restrict: "A",
			templateUrl: "enemies-list/enemies-list.htm"
		});


		// I bind the JavaScript events to the scope.
		function link( scope, element, attributes ) {

			console.log( "Enemies list directive linking." );

		}

	}
);
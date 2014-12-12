angular.module( "Demo" ).directive(
	"secondaryLayout",
	function() {

		// Return the directive configuration.
		return({
			controller: "SecondaryLayoutController",
			link: link,
			restrict: "A",
			templateUrl: "secondary-layout/secondary-layout.htm"
		});


		// I bind the JavaScript events to the scope.
		function link( scope, element, attributes ) {

			console.log( "Secondary layout directive linking." );

		}

	}
);
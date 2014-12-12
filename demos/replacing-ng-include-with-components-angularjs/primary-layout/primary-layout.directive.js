angular.module( "Demo" ).directive(
	"primaryLayout",
	function() {

		// Return the directive configuration.
		return({
			controller: "PrimaryLayoutController",
			link: link,
			restrict: "A",
			templateUrl: "primary-layout/primary-layout.htm"
		});


		// I bind the JavaScript events to the scope.
		function link( scope, element, attributes ) {

			console.log( "Primary layout directive linking." );

		}

	}
);
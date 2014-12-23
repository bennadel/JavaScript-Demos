angular.module( "Demo" ).directive(
	"bnThing",
	function() {

		// Return the directive configuration.
		// --
		// NOTE: We are using the isolate scope!!
		return({
			link: link,
			restrict: "A",
			scope: {}
		});


		// I bind the JavaScript events to the local scope.
		function link( scope, element, attributes ) {

			console.log( "bnThing linked" );

		}

	}
);

(function( ng, app ) {
	"use strict";

	app.directive( "bnGoodBind", GoodBindDirective );

	function GoodBindDirective() {

		return({
			link: linkFunction,
			restrict: "A"
		});

		function linkFunction( $scope, element, attributes ) {

			element[ 0 ].textContent = $scope.$eval( attributes.bnGoodBind );

		};

	}

})( angular, app );

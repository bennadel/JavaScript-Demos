(function( ng, app ) {
	"use strict";

	app.directive( "bnGoodChange", GoodChangeDirective );

	function GoodChangeDirective() {

		return({
			link: linkFunction,
			restrict: "A"
		});

		function linkFunction( $scope, element, attributes ) {

			element[ 0 ].addEventListener(
				"change",
				function handleChange() {

					$scope.$apply( attributes.bnGoodChange );

				}
			);

		};

	}

})( angular, app );

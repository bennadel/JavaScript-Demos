(function( ng, app ) {
	"use strict";

	app.directive( "bnGoodSrc", GoodSrcDirective );

	function GoodSrcDirective() {

		return({
			link: linkFunction,
			restrict: "A"
		});

		function linkFunction( $scope, element, attributes ) {

			element[ 0 ].src = $scope.$eval( attributes.bnGoodSrc );

		};

	}

})( angular, app );

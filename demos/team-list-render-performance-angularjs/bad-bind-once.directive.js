(function( ng, app ) {
	"use strict";

	app.directive( "bnBadBindOnce", BadBindOnceDirective );

	function BadBindOnceDirective() {

		return({
			link: linkFunction,
			restrict: "A",
			scope: true
		});

		function linkFunction( $scope, element ) {

			setTimeout(function() {
				$scope.$destroy();
				element.removeClass('ng-binding ng-scope');
			}, 0);

		};

	}

})( angular, app );

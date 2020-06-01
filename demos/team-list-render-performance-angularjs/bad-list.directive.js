(function( ng, app ) {
	"use strict";

	app.directive( "bnBadList", BadListDirective );

	function BadListDirective() {

		return({
			controller: "badList.Controller",
			restrict: "E",
			templateUrl: "./bad-list.directive.htm"
		});

	}

})( angular, app );

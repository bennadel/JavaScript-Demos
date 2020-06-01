(function( ng, app ) {
	"use strict";

	app.directive( "bnHackyList", HackyListDirective );

	function HackyListDirective() {

		return({
			controller: "hackyList.Controller",
			restrict: "E",
			templateUrl: "./hacky-list.directive.htm"
		});

	}

})( angular, app );

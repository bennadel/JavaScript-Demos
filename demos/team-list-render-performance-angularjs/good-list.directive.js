(function( ng, app ) {
	"use strict";

	app.directive( "bnGoodList", GoodListDirective );

	function GoodListDirective() {

		return({
			controller: "goodList.Controller",
			restrict: "E",
			templateUrl: "./good-list.directive.htm"
		});

	}

})( angular, app );

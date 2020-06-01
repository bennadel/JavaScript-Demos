(function( ng, app ) {
	"use strict";

	app.controller( "badList.Controller", BadListController );

	function BadListController(
		$scope,
		data
		) {

		$scope.people = data.people;
		$scope.roles = data.roles;
		$scope.isAdmin = true;
		$scope.form = {
			selected: Object.create( null )
		};

	}

})( angular, app );

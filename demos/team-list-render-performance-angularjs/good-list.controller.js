(function( ng, app ) {
	"use strict";

	app.controller( "goodList.Controller", GoodListController );

	function GoodListController(
		$scope,
		data
		) {

		$scope.people = data.people;
		$scope.roles = data.roles;
		$scope.isAdmin = true;
		$scope.form = {
			selected: Object.create( null )
		};

		$scope.toggleSelection = function( person ) {

			$scope.form.selected[ person.id ] = ! $scope.form.selected[ person.id ];

		};

	}

})( angular, app );

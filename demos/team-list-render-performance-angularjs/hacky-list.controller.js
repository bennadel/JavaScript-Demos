(function( ng, app ) {
	"use strict";

	app.controller( "hackyList.Controller", HackyListController );

	function HackyListController(
		$scope,
		data
		) {

		$scope.people = data.people;
		$scope.roles = data.roles;
		$scope.isAdmin = true;
		$scope.form = {
			selected: Object.create( null )
		};

		$scope.dynamicPeople = null;
		setDynamicPeople();

		// ---
		// PUBLIC METHODS.
		// ---

		$scope.toggleSelection = function( person ) {

			$scope.form.selected[ person.id ] = ! $scope.form.selected[ person.id ];

		};

		// ---
		// PRIVATE METHODS.
		// ---

		function setDynamicPeople() {

			// Start out by rendering only the segment of the list that is "above the
			// fold". Then, after a brief rendering pause, render the rest of the list.
			$scope.dynamicPeople = $scope.people.slice( 0, 30 );

			setTimeout(
				function() {

					$scope.dynamicPeople = $scope.people;
					$scope.$digest();

				},
				150
			);

		}

	}

})( angular, app );

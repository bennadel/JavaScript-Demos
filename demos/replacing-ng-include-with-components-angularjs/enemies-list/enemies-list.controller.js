angular.module( "Demo" ).controller(
	"EnemiesListController",
	function( $scope ) {

		// I am the collection of enemies.
		$scope.enemies = [
			{
				id: 1,
				name: "Brody"
			},
			{
				id: 2,
				name: "Jimbo"
			}
		];

	}
);
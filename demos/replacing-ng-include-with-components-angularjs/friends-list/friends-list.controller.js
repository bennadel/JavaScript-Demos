angular.module( "Demo" ).controller(
	"FriendsListController",
	function( $scope ) {

		// I am the collection of friends.
		$scope.friends = [
			{
				id: 1,
				name: "Kim"
			},
			{
				id: 2,
				name: "Sarah"
			},
			{
				id: 3,
				name: "Tricia"
			}
		];

	}
);
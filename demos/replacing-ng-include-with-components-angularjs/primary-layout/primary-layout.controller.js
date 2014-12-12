angular.module( "Demo" ).controller(
	"PrimaryLayoutController",
	function( $scope ) {

		// Set the browser window title.
		// --
		// CAUTION: Inherited scope method.
		$scope.setWindowTitle( "Showing Primary Layout!" );

	}
);
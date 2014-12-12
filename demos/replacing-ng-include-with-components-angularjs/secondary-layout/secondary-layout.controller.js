angular.module( "Demo" ).controller(
	"SecondaryLayoutController",
	function( $scope ) {

		// Set the browser window title.
		// --
		// CAUTION: Inherited scope method.
		$scope.setWindowTitle( "Showing Secondary Layout!" );

	}
);
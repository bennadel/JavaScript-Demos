angular.module( "Demo", [ "ng" ] ).controller(
	"AppController",
	function( $scope ) {

		// I am the title display in the browser window.
		$scope.windowTitle = "Loading... simmer down now!";

		// I determine which layout component is being included.
		$scope.layout = "primary";


		// ---
		// PUBLIC METHODS.
		// ---


		// I set the browser window title to the given title.
		$scope.setWindowTitle = function( title ) {

			$scope.windowTitle = title;

		};


		// I set the current layout to primary.
		$scope.showPrimaryLayout = function() {

			$scope.layout = "primary";

		};


		// I set the current layout to secondary.
		$scope.showSecondaryLayout = function() {

			$scope.layout = "secondary";

		};

	}
);

// This component collection is intended to be all the controllers, 
// services, factories, and directives (etc) that are required to 
// operate the "Lazy" module.
// --
// NOTE: We are not actually creating a "module" (as in angular.module)
// since that would not work after bootstrapping.


// Lazy-loaded controller.
app.controller(
	"LazyController",
	function( $scope, uppercase, util ) {

		$scope.message = util.emphasize(
			uppercase( "After app bootstrap." )
		);

	}
);


// Lazy-loaded service.
app.service(
	"util",
	function( emphasize ) {

		this.emphasize = emphasize;

	}
);


// Lazy-loaded factory.
app.factory(
	"emphasize",
	function() {

		return(
			function( value ) {

				return( value.replace( /\.$/, "!!!!" ) );

			}
		);

	}
);


// Lazy-loaded value.
app.value(
	"uppercase",
	function( value ) {

		return( value.toString().toUpperCase() );

	}
);


// Lazy-loaded directive.
app.directive(
	"bnItalics",
	function() {

		return( 
			function( $scope, element ) {

				element.css( "font-style", "italic" );
			
			}
		);

	}
);
// I return the count of watchers on the current page.
function getWatchCount() {

	// AngularJS denotes new scopes in the HTML markup by appending the class 
	// "ng-scope" to appropriate elements. As such, rather than attempting to 
	// navigate the hierarchical Scope tree, we can simply query the DOM for 
	// the individual scopes. Then, we can pluck the watcher-count from each 
	// scope.
	var nodes = document.querySelectorAll( ".ng-scope" );

	// Keep track of the total number of watch bindings.
	var total = 0;

	// There are cases in which two different ng-scope markers will actually 
	// be referencing the same scope, such as with transclusion into an existing
	// scope. As such, we need to make sure that we don't double-count scopes.
	var scopeIds = {};

	// Loop over each matched node.
	for ( var i = 0 ; i < nodes.length ; i++ ) {

		// Get the AngularJS scope associated with the current node.
		var scope = angular.element( nodes[ i ] ).scope();

		// Make sure we're not double-counting this scope.
		if ( scopeIds.hasOwnProperty( scope.$id ) ) {
			
			continue;

		}

		scopeIds[ scope.$id ] = true;

		// The $$watchers value starts out as NULL.
		if ( scope.$$watchers ) {

			total += scope.$$watchers.length;

		}
		
	}

	return( total );

}
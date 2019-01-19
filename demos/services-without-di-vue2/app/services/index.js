
// Import application classes.
import { ApiClient } from "./api-client";
import { FriendService } from "./friend-service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Without a proper dependency-injection (DI) container, we can AT THE VERY LEAST use a
// JavaScript module to create a de facto service container that other modules can pull
// from. This way, we will still have some inversion-of-control (IoC) that will help us
// think more deeply about the separation of concerns and the modularity of our code.
// --
// Manually wire services together.

export var apiClient = new ApiClient( "./api" );

apiClient.onStatusCode(
	function handleStatusCode( statusCode ) {

		console.group( "HTTP Status Code" );
		console.log( statusCode );
		console.groupEnd();

		// If the status code indicates an UNAUTHORIZED request, the user's session
		// has probably been terminated. As such, bounce the user to the root of the
		// application.
		if ( statusCode === 401 ) {

			window.location.href = "/";

		}

	}
);

export var friendService = new FriendService( apiClient );

// CAUTION: By exporting these services in a single file, we prevent any individual
// service from being eliminated as "dead code" during subsequent "tree shaking". That
// may or may not be a cause for concern. If so, you could always move each service
// instantiation to its own file.

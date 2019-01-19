
export class ApiClient {

	// I initialize the api-client service.
	constructor( baseUrl ) {

		this._baseUrl = baseUrl;
		this._listeners = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I perform an HTTP GET for the given end-point.
	async get( endpoint ) {

		try {

			var response = await fetch(
				`${ this._baseUrl }${ endpoint }`,
				{
					method: "get",
					cache: "no-cache",
					credentials: "same-origin"
				}
			);

		} catch ( error ) {

			// If the fetch() operation failed, there was either a network failure or a
			// CORS configuration error. As such, let's emit status code "0".
			this._emit( 0 );

			// Re-throw error since we cannot recover from this.
			throw( error );

		}
		
		// At this point, we know there was no network error, so just emit the status
		// code of the response - fetch() will resolve with both OK and NOT OK status
		// codes.
		this._emit( response.status );

		if ( response.ok ) {

			return( response.json() );

		}

		return( Promise.reject( await response.json() ) );

	}


	// I register a listener for HTTP status codes returned from the API response.
	onStatusCode( listener ) {

		this._listeners.push( listener );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I invoke each listener with the given HTTP status code.
	_emit( statusCode ) {

		for ( var listener of this._listeners ) {

			listener( statusCode );

		}

	}

}

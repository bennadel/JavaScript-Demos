
// Import the core angular services.
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface StringMap {
	[ key: string ]: string;
}

export interface RequestConfig {
	method: string;
	url: string;
	params?: StringMap;
	headers?: StringMap;
	body?: any;
}

@Injectable({
	providedIn: "root"
})
export class ApiHttpClient {

	private httpClient: HttpClient;

	// I initialize the api-client.
	constructor( httpClient: HttpClient ) {

		this.httpClient = httpClient;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I make an HTTP request to the API and return an observable response.
	public makeRequest<T>( requestConfig: RequestConfig ) : Observable<T> {

		// The point of having a specialized API HttpClient is that you can bake-in logic
		// that is specific to this API, but not necessarily needed for any other
		// HttpClient in the application. There is a LOT you can do with this pattern;
		// but, for the PURPOSES OF THIS DEMO, we're only going to be sending the current
		// browser's timezone offset (in minutes).
		var headers: StringMap = {
			...requestConfig.headers,

			// Pass the timezone offset as a special HTTP header. This way, the server
			// can record this value if it has been changed (based on the user's locale).
			"X-Timezone-Offset": this.getTimezoneOffset()
		};

		var httpStream = this.httpClient.request<T>(
			requestConfig.method,
			requestConfig.url,
			{
				responseType: "json",
				headers: headers
			}
		);

		return( httpStream );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return the timezone offset (in minutes) for the current Browser platform. This
	// is the number of minutes that the current timezone would have to add to a Date in
	// order to calculated the current UTC time.
	private getTimezoneOffset() : string {

		return( String( new Date().getTimezoneOffset() ) );

	}

}

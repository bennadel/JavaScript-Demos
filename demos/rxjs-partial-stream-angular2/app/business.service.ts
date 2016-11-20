
// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";

// Load modules for side-effects.
import "rxjs/add/operator/delay";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class BusinessService {

	private http: Http;
	

	// I initialize the service.
	constructor( http: Http ) {

		this.http = http;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I perform an action that requires several serialized server-side API calls.
	// --
	// CAUTION: Returns a COLD stream.
	public makeItSo() : Observable<string> {

		var stream = this.http
			.get( this.getUrlA() )
			.delay( 3000 ) // Simulate network latency.
			.mergeMap(
				( response: Response ) : Observable<Response> => {

					// The second HTTP request needed to fulfill this action needs to be
					// built using the response of the first action. That's why these 
					// requests cannot be run in parallel.
					var id = response.json().id;

					return( this.http.get( this.getUrlB( id ) ) );

				}
			)
			.map(
				( response: Response ) : string => {

					return( response.json().message );

				}
			)
		;

		return( stream );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I return the URL for the first HTTP request.
	private getUrlA() : string {

		// NOTE: Using .getTime() because Chrome is being overly aggressive with caching
		// (even when I have the Chrome Dev Tools open).
		return( `./app/business.service.a.json?_=${ new Date().getTime() }` );

	}


	// I return the URL for the second HTTP request.
	private getUrlB( id: number ) : string {

		// NOTE: Using .getTime() because Chrome is being overly aggressive with caching
		// (even when I have the Chrome Dev Tools open).
		return( `./app/business.service.b.json?id=${ id }&_=${ new Date().getTime() }` );

	}

}

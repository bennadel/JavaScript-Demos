
// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "@angular/http";

// Enable RxJS operators.
import "rxjs/add/operator/map";


// I provide a service for accessing the Friend repository.
@Injectable()
export class FriendService {

	// I hold the URL prefix for the API call.
	private baseUrl: string;

	// I provide an HTTP client implementation.
	private http: Http;


	// I initialize the service.
	constructor( http: Http ) {

		this.baseUrl = "./app/";
		this.http = http;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I return the entire collection of friends as an Observable.
	public getFriends() : Observable {

		var stream = this.http
			.get( this.baseUrl + "friends.json" )
			.map( this.unwrapResolve )
		;

		return( stream );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I unwrap the raw HTTP response, returning the deserialized data.
	private unwrapResolve( response: Response ) : string {

		return( response.json() );

	}

}
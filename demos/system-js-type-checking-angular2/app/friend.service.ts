
// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";

// Enable RxJS operators (importing for SIDE-EFFECTS only).
import "rxjs/add/operator/map";


// I define the shape of the Friend data structure.
export interface Friend {
	id: number;
	name: string;
	isBFF: boolean;
}


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
	public getFriends() : Observable<Friend[]> {

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
	private unwrapResolve( response: Response ) : Friend[] {

		return( response.json() );

	}

}
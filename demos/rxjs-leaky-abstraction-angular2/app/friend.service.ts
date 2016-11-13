
// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";

// Load modules for side-effects.
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";


export interface IFriend {
	id: number;
	name: string;
}


@Injectable()
export class FriendService {

	private http: Http;
	

	// I initialize the service.
	constructor( http: Http ) {

		this.http = http;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I return an observable collection of Friends.
	public getFriends() : Observable<IFriend[]> {

		var stream = this.http
			.get( "./app/friend.service.json" ) // Go to the server for the data.
			.map(
				( response: Response ) : IFriend[] => {

					return( response.json() );

				}
			)
		;

		// Just testing with no-latency streams.
		// --
		// var stream = Observable.of( [ { id: 1, name: "Tina" } ] );

		// While the getFriends() method returns a Stream, it doesn't necessarily mean
		// that said stream should be capable of terminating the underlying HTTP 
		// request. Doing so could be considered a "leaky abstraction" as it is allowing 
		// the implementation details of the Service to leak out into the calling 
		// context. By creating an intermediary Promise, it allows the HTTP request to 
		// be initiated regardless of what the calling context does with the stream.
		return( Observable.fromPromise( stream.toPromise() ) );

	}

}


// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";

// Load modules for side-effects.
import "rxjs/add/observable/fromPromise";
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

		this.trackMethod( "getFriends" );

		var stream = this.http
			.get( "./app/friend.service.NOT_FOUND.json" ) // Go to the server for the data.
			.map(
				( response: Response ) : IFriend[] => {

					return( response.json() );

				}
			)
		;

		// By returning the actual HTTP stream, our underlying implementation of this 
		// service-layer method leaks out into the calling context. By doing this, we
		// allow the HTTP request to be made (or NOT MADE AT ALL) outside the context 
		// of the service layer, bypassing analytics and other tracking methods.
		// --
		return( stream );

		// By disconnecting the "implementation stream" from the "results stream", we
		// keep clean boundaries around our encapsulated logic.
		// --
		// return( Observable.fromPromise( stream.toPromise() ) );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I track method calls for subsequent analytics and analysis. 
	private trackMethod( methodName: string ) : void {

		console.warn( "Tracking method:", methodName );

	}

}

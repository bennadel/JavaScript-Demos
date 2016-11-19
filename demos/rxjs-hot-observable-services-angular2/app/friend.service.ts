
// Import the core angular services.
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";

// Load modules for side-effects.
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishLast";

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

		// NOTE: Using .getTime() because Chrome is being overly aggressive with caching
		// (even when I have the Chrome Dev Tools open).
		var stream = this.http
			.get( "./app/friend.service.json?_=" + new Date().getTime() )
			.map(
				( response: Response ) : IFriend[] => {

					return( response.json() );

				}
			)
			// Create a stream that waits for the underlying (Http) stream to finish 
			// (in either completion or in error) before it emits the last value received
			// by the underlying stream. The "publish" portion allows multiple subscribers
			// to connect to the Http stream without re-sending it across the wire; and,
			// the "last" portion allows the emitted result to be provided to 
			// subscriptions that get created AFTER the underlying stream has completed.
			// --
			// NOTE: At this point, the underlying (Http) stream cannot be canceled by 
			// the calling context -- which I BELIEVE is what you want in the majority 
			// of "service layer" methods.
			.publishLast()
		;

		// Connect the "publishLast" stream to the underlying Http stream, creating a 
		// "hot" stream that will start to fire immediately.
		stream.connect();

		return( stream );

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I track method calls for subsequent analytics and analysis. 
	private trackMethod( methodName: string ) : void {

		console.warn( "Tracking method:", methodName );

	}

}

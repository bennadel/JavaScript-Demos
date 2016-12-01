
// Import the core angular services.
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// Import RxJS modules for "side effects".
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";

// Import the application components and services.
import { LocalStorageService } from "./local-storage.service";


export interface IFriend {
	id: number;
	name: string;
}


@Injectable()
export class FriendService {

	private localStorageService: LocalStorageService;


	// I initialize the friend service.
	constructor( localStorageService: LocalStorageService ) {

		this.localStorageService = localStorageService;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I create a new friend with the given name and return the new observable id.
	public createFriend( name: string ) : Observable<number> {

		var friends = this.loadFriends();
		var friend = {
			id: ( new Date() ).getTime(),
			name: name
		};

		this.localStorageService.setItem( "friends", friends.concat( friend ) );

		return( Observable.of( friend.id ) );

	}


	// I return an observable collection of friends.
	public getFriends() : Observable<IFriend[]> {

		return( Observable.of( this.loadFriends() ) );

	}


	// I remove the friend with the given id. Returns an observable confirmation.
	public removeFriend( id: number ) : Observable<void> {

		var friends = this.loadFriends();
		var friendIndex = friends.findIndex(
			( item: IFriend ) : boolean => {

				return( item.id === id );

			}
		);

		if ( friendIndex >= 0 ) {

			friends = friends.slice();
			friends.splice( friendIndex, 1 );

			this.localStorageService.setItem( "friends", friends );

			return( Observable.of( null ) );

		} else {

			return( Observable.throw( new Error( "Not Found" ) ) );

		}

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I load the friends collection from the persistent storage.
	private loadFriends() : IFriend[] {

		var friends = <IFriend[]>this.localStorageService.getItem( "friends" );

		return( friends || [] );

	}

}

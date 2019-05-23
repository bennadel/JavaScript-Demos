
// Import the core angular services.
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// Import the application components and services.
import { SimpleStore } from "./simple-store";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export interface Friend {
	id: number;
	name: string;
}

// NOTE: Internal state interface is never needed outside of runtime.
interface FriendsState {
	id: number;
	friends: Friend[];
}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class FriendsRuntime {

	private store: SimpleStore<FriendsState>;

	// I initialize the friends runtime.
	constructor() {

		// NOTE: For the store instance we are NOT USING DEPENDENCY-INJECTION. That's
		// because the store isn't really a "behavior" that we would ever want to swap -
		// it's just a slightly more complex data structure. In reality, it's just a
		// fancy hash/object that can also emit values.
		this.store = new SimpleStore({
			id: 0,
			friends: []
		});

		this.addFriend( "Sarah" );
		this.addFriend( "Joanna" );
		this.addFriend( "Kit" );

	}

	// ---
	// COMMAND METHODS.
	// ---

	// I add a new friend with the given name. Resolves to the ID of the newly-created
	// friend record.
	public async addFriend( name: string ) : Promise<number> {

		if ( ! name ) {

			throw( new Error( "Friend name required." ) );

		}

		var state = this.store.getSnapshot();

		var id = ( state.id + 1 );
		var friend = { id, name };
		var friends = state.friends.concat( friend ).sort( this.sortFriendsOperator );

		this.store.setState({ id, friends });

		return( friend.id );

	}


	// I remove the friend with the given id.
	public async removeFriend( id: number ) : Promise<void> {

		var state = this.store.getSnapshot();

		var friends = state.friends.filter(
			( friend ) => {

				return( friend.id !== id );

			}
		);

		this.store.setState({ friends });

	}

	// ---
	// QUERY METHODS.
	// ---

	// I return a stream for the friends.
	public getFriends() : Observable<Friend[]> {

		return( this.store.select( "friends" ) );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I provide the sort-operator for friends.
	private sortFriendsOperator( a: Friend, b: Friend ) : number {

		var aName = a.name.toLowerCase();
		var bName = b.name.toLowerCase();

		return(
			( ( aName < bName ) && -1 ) ||
			( ( aName > bName ) && 1 ) ||
			0
		);

	}

}


// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	initials: string;
	email: string;
	avatarUrl: string;
}

interface PartialUser {
	id: number;
}

@Injectable({
	providedIn: "root"
})
export class Session {

	public user: User;

	// I initialize the session object.
	constructor() {

		this.user = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I determine if the currently logged-in user matches the given identifier.
	public isForUser( partialUser: PartialUser ) : boolean;
	public isForUser( partialUser: number ) : boolean;
	public isForUser( partialUser: any ) : boolean {

		if ( ! this.user ) {

			return( false );

		}

		if ( typeof( partialUser ) === "number" ) {

			return( this.user.id === partialUser );

		} else {

			return( this.user.id === partialUser.id );

		}

	}


	// I set the currently logged-in user.
	public setUser( user: User ) : void {

		this.user = user;

	}

}

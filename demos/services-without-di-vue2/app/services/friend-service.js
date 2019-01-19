
export class FriendService {

	// I initialize the friend-service.
	constructor( apiClient ) {

		this._apiClient = apiClient;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get all of the friends. Returns a Promise.
	async getFriends() {

		return( await this._apiClient.get( "/friends/index.json" ) );

	}

}

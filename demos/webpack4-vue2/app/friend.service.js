
export class FriendService {

	// I return a collection of friends using the given names.
	// --
	// NOTE: For the same of simplicity, data-access is synchronous.
	getFriends( ...names ) {

		var id = 0;
		var friends = names.map(
			( name ) => {

				return({
					id: ++id,
					name: name
				});

			}
		);

		return( friends );

	}

}

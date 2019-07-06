
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Friend } from "./friend.service";
import { FriendService } from "./friend.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// The FriendResult interface is the View-model that wraps the Friend and makes it easier
// to consume for this particular component. This way, we can leave the Friend data as an
// immutable data-structure, while augmenting / adding functionality that is optimized
// for the interactions in this view. Not the least of which is the fact that the results
// themselves can be MUTATED DIRECTLY, making operation easier.
interface FriendResult {
	// These are the View-specific augmentations for the collection.
	isVisible: boolean;
	keywords: string[];
	sortable: {
		name: string;
		createdAt: number;
	};

	// This is the IMMUTABLE object that we are wrapping.
	friend: Friend;
}

type SortType = "name" | "createdAt";

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Search:
			<input
				type="text"
				autofocus
				(input)="handleFilterOn( $event.target.value )"
			/>
		</p>

		<p>
			Sort On:
			<a (click)="handleSortOn( 'name' )">Name</a>,
			<a (click)="handleSortOn( 'createdAt' )">Created</a>
		</p>

		<ul class="results">
			<li
				*ngFor="let result of results"
				class="result"
				[hidden]="( ! result.isVisible )">

				<app-friend-card
					[name]="result.friend.name"
					[email]="result.friend.email">
				</app-friend-card>

			</li>
		</ul>
	`
})
export class AppComponent {

	public results: FriendResult[];

	private friends: Friend[];
	private friendService: FriendService;

	// I initialize the app component.
	constructor( friendService: FriendService ) {

		this.friendService = friendService;

		this.friends = [];
		this.results = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the filter on the given query.
	public handleFilterOn( query: string ) : void {

		this.filterResults( this.results, query );

	}


	// I handle the sort on the given field.
	public handleSortOn( field: SortType ) : void {

		this.sortResults( this.results, field );

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.friendService.getFriends().then(
			( friends ) => {

				this.friends = friends;
				// We aren't going to render the Friends collection directly in the view.
				// Instead, we are going to wrap it in a "results" collection that we can
				// more efficiently manipulate for our view-behaviors.
				this.results = this.buildResults( friends );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I build the MUTABLE results collection that wraps the IMMUTABLE friends
	// collection.
	private buildResults( friends: Friend[] ) : FriendResult[] {

		var mappedFriends = friends.map(
			( friend ) => {

				return({
					// The augmented functionality bits.
					isVisible: true,
					keywords: [
						this.normalizeForSearch( friend.name ),
						this.normalizeForSearch( friend.email )
					],
					sortable: {
						name: friend.name.toUpperCase(),
						createdAt: friend.createdAt.getTime()
					},

					// The immutable item from Friends that we are "wrapping".
					friend: friend
				});

			}
		);

		return( this.sortResults( mappedFriends, "name" ) );

	}


	// I filter the given results set using the given query. Returns collection.
	private filterResults( results: FriendResult[], query: string ) : FriendResult[] {

		// The results collection data has already been normalized for search. As such,
		// we can now normalize our search query so that we can consume it more easily.
		// This minimized the amount of processing we have to do for each search.
		var normalizedQuery = this.normalizeForSearch( query );

		// As we iterate over the results, notice that we are MUTATING the collection
		// directly. We can do this since we're never passing the collection into a
		// context that depends on reference-based change-detection (ngFor always checks
		// the ngForOf collection). That said, we are never mutating the underlying
		// Friend reference; that remains IMMUTABLE.
		for ( var result of results ) {

			// If there's no query, reset the visibility of the result.
			if ( ! normalizedQuery ) {

				result.isVisible = true;
				continue;

			}

			// If we have a search query, hide all results by default; then, show a
			// result only if it matches the given input query.
			result.isVisible = false;

			for ( var keyword of result.keywords ) {

				if ( keyword.includes( normalizedQuery ) ) {

					result.isVisible = true;
					continue;

				}

			}

		}

		return( results );

	}


	// I normalize the given input for search filtering.
	private normalizeForSearch( input: string ) : string {

		return( input.toUpperCase() );

	}


	// I sort the given results set using the given sort-type. Returns results.
	private sortResults( results: FriendResult[], field: SortType ) : FriendResult[] {

		switch ( field ) {
			case "createdAt":
				var sortDirection = 1;
			break;
			default:
				var sortDirection = -1;
			break;
		}

		// Sort the results IN PLACE. Since this is being used by ngFor, we don't need
		// to worry about making the results collection immutable; ngFor is going to
		// iterate over it on every digest anyway.
		results.sort(
			( a, b ) => {

				if ( a.sortable[ field ] < b.sortable[ field ] ) {

					return( sortDirection );

				} else if ( a.sortable[ field ] > b.sortable[ field ] ) {

					return( -sortDirection );

				} else {

					return( 0 );

				}

			}
		);

		return( results );

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Friend } from "./friends";
import { friends } from "./friends";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface SearchResult {
	friend: Friend;
	sort: string;
	keywords: string;
}

var USE_FILTER_OPTIMIZATION = true;

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public allSearchResults!: SearchResult[];
	public filteredSearchResults!: SearchResult[];
	public searchFilter: string;

	private friends: Friend[];
	private previousSearchFilter: string;

	// I initialize the app component.
	constructor() {

		this.friends = friends;

		this.searchFilter = "";
		this.previousSearchFilter = "";
		this.setAllSearchResults();
		this.setFilteredSearchResults();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I update the filtered search results to use the given filter.
	public applySearchFilter( searchFilter: string ) : void {

		this.searchFilter = searchFilter.trim();
		this.setFilteredSearchResults( USE_FILTER_OPTIMIZATION );

		// Now that we've applied the filtering for the given search filter, let's store
		// the given filter as the previous filter so that we can attempt to optimize
		// subsequent filter operations that build on top of the current one.
		this.previousSearchFilter = this.searchFilter;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I setup the all-results collection based on the current friends.
	private setAllSearchResults() : void {

		this.allSearchResults = this.friends.map(
			( friend ) => {

				return({
					friend: friend,
					sort: friend.name.toLowerCase(),
					keywords: friend.name.toLowerCase()
				});

			}
		);

		this.allSearchResults.sort(
			( a, b ) => {

				return( a.sort.localeCompare( b.sort ) );

			}
		);

	}


	// I setup the filtered-results collection based on the current all-results.
	private setFilteredSearchResults( useFilterOptimization: boolean = false ) : void {

		var normalizedFilter = this.searchFilter.toLowerCase();

		if ( normalizedFilter ) {

			// PERFORMANCE OPTIMIZATION: If the current filter is just an ADDITION to the
			// previous filter, then we can improve performance of the search by using
			// the FILTERED SEARCH RESULTS as our target set. This means that as the user
			// types "forward", each operation will operate over an increasingly small
			// number of records.
			var canUseFilterOptization = (
				useFilterOptimization &&
				this.previousSearchFilter &&
				this.searchFilter.startsWith( this.previousSearchFilter )
			);

			var intermediaryResults = ( canUseFilterOptization )
				? this.filteredSearchResults
				: this.allSearchResults
			;

			// Let's output some debugging information about which list we are searching
			// so that we can see how the progressive-search filtering affects the
			// surface area of the search operation.
			console.group( "Searching List" );
			console.log( "Keywords:", normalizedFilter );
			console.log( "Record Count:", intermediaryResults.length );
			console.groupEnd();

			this.filteredSearchResults = intermediaryResults.filter(
				( result ) => {

					return( result.keywords.includes( normalizedFilter ) );

				}
			);

		} else {

			// If there is no search-filter, then we can just reset the filtered-results
			// to be the all-results collection.
			this.filteredSearchResults = this.allSearchResults;

		}

	}

}


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

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public allSearchResults!: SearchResult[];
	public filteredSearchResults!: SearchResult[];
	public searchFilter: string;

	private friends: Friend[] = friends;

	// I initialize the app component.
	constructor() {

		this.searchFilter = "";
		this.setAllSearchResults();
		this.setFilteredSearchResults();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I update the filtered search results to use the given filter.
	public applySearchFilter( searchFilter: string ) : void {

		this.searchFilter = searchFilter.trim();
		this.setFilteredSearchResults();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I setup the all-results collection based on the current friends.
	private setAllSearchResults() : void {

		this.allSearchResults = this.friends.map(
			( friend ) => {

				// When we sort the results, we want to bubble the BFFs to the top. In
				// order to simplify this operation - treating it as an alpha-numeric
				// sort - we're going to prefix the calculated sort value with a string
				// that separates out the two cohorts.
				var sortPrefix = ( friend.isBFF )
					? "a|"
					: "z|"
				;

				// Now, the sortable target will be implicitly sorted by BFF first and
				// then Name second.
				var sort = ( sortPrefix + friend.name ).toLowerCase();

				// When the user searches the list, we want them to be able to search
				// across a variety of data-points. In order to simplify this operation,
				// we're going to pre-compile a "keywords" payload that aggregates all of
				// the targeted data-points.
				var keywords = [ friend.name ]
					.concat( friend.hobbies )
					.concat( friend.isBFF ? "bff" : "" )
					.join( "\n" )
					.toLowerCase()
				;

				return({
					friend: friend,
					sort: sort,
					keywords: keywords
				});

			}
		);

		// Note that our in-place sort just uses the pre-compiled "sort" property - it
		// doesn't need to inspect the "friend" object at this point.
		this.allSearchResults.sort(
			( a, b ) => {

				return( a.sort.localeCompare( b.sort ) );

			}
		);

	}


	// I setup the filtered-results collection based on the current all-results.
	private setFilteredSearchResults() : void {

		var normalizedFilter = this.searchFilter.toLowerCase();

		// If there is no search-filter, then we can just reset the filtered-results to
		// be the all-results collection.
		if ( ! normalizedFilter ) {

			this.filteredSearchResults = this.allSearchResults;
			return;

		}

		// Note that when we apply the filter against the search result, we only have to
		// examine the pre-compiled "keywords" value - we don't have to start searching
		// across a number of embedded properties - that work has already been done.
		this.filteredSearchResults = this.allSearchResults.filter(
			( result ) => {

				return( result.keywords.includes( normalizedFilter ) );

			}
		);

	}

}

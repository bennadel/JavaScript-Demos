function App() {

	// Note: the "id" value matches the "index" value. This fact will be leveraged when
	// reading the DOM for the sorted list of IDs.
	var id = -1;
	var titles = [
		{ id: ++id, name: "10 Things I Hate About You" },
		{ id: ++id, name: "50 First Dates" },
		{ id: ++id, name: "Annie Hall" },
		{ id: ++id, name: "Bridge Jones's Diary" },
		{ id: ++id, name: "Crazy Rich Asians" },
		{ id: ++id, name: "Dave" },
		{ id: ++id, name: "Defending Your Life" },
		{ id: ++id, name: "Dirty Dancing" },
		{ id: ++id, name: "Love Actually" },
		{ id: ++id, name: "Midnight In Paris" },
		{ id: ++id, name: "Moonstruck" },
		{ id: ++id, name: "Notting Hill" },
		{ id: ++id, name: "Pretty Woman" },
		{ id: ++id, name: "Princess Bride" },
		{ id: ++id, name: "Say Anything" },
		{ id: ++id, name: "Sleepless In Seattle" },
		{ id: ++id, name: "Tommy Boy" },
		{ id: ++id, name: "Wedding Singer" },
		{ id: ++id, name: "What About Bob" },
		{ id: ++id, name: "When Harry Met Sally" },
		{ id: ++id, name: "You've Got Mail" },
	];

	// ------------------------------------------------------------------------------- //
	// ------------------------------------------------------------------------------- //

	return {
		// Public properties.
		listOne: null,
		listTwo: null,
		similarity: "100",
		titles,
		// Private properties.
		distance: 0,
		sortableOne: null,
		sortableTwo: null,
		coreIds: null,
		// Life-cycle methods.
		init,
		// Public methods.
		handlePopstate,
		randomKeyBecauseXForBug,
		resetList,
		syncRight,
		// Private methods.
		compareRankings,
		getSortedListsFromDom,
		loadFromhash,
		persistToHash,
	};

	// ---
	// LIFE-CYCLE METHODS.
	// ---

	/**
	* I initialize the component.
	*/
	function init() {

		// Keep track of the core list of title IDs so that we can use this in the default
		// list assignment as well as in the hash parsing.
		this.coreIds = this.titles.map( title => title.id );
		// By default, set each list of title IDs to start with the core list. This will
		// then be overridden, as needed, by the URL fragment.
		this.listOne = this.coreIds.slice();
		this.listTwo = this.coreIds.slice();

		// Override the lists (if possible) using the URL fragment.
		this.loadFromhash();
		this.compareRankings();

		var sortableOptions = {
			direction: "vertical",
			swapThreshold: 0.8, // Overlap required to trigger move (0...1).
			animation: 0,
			onUpdate: ( event ) => {
				this.getSortedListsFromDom( event );
				this.compareRankings();
				this.persistToHash();
			}
		};

		// Enable sorting on the DOM lists.
		this.sortableOne = new Sortable( this.$refs.listOneNode, sortableOptions );
		this.sortableTwo = new Sortable( this.$refs.listTwoNode, sortableOptions );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I handle the history popState event, and sync the URL state down into the app state.
	*/
	function handlePopstate() {

		this.loadFromhash();
		this.compareRankings();

	}


	/**
	* There's a BUG(ish) in the way that X-For handles DOM-initiated re-sorting. As such,
	* we are working around it by providing a random key to the DOM id. This will create
	* DOM churn; but, it is what it is.
	* 
	* Read more: https://github.com/alpinejs/alpine/discussions/4157
	*/
	function randomKeyBecauseXForBug() {

		return Math.floor( Math.random() * 999999 );

	}


	/**
	* I reset the selected list to the original titles order.
	*/
	function resetList( whichList ) {

		this[ whichList ] = this.coreIds.slice();
		this.compareRankings();
		this.persistToHash();

	}


	/**
	* I sync the first list into the second list to give the user a matching base from
	* which to start customizing the sort.
	*/
	function syncRight() {

		this.listTwo = this.listOne.slice();
		this.compareRankings();
		this.persistToHash();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I compute the distance and similarity of the two lists.
	*/
	function compareRankings() {

		// Calculate the Kendall Tau Distance between the two list of titles.
		this.distance = kendallTauDistance( this.listOne, this.listTwo );
		// Convert the Kendall Tau Distance to something more human friendly.
		this.similarity = ( ( 1 - this.distance ) * 100 ).toFixed( 1 );

	}


	/**
	* I read the list of IDs back out of the DOM (via the Sortable proxy).
	*/
	function getSortedListsFromDom( event ) {

		// Our list DOM is rendered by Alpine.js (via the x-for directive); but, we're
		// allowing the list to be updated arbitrarily by Sortable.js. Once the sorting
		// operation is done, we need to read the state of the DOM back into the state of
		// Alpine.js so that the x-for attribute remains in a predictable state.
		// --
		// Note: there's a bug(ish) in the [x-for] attribute in the way it keeps track of
		// keys internally. We get around this by assigning random keys in the DOM.
		this.listOne = this.sortableOne.toArray();
		this.listTwo = this.sortableTwo.toArray();

	}


	/**
	* I override the rankings if the values are available in the URL fragment.
	*/
	function loadFromhash() {

		var rankings = location.hash
			.slice( 1 )
			// Split fragment into two comma-delimited lists.
			.split( ":" )
			// Map each comma-delimited list onto a set of IDs.
			.map(
				( rankList ) => {

					return rankList
						// Split each comma-delimited list into a set of IDs.
						.split( "," )
						// Make sure we didn't have any incorrect mappings.
						.filter( id => titles[ id ] )
					;

				}
			)
		;

		// We've already set up default values for the lists to use the core set of IDs.
		// We only want to now override these lists if they have the same length as the
		// defaults. This way, we don't have to do any more validation on the URL.

		if ( rankings[ 0 ]?.length === this.listOne.length ) {

			this.listOne = rankings[ 0 ];

		}

		if ( rankings[ 1 ]?.length === this.listTwo.length ) {

			this.listTwo = rankings[ 1 ];

		}

	}


	/**
	* I persist the current ranks to the URL fragment.
	*/
	function persistToHash() {

		var flattenedOne = this.listOne.join( "," );
		var flattenedTwo = this.listTwo.join( "," );
		var flattenedCore = this.coreIds.join( "," );

		// Vanity: if either of the lists matches the original list of titles, just omit
		// it from the URL. This has no functional bearing - it just makes the URL look a
		// little bit nicer.
		if ( flattenedOne === flattenedCore ) flattenedOne = "";
		if ( flattenedTwo === flattenedCore ) flattenedTwo = "";

		document.title = `Lists are a ${ this.similarity }% match!`;
		history.pushState( {}, null, `#${ flattenedOne }:${ flattenedTwo }` );

	}

	// ---
	// HELPER METHODS (ie, pure functions, not on THIS scope).
	// ---

	/**
	* I return an index of the given array in which the value maps to the index of the
	* value within the collection.
	*/
	function arrayReflectIndex( collection ) {

		var index = Object.create( null );

		collection.forEach(
			( element, i ) => {

				index[ element ] = i;

			}
		);

		return index;

	}


	/**
	* I calculate the Kendall Tau Distance for the two lists. Returns a decimal value
	* between 0 (fully identical) and 1 (fully reversed).
	*/
	function kendallTauDistance( listOne, listTwo ) {

		// We're going to be counting the number of (A,B) pairs that are in a different
		// relative order in the two lists.
		var size = listOne.length;
		var totalPairs = ( size * ( size - 1 ) / 2 );
		var discordantPairs = 0;

		// As we iterate over the FIRST list, we'll need to check the corresponding rank
		// of the same items in the SECOND list. To make this efficient, let's calculate
		// the index-by-value for all elements in the second list. We don't need to do
		// this for the first list since we'll be iterating over the first list in order.
		var listTwoIndex = arrayReflectIndex( listTwo );

		// Iterate over the FIRST list using a nested, forward looking loop. The outer
		// loop will iterate over the entirety of the first list.
		for ( var a = 0 ; a < ( size - 1 ) ; a++ ) {

			// ... the inner loop only needs to iterate from [a...] since we're looking
			// for unique pairs of elements. If the inner loop started from 0, we'd be
			// counting the same pairs more than once (since (A,B) and (B,A) are
			// considered the same pair for this algorithm).
			for ( var b = ( a + 1 ) ; b < size ; b++ ) {

				// Get the elements at the current iteration indices.
				var elementA = listOne[ a ];
				var elementB = listOne[ b ];
				// Since our nested loop is always exploring elements in a forward-looking
				// order, we know that the ranking of the elements in the first list is
				// always -1. We only need to calculate the corresponding rank in the
				// second list.
				var rankOne = -1;
				var rankTwo = Math.sign( listTwoIndex[ elementA ] - listTwoIndex[ elementB ] );

				if ( rankTwo != rankOne ) {

					discordantPairs++;

				}

			}

		}

		return ( discordantPairs / totalPairs );

	}

}

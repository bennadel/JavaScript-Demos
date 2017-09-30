
// Import the core angular services.
import find = require( "lodash/find" );
import flatten = require( "lodash/flatten" );
import indexOf = require( "lodash/indexOf" );
import last = require( "lodash/last" );
import random = require( "lodash/random" );
import sortBy = require( "lodash/sortBy" );

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Package and export the individual lodash functions as a local / extended version of 
// lodash. This way, you don't have to have little function names floating around in
// your code. It also makes it quite clear which functions are actually being used (and
// will need to be echoed in your "vendor" module).
export var _ = {
	find,
	flatten,
	indexOf,
	last,
	random,
	sortBy,
	sortByCaseInsensitive
};


// I proxy the sortBy() function, lower-casing the given item property.
function sortByCaseInsensitive<T>( collection: T[], property: string ) : T[] {

	var newCollection = sortBy(
		collection,
		( item: T ) : string => {

			return( item[ property ].toLowerCase() );

		}
	);

	return( newCollection );

}

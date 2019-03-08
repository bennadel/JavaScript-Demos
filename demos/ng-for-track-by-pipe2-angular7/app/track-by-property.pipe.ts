
// Import the core angular services.
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface TrackByFunctionCache {
	[ propertyName: string ]: <T>( index: number, item: T ) => any;
}

// Since the resultant TrackBy functions are based purely on a static property names, we
// can cache these Functions across the entire app. No need to generate more than one
// Function for the same property names.
var cache: TrackByFunctionCache = Object.create( null );

@Pipe({
	name: "trackByProperty",
	pure: true
})
export class TrackByPropertyPipe implements PipeTransform {

	// I return a TrackBy function that plucks the given properties from the ngFor item.
	public transform( propertyNames: "$index" ) : Function;
	public transform( propertyNames: string ) : Function;
	public transform( propertyNames: string[] ) : Function;
	public transform( propertyNames: any ) : Function {

		console.warn( `Getting track-by for [${ propertyNames.toString() }].` );

		var cacheKey = propertyNames;

		// If the given property names are defined as an Array, then we have to generate
		// the item identity based on the composition of several item values (in which 
		// each key in the input maps to a property on the item).
		if ( Array.isArray( propertyNames ) ) {

			cacheKey = propertyNames.join( "->" );

			// Ensure cached identity function.
			if ( ! cache[ cacheKey ] ) {

				cache[ cacheKey ] = function trackByProperty<T>( index: number, item: T ) : any {

					var values = [];

					// Collect the item values that will be aggregated in the resultant
					// item identity
					for ( var propertyName of propertyNames ) {

						values.push( item[ propertyName ] );

					}

					return( values.join( "->" ) );

				};

			}

		// If the property name is the special "$index" key, we'll create an identity
		// function that simply uses the collection index. This assumes that the order of
		// the collection is stable across change-detection cycles.
		} else if ( propertyNames === "$index" ) {

			// Ensure cached identity function.
			if ( ! cache[ cacheKey ] ) {

				cache[ cacheKey ] = function trackByProperty<T>( index: number, item: T ) : any {

					return( index ); // <---- Using INDEX.

				};

			}

		// By default, we'll use the provided item property value as the identity.
		} else {

			// Ensure cached identity function.
			if ( ! cache[ cacheKey ] ) {

				cache[ cacheKey ] = function trackByProperty<T>( index: number, item: T ) : any {

					return( item[ propertyNames ] ); // <---- Using VALUE.

				};

			}

		}

		return( cache[ cacheKey ] );

	}

}

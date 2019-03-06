
// Import the core angular services.
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface TrackByFunctionCache {
	[ propertyName: string ]: <T>( index: number, item: T ) => any;
}

// Since the resultant TrackBy functions are based purely on a static property name, we
// can cache these Functions across the entire app. No need to generate more than one
// Function for the same property.
var cache: TrackByFunctionCache = Object.create( null );

@Pipe({
	name: "trackByProperty",
	pure: true
})
export class TrackByPropertyPipe implements PipeTransform {

	// I return a TrackBy function that plucks the given property from the ngFor item.
	public transform( propertyName: string ) : Function {

		console.warn( `Getting track-by for [${ propertyName }].` );

		// Ensure cached function exists.
		if ( ! cache[ propertyName ] ) {

			cache[ propertyName ] = function trackByProperty<T>( index: number, item: T ) : any {

				return( item[ propertyName ] );

			};

		}

		return( cache[ propertyName ] );

	}

}

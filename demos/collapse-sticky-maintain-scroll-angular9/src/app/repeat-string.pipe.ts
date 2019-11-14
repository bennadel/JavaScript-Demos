
// Import the core angular services.
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Pipe({
	name: "repeatString"
})
export class RepeatStringPipe implements PipeTransform {

	public transform( value: string, count: number ) : string {

		return( value.repeat( count ) );

	}

}

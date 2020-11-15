
// Import the core angular services.
import { formatDate as ngFormatDate } from "@angular/common";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { LOCALE_ID } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// CAUTION: Numbers are implicitly assumed to be milliseconds since epoch and strings are
// implicitly assumed to be valid for the Date() constructor.
export type DateInput = Date | number | string;

// The single-character values here are meant to match the mask placeholders used in the
// native formatDate() function.
export type DatePart = 
	| "y" | "year" // Year
	| "M" | "month" // Month
	| "d" | "day" // Day
	| "h" | "hour" // Hour
	| "m" | "minute" // Minute
	| "s" | "second" // Second
	| "S" | "millisecond" // Fractional second (millisecond)
;

@Injectable({
	providedIn: "root"
})
export class DateHelper {

	private localID: string;

	// I initialize the date-helper with the given localization token.
	constructor( @Inject( LOCALE_ID ) localID: string ) {

		this.localID = localID;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add the given date/time delta to the given date. A new date is returned.
	public add( part: DatePart, delta: number, input: DateInput ) : Date {

		var result = new Date( input );

		switch ( part ) {
			case "year":
			case "y":
				result.setFullYear( result.getFullYear() + delta );
			break;
			case "month":
			case "M":
				result.setMonth( result.getMonth() + delta );
			break;
			case "day":
			case "d":
				result.setDate( result.getDate() + delta );
			break;
			case "hour":
			case "h":
				result.setHours( result.getHours() + delta );
			break;
			case "minute":
			case "m":
				result.setMinutes( result.getMinutes() + delta );
			break;
			case "second":
			case "s":
				result.setSeconds( result.getSeconds() + delta );
			break;
			case "millisecond":
			case "S":
				result.setMilliseconds( result.getMilliseconds() + delta );
			break;
		}

		return( result );

	}


	// I proxy the native formatDate() function with a partial application of the
	// LOCALE_ID that is being used in the application.
	public format( value: DateInput, mask: string ) : string {

		return( ngFormatDate( value, mask, this.localID ) );

	}

}

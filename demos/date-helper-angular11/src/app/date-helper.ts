
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
	| "y" | "year"
	| "M" | "month"
	| "d" | "day"
	| "h" | "hour"
	| "m" | "minute"
	| "s" | "second"
	| "S" | "millisecond"
;

var MS_SECOND = 1000;
var MS_MINUTE = ( MS_SECOND * 60 );
var MS_HOUR = ( MS_MINUTE * 60 );
var MS_DAY = ( MS_HOUR * 24 );
var MS_MONTH = ( MS_DAY * 30 ); // Rough estimate.
var MS_YEAR = ( MS_DAY * 365 ); // Rough estimate.

// The Moment.js library documents the "buckets" into which the "FROM NOW" deltas fall.
// To mimic this logic using milliseconds since epoch, let's calculate rough estimates of
// all the offsets. Then, we simply need to find the lowest matching bucket.
// --
// https://momentjs.com/docs/#/displaying/fromnow/
// 0 to 44 seconds --> a few seconds ago
// 45 to 89 seconds --> a minute ago
// 90 seconds to 44 minutes --> 2 minutes ago ... 44 minutes ago
// 45 to 89 minutes --> an hour ago
// 90 minutes to 21 hours --> 2 hours ago ... 21 hours ago
// 22 to 35 hours --> a day ago
// 36 hours to 25 days --> 2 days ago ... 25 days ago
// 26 to 45 days --> a month ago
// 45 to 319 days --> 2 months ago ... 10 months ago
// 320 to 547 days (1.5 years) --> a year ago
// 548 days+ --> 2 years ago ... 20 years ago
// --
// Here are the bucket delimiters in milliseconds:
var FROM_NOW_JUST_NOW = ( MS_SECOND * 44 );
var FROM_NOW_MINUTE = ( MS_SECOND * 89 );
var FROM_NOW_MINUTES = ( MS_MINUTE * 44 );
var FROM_NOW_HOUR = ( MS_MINUTE * 89 );
var FROM_NOW_HOURS = ( MS_HOUR * 21 );
var FROM_NOW_DAY = ( MS_HOUR * 35 );
var FROM_NOW_DAYS = ( MS_DAY * 25 );
var FROM_NOW_MONTH = ( MS_DAY * 45 );
var FROM_NOW_MONTHS = ( MS_DAY * 319 );
var FROM_NOW_YEAR = ( MS_DAY * 547 );

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


	// I return the number of days in the given month. The year must be included since
	// the days in February change during a leap-year.
	public daysInMonth( year: number, month: number ) : number {

		var lastDayOfMonth = new Date(
			year,
			// Go to the "next" month. This is always safe to do; if the next month is
			// beyond the boundary of the current year, it will automatically become the
			// appropriate month of the following year.
			( month + 1 ),
			// Go to the "zero" day of the "next" month. Since days range from 1-31, the
			// "0" day will automatically roll back to the last day of the previous
			// month. And, since we did ( month + 1 ) above, it will be ( month + 1 - 1 )
			// ... or simply, the last day of the "month" in question.
			0
		);

		return( lastDayOfMonth.getDate() );

	}


	// I determine the mount by which the first date is less than the second date using
	// the given date part. Returns an INTEGER that rounds down.
	// --
	// CAUTION: The Year / Month / Day diff'ing is a ROUGH ESTIMATE that should be good
	// enough for the vast majority of User Interface (UI) cases, especially since we're
	// rounding the differences in general. If you need something more accurate, that
	// would be the perfect reason to pull-in an external date library.
	public diff( part: DatePart, leftDateInput: DateInput, rightDateInput: DateInput ) : number {

		var delta = ( this.getTickCount( rightDateInput ) - this.getTickCount( leftDateInput ) );
		var multiplier = 1;

		// We always want the delta to be a positive number so that the .floor()
		// operation in the following switch truncates the value in a consistent way. We
		// will compensate for the normalization by using a dynamic multiplier.
		if ( delta < 0 ) {

			delta = Math.abs( delta );
			multiplier = -1;

		}

		switch ( part ) {
			case "year":
			case "y":
				// CAUTION: Rough estimate.
				return( Math.floor( delta / MS_YEAR ) * multiplier );
			break;
			case "month":
			case "M":
				// CAUTION: Rough estimate.
				return( Math.floor( delta / MS_MONTH ) * multiplier );
			break;
			case "day":
			case "d":
				// CAUTION: Rough estimate.
				return( Math.floor( delta / MS_DAY ) * multiplier );
			break;
			case "hour":
			case "h":
				return( Math.floor( delta / MS_HOUR ) * multiplier );
			break;
			case "minute":
			case "m":
				return( Math.floor( delta / MS_MINUTE ) * multiplier );
			break;
			case "second":
			case "s":
				return( Math.floor( delta / MS_SECOND ) * multiplier );
			break;
			case "millisecond":
			case "S":
				return( delta * multiplier );
			break;
		}

	}


	// I proxy the native formatDate() function with a partial application of the
	// LOCALE_ID that is being used in the application.
	public format( value: DateInput, mask: string ) : string {

		return( ngFormatDate( value, mask, this.localID ) );

	}


	// I return a human-friendly, relative date-string for the given input. This is
	// intended to mimic the .fromNow() method in Moment.js:
	public fromNow( value: DateInput ) : string {

		var nowTick = this.getTickCount();
		var valueTick = this.getTickCount( value );
		var delta = ( nowTick - valueTick );
		var prefix = "";
		var infix = "";
		var suffix = " ago"; // Assume past-dates by default.

		// If we're dealing with a future date, we need to flip the delta so that our
		// buckets can be used in a consistent manner. We will compensate for this change
		// by using a different prefix/suffix.
		if ( delta < 0 ) {

			delta = Math.abs( delta );
			prefix = "in ";
			suffix = "";

		}

		// NOTE: We are using Math.ceil() in the following calculations so that we never
		// round-down to a "singular" number that may clash with a plural identifier (ex,
		// "days"). All singular numbers are handled by explicit delta-buckets.
		if ( delta <= FROM_NOW_JUST_NOW ) {

			infix = "a few seconds";

		} else if ( delta <= FROM_NOW_MINUTE ) {

			infix = "a minute";

		} else if ( delta <= FROM_NOW_MINUTES ) {

			infix = ( Math.ceil( delta / MS_MINUTE ) + " minutes" );

		} else if ( delta <= FROM_NOW_HOUR ) {

			infix = "an hour";

		} else if ( delta <= FROM_NOW_HOURS ) {

			infix = ( Math.ceil( delta / MS_HOUR ) + " hours" );

		} else if ( delta <= FROM_NOW_DAY ) {

			infix = "a day";

		} else if ( delta <= FROM_NOW_DAYS ) {

			infix = ( Math.ceil( delta / MS_DAY ) + " days" );

		} else if ( delta <= FROM_NOW_MONTH ) {

			infix = "a month";

		} else if ( delta <= FROM_NOW_MONTHS ) {

			infix = ( Math.ceil( delta / MS_MONTH ) + " months" );

		} else if ( delta <= FROM_NOW_YEAR ) {

			infix = "a year";

		} else {

			infix = ( Math.ceil( delta / MS_YEAR ) + " years" );

		}

		return( prefix + infix + suffix );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I return the milliseconds since epoch for the given value.
	private getTickCount( value: DateInput = Date.now() ) : number {

		// If the passed-in value is a number, we're going to assume it's already a
		// tick-count value (milliseconds since epoch).
		if ( typeof( value ) === "number" ) {

			return( value );

		}

		return( new Date( value ).getTime() );

	}

}

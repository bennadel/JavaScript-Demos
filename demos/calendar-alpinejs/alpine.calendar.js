document.addEventListener(
	"alpine:init",
	function setupAlpineBindings() {

		Alpine.data( "calendar", CalendarController );

	}
);

var CALENDAR_WEEKDAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var CALENDAR_WEEKDAYS_ABBREVIATED = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thr",
	"Fri",
	"Sat"
];
var CALENDAR_MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var CURRENT_MONTH = true;
var OTHER_MONTH = false;

/**
* I control the calendar component.
*/
function CalendarController( initialYear, initialMonth ) {

	var timestamp = new Date();
	var year = ( initialYear ?? timestamp.getFullYear() );
	var month = ( initialMonth ?? timestamp.getMonth() );
	var monthName = CALENDAR_MONTHS[ month ];
	// Entries contains the entries for this month only.
	var entries = buildEntries( year, month );
	// Grid contains the headers and the entries for the rendered month (which may extend
	// into both the previous month and the next month in order to create a full grid).
	var grid = buildGrid( entries );

	return {
		// Properties.
		year: year,
		month: month,
		monthName: monthName,
		entries: entries,
		grid: grid,

		// Methods.
		gotoDate: gotoDate,
		gotoNextMonth: gotoNextMonth,
		gotoNow: gotoNow,
		gotoPrevMonth: gotoPrevMonth,
		gotoYear: gotoYear,
	}

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I update the calendar to represent the month that contains the given date.
	*/
	function gotoDate( target ) {

		this.year = target.getFullYear();
		this.month = target.getMonth();
		this.monthName = CALENDAR_MONTHS[ this.month ];
		this.entries = buildEntries( this.year, this.month );
		this.grid = buildGrid( this.entries );

	}

	/**
	* I update the calendar to represent the next month.
	*/
	function gotoNextMonth() {

		this.gotoDate( new Date( this.year, ( this.month + 1 ), 1 ) );

	}

	/**
	* I update the calendar to represent the current month.
	*/
	function gotoNow() {

		this.gotoDate( new Date() );

	}

	/**
	* I update the calendar to represent the previous month.
	*/
	function gotoPrevMonth() {

		this.gotoDate( new Date( this.year, ( this.month - 1 ), 1 ) );

	}

	/**
	* I update the calendar to represent the given year (and optional month).
	*/
	function gotoYear( year, month ) {

		this.gotoDate( new Date( year, ( month || 0 ), 1 ) );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	/**
	* I build the entries for the given year/month.
	*/
	function buildEntries( year, month ) {

		var daysInMonth = getDaysInMonth( year, month );
		var entries = [];

		for ( var i = 1 ; i <= daysInMonth ; i++ ) {

			entries.push( buildEntry( year, month, i, CURRENT_MONTH ) );

		}

		return entries;

	}

	/**
	* I build the entry for the given year/month/date.
	*/
	function buildEntry( year, month, date, isCurrentMonth ) {

		var timestamp = new Date( year, month, date );

		return {
			id: timestamp.getTime(),
			year: timestamp.getFullYear(),
			month: timestamp.getMonth(),
			monthName: CALENDAR_MONTHS[ timestamp.getMonth() ],
			date: timestamp.getDate(),
			day: timestamp.getDay(),
			dayName: CALENDAR_WEEKDAYS[ timestamp.getDay() ],
			isToday: getIsToday( timestamp ),
			isCurrentMonth: isCurrentMonth,
			isOtherMonth: ! isCurrentMonth,
			isWeekday: getIsWeekday( timestamp.getDay() ),
			isWeekend: getIsWeekend( timestamp.getDay() )
		};

	}

	/**
	* I guild the grid based on the given entries.
	*/
	function buildGrid( entries ) {

		var grid = {
			headers: CALENDAR_WEEKDAYS.slice(),
			headersAbbreviated: CALENDAR_WEEKDAYS_ABBREVIATED.slice(),
			entries: entries.slice(),
			weeks: []
		};
		var temp;

		// Extend the grid entries into the PREVIOUS month if necessary.
		while ( ! getIsFirstEntryOfWeek( temp = grid.entries.at( 0 ) ) ) {

			grid.entries.unshift(
				buildEntry( temp.year, temp.month, ( temp.date - 1 ), OTHER_MONTH )
			);

		}

		// Extend the grid entries into the NEXT month if necessary.
		while ( ! getIsLastEntryOfWeek( temp = grid.entries.at( -1 ) ) ) {

			grid.entries.push(
				buildEntry( temp.year, temp.month, ( temp.date + 1 ), OTHER_MONTH )
			);

		}

		// Slice the full list of entries into weeks (for easier rendering).
		for ( var i = 0 ; i < grid.entries.length ; i += 7 ) {

			grid.weeks.push(
				grid.entries.slice( i, ( i + 7 ) )
			);

		}

		return grid;

	}

	/**
	* I get the number of days in the given year/month.
	*/
	function getDaysInMonth( year, month ) {

		// I freaking love the Date object - makes working with dates so easy!
		var lastDayOfMonth = new Date( year, ( month + 1 ) , 0 );

		return lastDayOfMonth.getDate();

	}

	/**
	* I determine if the given entry represents the first day of the week.
	*/
	function getIsFirstEntryOfWeek( entry ) {

		return ( entry.day === 0 );

	}

	/**
	* I determine if the given entry represents the last day of the week.
	*/
	function getIsLastEntryOfWeek( entry ) {

		return ( entry.day === 6 );

	}

	/**
	* I determine if the given date represents Today.
	*/
	function getIsToday( date ) {

		var timestamp = new Date();

		return (
			( date.getFullYear() === timestamp.getFullYear() ) &&
			( date.getMonth() === timestamp.getMonth() ) &&
			( date.getDate() === timestamp.getDate() )
		);

	}

	/**
	* I determine if the given day is a weekday.
	*/
	function getIsWeekday( day ) {

		return ! getIsWeekend( day );

	}

	/**
	* I determine if the given day is a weekend.
	*/
	function getIsWeekend( day ) {

		return ( ( day === 0 ) || ( day === 6 ) );

	}

}

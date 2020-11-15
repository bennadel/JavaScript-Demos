
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { DateHelper } from "./date-helper";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public baseDate: Date;
	public dayDelta: number;
	public formattedDate: string;
	public hourDelta: number;
	public millisecondDelta: number;
	public minuteDelta: number;
	public monthDelta: number;
	public secondDelta: number;
	public yearDelta: number;

	private dateHelper: DateHelper;
	private dateMask: string;

	// I initialize the app component.
	constructor( dateHelper: DateHelper ) {

		this.dateHelper = dateHelper;

		this.baseDate = new Date();
		this.dayDelta = 0;
		this.hourDelta = 0;
		this.millisecondDelta = 0;
		this.minuteDelta = 0;
		this.monthDelta = 0;
		this.secondDelta = 0;
		this.yearDelta = 0;

		this.dateMask = "yyyy-MM-dd HH:mm:ss.SSS";
		this.formattedDate = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called on every digest.
	// --
	// NOTE: Rather than have an explicit function that has to get called every time a
	// date-delta is adjusted, we're just going to hook into the digest since we know
	// that a new digest will be triggered on every (input) event.
	public ngDoCheck() : void {

		var result = this.baseDate;

		// The .add() function returns a NEW date each time, so we have to keep saving
		// and reusing the result of each call.
		result = this.dateHelper.add( "year", this.yearDelta, result );
		result = this.dateHelper.add( "month", this.monthDelta, result );
		result = this.dateHelper.add( "day", this.dayDelta, result );
		result = this.dateHelper.add( "hour", this.hourDelta, result );
		result = this.dateHelper.add( "minute", this.minuteDelta, result );
		result = this.dateHelper.add( "second", this.secondDelta, result );
		result = this.dateHelper.add( "millisecond", this.millisecondDelta, result );

		this.formattedDate = this.dateHelper.format( result, this.dateMask );

	}

}

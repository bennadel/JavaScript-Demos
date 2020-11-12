
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { DateHelper } from "./date-helper";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Demo {
	min: number;
	minLabel: string;
	max: number;
	maxLabel: string;
	value: number;
	fromNow: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public demos: Demo[];

	private dateHelper: DateHelper;

	// I initialize the app component.
	constructor( dateHelper: DateHelper ) {

		this.dateHelper = dateHelper;

		var now = Date.now();
		var yearsAgo = new Date( now - ( 1000 * 60 * 60 * 24 * 365 * 10 ) );
		var yearAgo = new Date( now - ( 1000 * 60 * 60 * 24 * 365 ) );
		var dayAgo = new Date( now - ( 1000 * 60 * 60 * 24 ) );
		var hourAgo = new Date( now - ( 1000 * 60 * 60 ) );

		// Since the Moment.js .fromNow() method is all about relative date-times, let's
		// create several demos with increasingly small time-spans. This way, we can more
		// easily see how the range-input affects the output.
		this.demos = [
			{
				min: yearsAgo.getTime(),
				minLabel: this.dateHelper.formatDate( yearsAgo, "yyyy-MM-dd" ),
				max: now,
				maxLabel: "Now",
				value: now,
				fromNow: this.dateHelper.fromNow( now )
			},
			{
				min: yearAgo.getTime(),
				minLabel: this.dateHelper.formatDate( yearAgo, "yyyy-MM-dd" ),
				max: now,
				maxLabel: "Now",
				value: now,
				fromNow: this.dateHelper.fromNow( now )
			},
			{
				min: dayAgo.getTime(),
				minLabel: this.dateHelper.formatDate( dayAgo, "yyyy-MM-dd" ),
				max: now,
				maxLabel: "Now",
				value: now,
				fromNow: this.dateHelper.fromNow( now )
			},
			{
				min: hourAgo.getTime(),
				minLabel: this.dateHelper.formatDate( hourAgo, "HH:mm:ss" ),
				max: now,
				maxLabel: "Now",
				value: now,
				fromNow: this.dateHelper.fromNow( now )
			}
		];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I update the given demo to use the given tick-count.
	public updateFromNow( demo: Demo, value: string ) : void {

		demo.value = +value;
		demo.fromNow = this.dateHelper.fromNow( demo.value );

	}

}

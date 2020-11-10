
// Import the core angular services.
import { Component } from "@angular/core";
import { formatDate } from "@angular/common";
import { Inject } from "@angular/core";
import { LOCALE_ID } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Example {
	mask: string;
	result: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="example">
			<div class="example__mask">
				LOCALE_ID
			</div>
			<div class="example__result">
				{{ localID }}
			</div>
		</div>

		<div *ngFor="let example of examples" class="example">
			<div class="example__mask">
				{{ example.mask }}
			</div>
			<div class="example__result">
				{{ example.result }}
			</div>
		</div>
	`
})
export class AppComponent {

	public examples: Example[];
	public localID: string;
	public now: Date;

	// I initialize the app component.
	// --
	// NOTE: Out of the box, Angular ships with the "en-US" local for formatting. If you
	// want to use other locales, you have to add the localize package.
	constructor( @Inject( LOCALE_ID ) localID: string ) {

		this.localID = localID;
		this.now = new Date();
		this.examples = [];

		var masks = [
			// Built-in mask aliases.
			"short",
			"medium",
			"long",
			"full",
			"shortDate",
			"mediumDate",
			"longDate",
			"fullDate",
			"shortTime",
			"mediumTime",
			"longTime",
			"fullTime",
			// Years.
			"yy",
			"yyyy",
			// Months.
			// --
			// NOTE: Month mask are UPPER CASE so as not to conflict with minutes.
			"M",
			"MM",
			"MMM",
			"MMMM",
			// Days.
			"d",
			"dd",
			// Weekdays.
			"E",
			"EEEE",
			// AM / PM.
			"aa",
			// Hours.
			"h",
			"hh",
			// 24-Hours version.
			"H",
			"HH",
			// Minutes.
			// --
			// NOTE: Minute mask are LOWER CASE so as not to conflict with months.
			"m",
			"mm",
			// Seconds.
			"s",
			"ss"
		];

		for ( var mask of masks ) {

			this.examples.push({
				mask: mask,
				result: formatDate( this.now, mask, this.localID )
			});

		}

	}

}

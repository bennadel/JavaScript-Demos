
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "progress-indicator",
	inputs: [
		"percent",
		"color",
		"backgroundColor"
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./progress-indicator.component.less" ],
	template:
	`
		<svg viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet">
			<circle
				*ngIf="backgroundColor"
				cx="10"
				cy="10"
				r="9"
				fill="none"
				[attr.stroke]="backgroundColor"
				stroke-width="2">
			</circle>

			<circle
				cx="10"
				cy="10"
				r="9"
				fill="none"
				[attr.stroke]="color"
				stroke-width="2"
				stroke-linecap="round"
				[attr.stroke-dasharray]="dashArray"
				transform="rotate( -90, 10, 10 )"
				[class.empty]="! percent">
			</circle>
		</svg>
	`
})
export class ProgressIndicatorComponent implements OnChanges {
	
	public backgroundColor: string;
	public color: string;
	public dashArray: string;
	public percent: number;

	// I initialize the progress-indicator component.
	constructor() {
		
		this.backgroundColor = "#CCD6DD";
		this.color = "currentColor"; // Will inherit the current color context.
		this.dashArray = "0,100";
		this.percent = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called every time the input bindings are updated.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// Validate and constrain the percentage.
		if ( isNaN( this.percent ) || ( this.percent < 0 ) ) {

			this.percent = 0;

		} else if ( this.percent > 100 ) {

			this.percent = 100;

		}

		// Normalize the background color.
		if ( this.backgroundColor === "none" ) {

			this.backgroundColor = "";

		}

		// The progress indicator is implemented as the first dash in a dashed-path stroke
		// of the circle SVG. In order to translate the percent-input into a dash length,
		// we have to determine the circumference of the circle. Then, the length of the
		// completed portion is simply the percentage translation of the circumference.
		var radius = 9;
		var totalLength = ( Math.PI * 2 * radius );
		var pathLength = ( totalLength * this.percent / 100 );

		this.dashArray = `${ pathLength },100`;

	}

}

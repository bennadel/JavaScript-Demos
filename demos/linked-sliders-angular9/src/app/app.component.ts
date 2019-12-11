
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Equalizer } from "./equalizer";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Good, Fast, Cheap ... Pick 2
		</p>

		<div class="dimension">
			<app-slider
				[value]="goodValue"
				(valueChange)="handleGoodValue( $event )"
				[min]="minValue"
				[max]="maxValue"
				class="control">
			</app-slider>
			<div class="reading">
				<strong>Good</strong>: {{ goodValue }}
			</div>
		</div>

		<div class="dimension">
			<app-slider
				[value]="fastValue"
				(valueChange)="handleFastValue( $event )"
				[min]="minValue"
				[max]="maxValue"
				class="control">
			</app-slider>
			<div class="reading">
				<strong>Fast</strong>: {{ fastValue }}
			</div>
		</div>

		<div class="dimension">
			<app-slider
				[value]="cheapValue"
				(valueChange)="handleCheapValue( $event )"
				[min]="minValue"
				[max]="maxValue"
				class="control">
			</app-slider>
			<div class="reading">
				<strong>Cheap</strong>: {{ cheapValue }}
			</div>
		</div>
	`
})
export class AppComponent {

	public cheapValue: number;
	public fastValue: number;
	public goodValue: number;
	public minValue: number;
	public maxValue: number;

	private equalizer: Equalizer;

	// I initialize the app component.
	constructor() {

		this.cheapValue = 5;
		this.fastValue = 17;
		this.goodValue = 78;
		this.minValue = 0;
		this.maxValue = 100;

		// Linking multiple values together within a constraint is actually quite
		// challening. As such, we're going to off-load this responsibility to an
		// equalizer that is built to maintain a distributed sum.
		this.equalizer = new Equalizer(
			this.minValue,
			this.maxValue,
			[ this.goodValue, this.fastValue, this.cheapValue ]
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the change-request to the "cheap" value.
	public handleCheapValue( newValue: number ) : void {

		var results = this.equalizer.setValue( 2, newValue );
		this.goodValue = results[ 0 ];
		this.fastValue = results[ 1 ];
		this.cheapValue = results[ 2 ];

	}


	// I handle the change-request to the "fast" value.
	public handleFastValue( newValue: number ) : void {

		var results = this.equalizer.setValue( 1, newValue );
		this.goodValue = results[ 0 ];
		this.fastValue = results[ 1 ];
		this.cheapValue = results[ 2 ];
		
	}


	// I handle the change-request to the "good" value.
	public handleGoodValue( newValue: number ) : void {

		var results = this.equalizer.setValue( 0, newValue );
		this.goodValue = results[ 0 ];
		this.fastValue = results[ 1 ];
		this.cheapValue = results[ 2 ];

	}

}

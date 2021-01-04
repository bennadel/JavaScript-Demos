
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "snow-flake",
	inputs: [ "depth", "speed" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./snow-flake.component.less" ],
	template:
	`
		<div
			[style.animation-duration.s]="verticalDuration"
			[style.animation-delay.s]="verticalDelay"
			class="vertical-track">

			<div
				[style.animation-duration.s]="horizontalDuration"
				[style.animation-delay.s]="horizontalDelay"
				class="horizontal-track">

				<span
					[style.opacity]="flakeOpacity"
					[style.width.px]="flakeSize"
					[style.height.px]="flakeSize"
					class="flake">
				</span>

			</div>

		</div>
	`
})
export class SnowFlakeComponent {

	public depth: number;
	public speed: number;

	public flakeOpacity: number;
	public flakeSize: number;
	public horizontalDuration: number;
	public horizontalDelay: number;
	public verticalDelay: number;
	public verticalDuration: number;

	// I initialize the snow-flake component.
	constructor() {

		this.depth = 1;
		this.speed = 1;

		this.flakeOpacity = 1;
		this.flakeSize = 1;
		this.verticalDuration = 5;
		this.verticalDelay = 0;
		this.horizontalDuration = 3;
		this.horizontalDelay = 0;

	}

	// ---
	// PUBLIC MEHTODS.
	// ---

	// I get called whenever the input bindings change.
	public ngOnChanges() : void {

		switch ( this.speed ) {
			case 1:
				this.verticalDuration = 5;
				this.horizontalDuration = 3;
			break;
			case 2:
				this.verticalDuration = 6;
				this.horizontalDuration = 3;
			break;
			case 3:
				this.verticalDuration = 8;
				this.horizontalDuration = 3.5;
			break;
			case 4:
				this.verticalDuration = 10;
				this.horizontalDuration = 4;
			break;
			case 5:
				this.verticalDuration = 15;
				this.horizontalDuration = 5;
			break;
		}

		// Choose a random offset for the animation so that we fill the screen with snow
		// flakes rather than having them all start together at the top.
		this.verticalDelay = ( Math.random() * -this.verticalDuration );
		this.horizontalDelay = ( Math.random() * -this.horizontalDuration );

		switch ( this.depth ) {
			case 1:
				this.flakeSize = 1;
				this.flakeOpacity = 1;
			break;
			case 2:
				this.flakeSize = 2;
				this.flakeOpacity = 1;
			break;
			case 3:
				this.flakeSize = 3;
				this.flakeOpacity = 0.9;
			break;
			case 4:
				this.flakeSize = 5;
				this.flakeOpacity = 0.5;
			break;
			case 5:
				this.flakeSize = 10;
				this.flakeOpacity = 0.2;
			break;
		}

	}

}

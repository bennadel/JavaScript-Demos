
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-overlay",
	inputs: [
		"height",
		"left",
		"top",
		"width"
	],
	styleUrls: [ "./overlay.component.less" ],
	template:
	`
		<div
			class="target"
			[style.opacity]="1"
			[style.top.px]="fixedTop"
			[style.right.px]="fixedRight"
			[style.bottom.px]="fixedBottom"
			[style.left.px]="fixedLeft">
		</div>

		<div
			class="vertical-offset"
			[style.opacity]="( ( fixedTop > 30 ) ? 1 : 0 )"
			[style.top.px]="0"
			[style.right.px]="fixedRight"
			[style.left.px]="fixedLeft"
			[style.height.px]="fixedTop">
			<span class="size">
				{{ fixedTop }}
			</span>
		</div>

		<div
			class="vertical-offset"
			[style.opacity]="( ( fixedBottom > 30 ) ? 1 : 0 )"
			[style.right.px]="fixedRight"
			[style.bottom.px]="0"
			[style.left.px]="fixedLeft"
			[style.height.px]="fixedBottom">
			<span class="size">
				{{ fixedBottom }}
			</span>
		</div>
		
		<div
			class="horizontal-offset"
			[style.opacity]="( ( fixedRight > 50 ) ? 1 : 0 )"
			[style.top.px]="top"
			[style.right.px]="0"
			[style.bottom.px]="fixedBottom"
			[style.width.px]="fixedRight">
			<span class="size">
				{{ fixedRight }}
			</span>
		</div>

		<div
			class="horizontal-offset"
			[style.opacity]="( ( fixedLeft > 50 ) ? 1 : 0 )"
			[style.top.px]="fixedTop"
			[style.bottom.px]="fixedBottom"
			[style.left.px]="0"
			[style.width.px]="fixedLeft">
			<span class="size">
				{{ fixedLeft }}
			</span>
		</div>
	`
})
export class OverlayComponent {

	public height!: number;
	public left!: number;
	public top!: number;
	public width!: number;

	public fixedBottom: number;
	public fixedLeft: number;
	public fixedRight: number;
	public fixedTop: number;

	// I initialize the overlay component.
	constructor() {

		this.fixedBottom = 0;
		this.fixedLeft = 0;
		this.fixedRight = 0;
		this.fixedTop = 0;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called whenever the input bindings change.
	public ngOnChanges() : void {

		// Translate the input bindings to "fixed" coordinates.
		// --
		// NOTE: The Top/Left inputs are already intended to be "fixed", but we need to
		// calculate the Right/Bottom based on the dimensions of the window.
		this.fixedTop = Math.floor( this.top );
		this.fixedLeft = Math.floor( this.left );
		this.fixedRight = Math.floor( document.documentElement.clientWidth - ( this.left + this.width ) );
		this.fixedBottom = Math.floor( document.documentElement.clientHeight - ( this.top + this.height ) );

	}

}

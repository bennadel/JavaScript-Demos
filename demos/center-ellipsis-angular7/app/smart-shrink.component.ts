
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-smart-shrink",
	inputs: [ "text" ],
	host: {
		"[title]": "fullText"
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./smart-shrink.component.less" ],
	template:
	`
		<span class="left" [innerText]="leftText"></span>
		<span class="right" [innerText]="rightText"></span>
	`
})
export class SmartShrinkComponent {

	public fullText: string;
	public leftText: string;
	public rightText: string;
	
	// I initialize the smart-shrink component.
	constructor() {

		this.leftText = "";
		this.rightText = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the setting of the "text" input binding.
	set text( value: string ) {

		// We're going to split the string towards the end. This is just a judgment call.
		// Since we can't dynamically change the split as the container changes size (at
		// least, not with a lot more work), we have to pick a location that scales the
		// ellipsis well.
		var splitIndex = Math.round( value.length * 0.75 );

		this.fullText = value;
		this.leftText = value.slice( 0, splitIndex );
		this.rightText = value.slice( splitIndex );

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-loader",
	inputs: [ "delay" ],
	host: {
		"[style.animation-delay.ms]": "delay"
	},
	styleUrls: [ "./loader.component.less" ],
	template:
	`
		<div class="indicator">
			Loading....
		</div>
	`
})
export class LoaderComponent {

	public delay: number = 0;

}

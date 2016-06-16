
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "chip",
	inputs: [ "x: chipX", "y: chipY" ],
	template:
	`
		<div class="label">
			I am Chip
		</div>
		<div class="coordinates">
			{{ x }} , {{ y }}
		</div>
	`
})
export class ChipComponent {

	// I hold the inputs for the view.
	public x: number;
	public y: number;

}
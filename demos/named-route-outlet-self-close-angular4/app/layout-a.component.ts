
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "layout-a",
	styleUrls: [ "./layout-a.component.css" ],
	template: 
	`
		<h3>
			Layout A
		</h3>

		<p>
			Hello from layout-a. Woot!
		</p>
	`
})
export class LayoutAComponent {
	// ...
}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	// For this routable component, we're going to include a SELECTOR even though it 
	// isn't strictly necessary (so that we can see how the view output is affected).
	selector: "b-view",
	styleUrls: [ "./b-view.component.css" ],
	template: 
	`
		<h3>
			B-View Component
		</h3>

		<p>
			This is the b-view component, sweet!
		</p>
	`
})
export class BViewComponent {
	// ...
}

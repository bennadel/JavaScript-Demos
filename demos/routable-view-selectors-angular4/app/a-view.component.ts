
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	// NOTE: Since routable views aren't embedded in template logic, we don't need to
	// provide a SELECTOR - Angular will inject this component automatically as part
	// of the router-outlet logic (using the "ng-component" tag).
	styleUrls: [ "./a-view.component.css" ],
	template: 
	`
		<h3>
			A-View Component
		</h3>

		<p>
			This is the a-view component, noice!
		</p>
	`
})
export class AViewComponent {
	// ...
}

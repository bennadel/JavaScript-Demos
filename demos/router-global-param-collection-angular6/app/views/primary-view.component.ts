
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "primary-view",
	styleUrls: [ "./primary-view.component.less" ],
	template:
	`
		<router-outlet></router-outlet>
	`
})
export class PrimaryViewComponent {
	// ...
}

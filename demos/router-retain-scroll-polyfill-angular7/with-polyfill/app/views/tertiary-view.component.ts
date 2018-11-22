
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tertiary-view",
	styleUrls: [ "./tertiary-view.component.less" ],
	template:
	`
		<router-outlet></router-outlet>
	`
})
export class TertiaryViewComponent {
	// ...
}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "secondary-view",
	styleUrls: [ "./secondary-view.component.less" ],
	template:
	`
		<router-outlet></router-outlet>
	`
})
export class SecondaryViewComponent {
	
}

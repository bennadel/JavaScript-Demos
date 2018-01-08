
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "a-view",
	styleUrls: [ "./a-view.component.less" ],
	template:
	`
		<p>
			<strong>A View</strong>
		</p>

		<p>
			<a routerLink="./sub">Sub-Link</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AViewComponent {
	// ...
}

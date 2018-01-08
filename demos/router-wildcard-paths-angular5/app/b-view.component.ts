
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "b-view",
	styleUrls: [ "./b-view.component.less" ],
	template:
	`
		<p>
			<strong>B View</strong>
		</p>

		<p>
			<a routerLink="./sub">Sub-Link</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class BViewComponent {
	// ...
}

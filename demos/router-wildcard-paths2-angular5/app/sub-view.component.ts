
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sub-view",
	styleUrls: [ "./sub-view.component.less" ],
	template:
	`
		<p>
			Sub-View
		</p>

		<p>
			<a routerLink="./bad-path">Bad Path (not found)</a>
		</p>
	`
})
export class SubViewComponent {
	// ...
}

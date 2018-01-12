
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "b-view",
	styleUrls: [ "./b-view.component.less" ],
	template:
	`
		<hr id="top" />

		<p>
			<strong>B View</strong>
		</p>

		<p class="content">
			<a routerLink="." fragment="bottom">Jump to bottom</a>
		</p>

		<p id="bottom">
			This is the bottom of <strong>B-view</strong>.
			<a routerLink="." fragment="top">Back to top</a>.
		</p>
	`
})
export class BViewComponent {
	// ...
}

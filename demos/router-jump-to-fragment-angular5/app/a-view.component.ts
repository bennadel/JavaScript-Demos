
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "a-view",
	styleUrls: [ "./a-view.component.less" ],
	template:
	`
		<hr id="top" />

		<p>
			<strong>A View</strong>
		</p>

		<p class="content">
			<a routerLink="." fragment="bottom">Jump to bottom</a>
		</p>

		<a name="bottom"></a>

		<p>
			This is the bottom of <strong>A-view</strong>.
			<a routerLink="." fragment="top">Back to top</a>.
		</p>
	`
})
export class AViewComponent {
	// ...
}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tertiary-list-view",
	styleUrls: [ "./tertiary-list-view.component.less" ],
	template:
	`
		<h2>
			Tertiary List
		</h2>

		<p>
			<a [routerLink]="[ '/app', { outlets: { tertiary: null } } ]">Close</a>
		</p>

		<p>
			<a routerLink="./detail/301">Item 301</a>
		</p>
		<p>
			<a routerLink="./detail/302">Item 302</a>
		</p>
		<p>
			<a routerLink="./detail/303">Item 303</a>
		</p>
	`
})
export class TertiaryListViewComponent {
	// ...
}

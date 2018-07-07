
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "secondary-list-view",
	styleUrls: [ "./secondary-list-view.component.less" ],
	template:
	`
		<h2>
			Secondary List
		</h2>

		<p>
			<a [routerLink]="[ '/app', { outlets: { secondary: null } } ]">Close</a>
		</p>

		<p>
			<a routerLink="./detail/201">Item 201</a>
		</p>
		<p>
			<a routerLink="./detail/202">Item 202</a>
		</p>
		<p>
			<a routerLink="./detail/203">Item 203</a>
		</p>
	`
})
export class SecondaryListViewComponent {
	// ...
}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "primary-list-view",
	styleUrls: [ "./primary-list-view.component.less" ],
	template:
	`
		<h2>
			Primary List
		</h2>

		<p>
			<a [routerLink]="[ '/app', { outlets: { primary: null } } ]">Close</a>
		</p>

		<p>
			<a routerLink="./detail/101">Item 101</a>
		</p>
		<p>
			<a routerLink="./detail/102">Item 102</a>
		</p>
		<p>
			<a routerLink="./detail/103">Item 103</a>
		</p>
	`
})
export class PrimaryListViewComponent {
	// ...
}

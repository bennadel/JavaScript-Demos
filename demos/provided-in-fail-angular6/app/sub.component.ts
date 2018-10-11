
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "sub-a",
	template:
	`
		<h2>
			Sub Module
		</h2>

		<p>
			<a routerLink="./a">Sub-A</a> &mdash;
			<a routerLink="./b">Sub-B</a> &mdash;
			<a routerLink="./c">Sub-C</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class SubComponent {
	// ...
}

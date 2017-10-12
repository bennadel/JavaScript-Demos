
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<p>
			<a routerLink="./layout-a">Layout A</a> &mdash;
			<a routerLink="./layout-b">Layout B</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}

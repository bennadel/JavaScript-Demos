
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			I am the App component.
		</p>

		<p>
			<a routerLink="./lazy">Load Lazy Route</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ....
}

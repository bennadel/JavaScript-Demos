
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a routerLink="/app/modal/one">Open Modal One</a> &mdash;
			<a routerLink="/app/modal/two">Open Modal Two</a>
		</p>

		<p>
			This is some sweet content here!
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}

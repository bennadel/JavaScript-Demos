
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
			<a routerLink="/">Home</a> &nbsp;|&nbsp;
			<a routerLink="/a">A View</a> &nbsp;|&nbsp;
			<a routerLink="/b">B View</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}

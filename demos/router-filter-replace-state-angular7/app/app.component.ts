
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
			<a routerLink="/">Home</a>
			&mdash;
			<a routerLink="./people">People</a>
		</p>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	
	// I initialize the app view component.
	constructor() {

		document.title = "Home";

	}

}

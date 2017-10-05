
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}

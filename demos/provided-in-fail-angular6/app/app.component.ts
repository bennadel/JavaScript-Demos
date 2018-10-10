
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		Trying to do things.

		<sub-a></sub-a>
		<sub-b></sub-b>
	`
})
export class AppComponent {
	// ...
}

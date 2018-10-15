
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<thing-a></thing-a>
		<thing-b></thing-b>
		<thing-c></thing-c>

		<thing-a></thing-a>
		<thing-b></thing-b>
		<thing-c></thing-c>
	`
})
export class AppComponent {
	// ...
}

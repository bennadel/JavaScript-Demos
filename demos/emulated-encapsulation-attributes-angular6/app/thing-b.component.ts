
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "thing-b",
	styleUrls: [ "./thing-b.component.less" ],
	template:
	`
		<strong>Thing B</strong>
		<thing-c style="margin-left: 20px ;"></thing-c>
	`
})
export class ThingBComponent {
	// ...
}

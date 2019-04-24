
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-thing-b",
	inputs: [ "value" ],
	styleUrls: [ "./thing-b.component.less" ],
	template:
	`
		Thing B ( {{ value }} )
	`
})
export class ThingBComponent {

	public value!: string;

}

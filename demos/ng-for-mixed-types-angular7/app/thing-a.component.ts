
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-thing-a",
	inputs: [ "value" ],
	styleUrls: [ "./thing-a.component.less" ],
	template:
	`
		Thing A ( {{ value }} )
	`
})
export class ThingAComponent {

	public value!: string;

}

// Declare ambient module definition so TypeScript doesn't complain.
// --
// TODO: Figure out how to move this to typing files.
declare var module: { id: string };

// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-child",
	styleUrls: [ "./my-child.component.css" ],
	template:
	`
		<h3>
			What a Wonderful Day!
		</h3>

		<p>
			Good morning my friend.
		</p>
	`
})
export class MyChildComponent {

	// I initialize the component.
	constructor() {
		
		// ...

	}

}

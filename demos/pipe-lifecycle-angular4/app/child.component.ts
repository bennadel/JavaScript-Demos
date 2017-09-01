
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-child",
	inputs: [ "message" ],
	styleUrls: [ "./child.component.css" ],
	template: 
	`
		<p>
			Pure: {{ message | length }}<br />
			Impure: {{ message | lengthImpure }}
		</p>
	`
})
export class ChildComponent {

	public message: string;

}


// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<my-widget [value]="value"></my-widget>

		<p>
			<a (click)="toggleValue()">Toggle input [value]</a>.
		</p>
	`
})
export class AppComponent {
	
	public value: string;
	

	// I initialize the app component.
	constructor() {

		this.value = "Hello";

	}


	// ---
	// PUBLIC METODS.
	// ---


	// I toggle the value back and forth between two values.
	public toggleValue() : void {

		this.value = ( this.value === "Hello" )
			? "Good-bye"
			: "Hello"
		;

	}

}

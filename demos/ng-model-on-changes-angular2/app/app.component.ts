
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application services.

@Component({
	selector: "my-app",
	template:
	`
		<my-mood [(value)]="mood"></my-mood>

		<br /><br />

		<my-mood [(ngModel)]="mood"></my-mood>
	`
})
export class AppComponent {

	public mood: number;


	// I initialize the component.
	constructor() {

		this.mood = 0;

	}

}

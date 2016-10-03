
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",

	// In the following template, notice that we have TWO my-mood components; one is 
	// powered by a simple property binding while the other is powered by ngModel.
	// --
	// NOTE: In both cases, we are using two-way data binding to allow the emitted
	// value-change events to be piped right back into the value binding.
	template:
	`
		<my-mood [(value)]="mood"></my-mood>
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


// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { MyCounterComponent } from "./counter.component";
import { TestChangeDetectorDirective } from "./test-change-detector.directive";

@Component({
	selector: "my-app",
	directives: [ MyCounterComponent, TestChangeDetectorDirective ],
	template:
	`
		<p>
			<a (click)="incrementCounter()">Increment counter</a>
		</p>

		<my-counter [count]="counter" testChangeDetector></my-counter>
	`
})
export class AppComponent {

	// I hold the counter which is being passed into the Counter component(s).
	public counter: number;


	// I initialize the component.
	constructor() {

		this.counter = 0;
	
	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I increment the counter by one.
	public incrementCounter() : void {

		this.counter++;

	}

}
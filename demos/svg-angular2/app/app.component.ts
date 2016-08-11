
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { MoodRatingComponent } from "./mood-rating.component";

@Component({
	selector: "my-app",
	directives: [ MoodRatingComponent ], 
	template:
	`
		<h3>
			How are you feeling today?
		</h3>

		<p>
			[size]="30"
		</p>

		<mood-rating [(value)]="rating" [size]="30" style="color: #FFC125 ;"></mood-rating>

		<p>
			[size]="75"
		</p>

		<mood-rating [(value)]="rating" [size]="75" style="color: #1C86EE ;"></mood-rating>
		
		<p>
			[size]="150"
		</p>

		<mood-rating [(value)]="rating" [size]="150" style="color: #FF0099 ;"></mood-rating>
	`
})
export class AppComponent {

	// I hold the current rating.
	// --
	// CAUTION: This value is being used to drive all three mood-rating widget instances.
	public rating: number;


	// I initialize the component.
	constructor() {

		this.rating = 0;

	}

}

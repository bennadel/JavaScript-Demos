
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

// Import these modules to create side-effects.
import "rxjs/add/observable/of";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<p>
			Best <strong>Holly Hunter</strong> movies:
		</p>

		<ul>
			<li *ngFor="let movie of movies | async">
				{{ movie }}
			</li>
		</ul>

		<p>
			<em>This demo was built with the TSC compiler, v2.2.1.</em>
		</p>
	`
})
export class AppComponent {

	public movies: Observable<string[]>;


	// I initialize the app component.
	constructor() {

		this.movies = Observable.of([
			"O Brother, Where Art Thou?",
			"Home for the Holidays",
			"The Firm",
			"Broadcast News",
			"Raising Arizona"
		]);

	}

}

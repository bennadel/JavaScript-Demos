
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

// Import these modules to create side-effects.
import "rxjs/add/observable/of";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	public movies: Observable<string[]>;


	// I initialize the app component.
	constructor() {

		this.movies = Observable.of([
			"Elysium",
			"Inside Man",
			"Contact",
			"Maverick",
			"Little Man Tate",
			"The Silence of the Lambs"
		]);

	}

}

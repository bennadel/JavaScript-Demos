
// Import the core angular services.
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";

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

		// NOTE: Neither the use of an RxJS stream nor the use of Lodash makes any real 
		// sense in this scenario; I'm only using these libraries in order to ensure that
		// the imports work and result in the proper Vendor bundles.
		this.movies = Observable.of(
			_.map(
				[
					"Conversations with Other Women",
					"Planet of the Apes",
					"Fight Club",
					"The Theory of Flight"
				],
				( movie: string ) : string => {

					return( movie + "." );

				}
			)
		);

	}

}

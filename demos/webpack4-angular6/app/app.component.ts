
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Hello world, <strong>Angular 6</strong> with <strong>Webpack 4</strong>.
		</p>

		<p>
			I'm not sure how well this works. But, it seems to compile!
		</p>

		<my-widget></my-widget>
	`
})
export class AppComponent {

	// I initialize the app component.
	constructor() {
		// ...
	}

}

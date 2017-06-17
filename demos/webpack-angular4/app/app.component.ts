
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<p>
			{{ message }}
		</p>
	`
})
export class AppComponent {

	public message: string;


	// I initialize the app component.
	constructor() {

		this.message = "Hello world!";

	}
}

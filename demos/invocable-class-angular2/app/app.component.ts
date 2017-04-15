
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { zEmbed } from "./zembed.service";

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template: 
	`
		<p>
			<em>Experimenting with Namespace declaration merging.</em>
		</p>
	`
})
export class AppComponent {

	// I initialize the app component.
	constructor() {

		// Try consuming the zEmbed() object as an invocable Function.
		zEmbed(
			() => {
				// ...
			}
		);

		// Try consuming the zEmbed object as an API surface area.
		zEmbed.show();
		zEmbed.hide();

	}

}

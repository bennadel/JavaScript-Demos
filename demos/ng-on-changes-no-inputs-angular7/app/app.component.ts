
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<!-- Providing input binding. -->
		<my-widget [value]=" 'meep meep' "></my-widget>

		<!-- OMITTING input binding. -->
		<my-widget></my-widget>
	`
})
export class AppComponent {
	// ...
}


// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "widget-one",
	styleUrls: [ 
		"./widget-shared.less", // <--- This is the SHARED LESS file.
		"./widget-one.component.less"
	],
	template:
	`
		Hello, I am <strong>Widget One</strong>. Some of my styles are shared.
	`
})
export class WidgetOneComponent {
	// ...
}

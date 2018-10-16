
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "widget-two",
	styleUrls: [ 
		"./widget-shared.less", // <--- This is the SHARED LESS file.
		"./widget-two.component.less"
	],
	template:
	`
		Hello, I am <strong>Widget Two</strong>. Some of my styles are shared.
	`
})
export class WidgetTwoComponent {
	// ...
}

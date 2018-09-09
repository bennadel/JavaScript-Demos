
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-widget",
	styleUrls: [ "./widget.component.less" ],
	template:
	`
		I am a widget component.
	`
})
export class WidgetComponent {

	// I initialize the widget component.
	constructor() {
		// ...
	}

}

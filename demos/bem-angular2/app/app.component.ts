
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<bn-widget></bn-widget>
		<bn-widget></bn-widget>
		<bn-widget-bem></bn-widget-bem>
	`
})
export class AppComponent {
	// ...
}

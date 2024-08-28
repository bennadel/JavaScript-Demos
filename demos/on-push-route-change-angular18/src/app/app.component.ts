
// Import vendor modules.
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { RouterOutlet } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterLink,
		RouterLinkActive,
		RouterOutlet
	],
	styleUrl: "./app.component.less",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	// ....
}

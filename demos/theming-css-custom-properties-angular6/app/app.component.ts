
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	// Theme selection is going to be driven by a CSS Class on the App Component. The
	// CSS Class will define CSS Custom Properties that will then cascade down through
	// the DOM tree / component tree, making themselves available for consumption by all
	// descendant components (even those with actual Shadow DOM boundaries).
	host: {
		"[class.light-theme]": "( theme === 'light' )",
		"[class.dark-theme]": "( theme === 'dark' )"
	},
	styleUrls: [ "./app.component.less" ],
	preserveWhitespaces: true, // Needed for white-space around links.
	template:
	`
		<div class="layout">
			<div class="layout__header">
				<app-header></app-header>
			</div>
			<div class="layout__canvas">
				<app-canvas></app-canvas>
			</div>
			<div class="layout__tools">
				<div class="layout__left-panel">
					<app-lpanel></app-lpanel>
				</div>
				<div class="layout__right-panel">
					<app-rpanel></app-rpanel>
				</div>
			</div>
			<div class="layout__footer">
				<strong>Themes:</strong>
				<a (click)="( theme = 'light' )">Light Theme</a> or
				<a (click)="( theme = 'dark' )">Dark Theme</a>
			</div>
		</div>
	`
})
export class AppComponent {

	public theme: string;

	// I initialize the app component.
	constructor() {

		this.theme = "light";

	}

}

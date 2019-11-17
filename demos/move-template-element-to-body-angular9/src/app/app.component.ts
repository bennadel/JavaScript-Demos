
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			<a (click)="toggle()">Toggle Stopwatch</a>
		</p>

		<app-stopwatch
			*ngIf="isShowingStopwatch">
		</app-stopwatch>
	`
})
export class AppComponent {

	public isShowingStopwatch: boolean;

	// I initialize the app component.
	constructor() {

		this.isShowingStopwatch = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the rendering of the Stopwatch component.
	public toggle() : void {

		this.isShowingStopwatch = ! this.isShowingStopwatch;

	}

}

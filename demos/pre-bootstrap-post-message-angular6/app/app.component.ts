
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AppReadyEvent } from "./app-ready-event";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		The app has loaded! Woot :D
	`
})
export class AppComponent {

	private appReadyEvent: AppReadyEvent;

	// I initialize the app-component.
	constructor( appReadyEvent: AppReadyEvent ) {

		this.appReadyEvent = appReadyEvent;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		// FOR THE SAKE OF THE DEMO, let's add a small delay here so that the app can be
		// in a "loading" state for a "visible" amount of time.
		setTimeout(
			() => {

				this.appReadyEvent.trigger();
				
			},
			1000
		);

	}

}

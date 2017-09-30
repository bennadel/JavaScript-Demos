
// Import the core angular services.
import { Component } from "@angular/core";
import { DoCheck } from "@angular/core";

// Import these modules for their side-effects.

// Import the application components and services.
import { ConsoleViewComponent } from "../console-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Screen {
	id: number;
	name: string;
	filename: string;
}

@Component({
	selector: "inspect-view",
	styleUrls: [ "./inspect-view.component.less" ],
	templateUrl: "./inspect-view.component.htm"
})
export class InspectViewComponent implements DoCheck {

	public screen: Screen;

	private consoleViewComponent: ConsoleViewComponent;

	// I initialize the inspect-view component.
	constructor( consoleViewComponent: ConsoleViewComponent ) {

		this.consoleViewComponent = consoleViewComponent;

		this.screen = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called whenever Angular runs a dirty-check.
	public ngDoCheck() : void {

		// CAUTION: In a more robust app, there may be some sort of Observable that the
		// Console component exposes (or some other accessible Store object) that I could
		// watch for state changes; however, for the time-being, I'm just going to use 
		// the DoCheck interface to watch for changes.
		if ( this.screen !== this.consoleViewComponent.screen ) {

			this.screen = this.consoleViewComponent.screen

		}

	}

}

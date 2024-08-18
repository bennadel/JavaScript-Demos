
// Import vendor modules.
import { Component } from "@angular/core";

// Import app modules.
import { DemoComponent } from "./demo.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		DemoComponent
	],
	styleUrl: "./app.component.less",
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public isShowingDemo: boolean = false;

	// ---
	// PUBLIC METHODS.
	// ---

	/**
	* I toggle the rendering of the demo component.
	*/
	public toggle() {

		window.scrollTo( 0, 0 );
		this.isShowingDemo = ! this.isShowingDemo;

	}

}

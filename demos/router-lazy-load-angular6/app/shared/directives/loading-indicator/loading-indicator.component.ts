
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-loading-indicator",
	inputs: [ "theme" ],
	templateUrl: "./loading-indicator.component.htm",
	styleUrls: [ "./loading-indicator.component.less" ]
})
export class LoadingIndicatorComponent {

	public height: number;
	public theme: string;

	// I initialize the loading-indicator component.
	public constructor() {

		this.theme = "light";

	}

}

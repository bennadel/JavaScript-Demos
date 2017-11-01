
// Import the core angular services.
import { Component } from "@angular/core";
import { DoCheck } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	host: {
		"(directclick)": "handleDirectClick( $event )"
	},
	styleUrls: [ "./app.component.less" ],
	template:
	`
		This text is contained directly within the root component.
		<p>
			This text is contained within a <code>P</code> tag.
		</p>
		This text is contained directly within the root component.
	`
})
export class AppComponent implements DoCheck {
	
	// I get called as part of the change-detection algorithm.
	public ngDoCheck() : void {

		console.warn( "Change-detection algorithm at", Date.now() );

	}


	// I handle the direct-clicks to the current component.
	public handleDirectClick( event: Event ) : void {

		console.log( "Direct click." );

	}

}

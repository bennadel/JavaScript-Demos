
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.htm"
})
export class AppComponent {

	// I log the click event for the anchors and buttons.
	public logClick( value: string ) : void {

		console.group( "Clicked Element" );
		console.log( value );
		console.groupEnd();

	}

}

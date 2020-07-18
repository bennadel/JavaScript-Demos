
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public channels: string[];

	// I initialize the app component.
	constructor() {

		this.channels = this.buildChannels( 200 );		

	}


	// I log the do-check event so we can see if our virtual scrollbar triggered change-
	// detection in the Angular view-model (it should not).
	public ngDoCheck() : void {

		console.log( "Do-check event triggered." );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I construct a channels array with the given number of items.
	private buildChannels( channelCount: number ) : string[] {

		var channels: string[] = [];

		for ( var i = 0 ; i < channelCount ; i++ ) {

			channels.push( `Generated Channel At Index ${ i + 1 }` );

		}

		return( channels );

	}

}

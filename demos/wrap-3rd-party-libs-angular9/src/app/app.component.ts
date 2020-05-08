
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ThirdPartyTracker } from "./third-party-tracker";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Welcome to my sweet Angular app!
		</p>

		<p>
			<a (click)="doThis()">Do This</a> ,
			<a (click)="doThat()">Do That</a>
		</p>
	`
})
export class AppComponent {

	private tracker: ThirdPartyTracker;

	// I initialize the app component.
	constructor( tracker: ThirdPartyTracker ) {

		this.tracker = tracker;

		this.tracker.identify({
			id: 4,
			name: "Ben Nadel",
			fields: {
				role: "Admin",
				company: "Oh Chickens Entertainment!"
			}
		});

	}

	// ---
	// PUBLIC METHODS.
	// ---

	public doThat() : void {

		// The user would be doing something .....
		this.tracker.track( "App.Main", { Action: "DoThat" } );

	}

	public doThis() : void {

		// The user would be doing something .....
		this.tracker.track( "App.Main", { Action: "DoThis" } );

	}

}

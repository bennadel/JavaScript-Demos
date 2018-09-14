
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AppReadyEvent } from "~/app/shared/services/app-ready-event";
import { sampleData } from "~/app/shared/services/sample-data";
import { Session } from "~/app/shared/services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./shell-view.component.less" ],
	templateUrl: "./shell-view.component.htm"
})
export class ShellViewComponent {

	// I initialize the shell view component.
	constructor(
		appReadyEvent: AppReadyEvent,
		session: Session
		) {

		for ( var user of sampleData.users ) {

			if ( user.email === "ben@bennadel.com" ) {

				console.warn( "Logged-in as", user.email );
				session.setUser( user );

			}

		}

		appReadyEvent.trigger();

	}

}

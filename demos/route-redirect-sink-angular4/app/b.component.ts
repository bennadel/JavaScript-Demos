
// Import the core angular services.
import { Component } from "@angular/core";
import { Event as NavigationEvent } from "@angular/router";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	styleUrls: [ "./b.component.css" ],
	template: 
	`
		<h3>
			B-Prefix Component
		</h3>

		<p>
			You have navigated to <code>{{ url }}</code>
		</p>
	`
})
export class BComponent {

	public url: string;
	
	// I initialize the B-view component.
	constructor( router: Router ) {

		// As the user navigates through the "/a"-prefix routes, they will all be 
		// redirected to the "/b"-prefix routes that are rendered by this component. As
		// that happens, this component will persist since we never navigate away from
		// it. As such, we have to listen for navigation events to know when to update
		// the view.
		// --
		// NOTE: We could have also listened to the ActivatedRoute.
		router.events.subscribe(
			( event: NavigationEvent ) : void => {

				this.url = router.url;

			}
		);

	}

}

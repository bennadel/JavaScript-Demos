
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UrlSegment } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	styleUrls: [ "./b.component.css" ],
	template: 
	`
		<h3>
			B/Z-Prefix Component
		</h3>

		<p>
			You have navigated to <code>{{ url }}</code>
		</p>
	`
})
export class BComponent {

	public url: string;
	
	// I initialize the B-view component.
	constructor( activatedRoute: ActivatedRoute, router: Router ) {

		// As the user navigates through the "/a"-prefix routes, they will all be 
		// redirected to the "/b/z"-prefix routes that are rendered by this component. 
		// As that happens, this component will persist since we never navigate away 
		// from it. As such, we have to listen for route changes to know when to update
		// the view.
		activatedRoute.url.subscribe(
			( urlSegments: UrlSegment[] ) : void => {

				this.url = router.url;

			}
		);

	}

}


// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-absolute-redirect",
	template:
	`
		<em>Redirecting to <code>{{ redirectTo }}</code></em>
	`
})
export class AbsoluteRedirectComponent {

	public redirectTo: string;

	private router: Router;

	// I initialize the absolute-redirect component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.router = router;
		this.redirectTo = activatedRoute.snapshot.data.redirectTo;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called after the inputs have been found for the first time.
	public ngOnInit() : void {

		console.warn( "Absolute redirect to:", this.redirectTo );
		// NOTE: We could have performed the .navigateByUrl() in the constructor.
		// However, doing so would have emitted a "navigation canceled" event. By waiting
		// until the init method, we allow the previous navigation to complete before we
		// start the new navigation. This feel more in alignment with the way the built-
		// in "redirectTo" property works.
		this.router.navigateByUrl(
			this.redirectTo,
			// By replacing the current URL in the history, we keep the Browser's Back
			// Button behavior in tact. This will allow the user to easily navigate back
			// to the previous URL without getting caught in a redirect.
			{
				replaceUrl: true
			}
		);

	}

}

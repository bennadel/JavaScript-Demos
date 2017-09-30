
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// Import the application components and services.
import { Session } from "~/app/shared/services/session";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "password-view",
	styleUrls: [ "./password-view.component.less" ],
	templateUrl: "./password-view.component.htm"
})
export class PasswordViewComponent {

	private activatedRoute: ActivatedRoute;
	private router: Router;

	// I initialize the password-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router,
		session: Session
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

		// Only the logged-in viewer can see this section.
		if ( ! session.isForUser( +this.activatedRoute.snapshot.parent.paramMap.get( "id" ) ) ) {

			this.router.navigate([ "/app/people", session.user.id, "password" ]);

		}

	}

}

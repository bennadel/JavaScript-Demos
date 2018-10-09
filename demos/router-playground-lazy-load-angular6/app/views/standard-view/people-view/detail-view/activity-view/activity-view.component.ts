
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "activity-view",
	styleUrls: [ "./activity-view.component.less" ],
	templateUrl: "./activity-view.component.htm"
})
export class ActivityViewComponent {

	private activatedRoute: ActivatedRoute;
	private router: Router;

	// I initialize the activity-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

	}

}

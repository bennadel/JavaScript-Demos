
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "projects-view",
	styleUrls: [ "./projects-view.component.less" ],
	templateUrl: "./projects-view.component.htm"
})
export class ProjectsViewComponent {

	private activatedRoute: ActivatedRoute;
	private router: Router;

	// I initialize the projects-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

	}

}

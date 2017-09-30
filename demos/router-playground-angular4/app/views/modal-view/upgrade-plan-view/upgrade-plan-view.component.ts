
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "upgrade-plan-view",
	styleUrls: [ "./upgrade-plan-view.component.less" ],
	templateUrl: "./upgrade-plan-view.component.htm"
})
export class UpgradePlanViewComponent {

	private activatedRoute: ActivatedRoute;
	private router: Router;
	
	// I initialize the upgrade-plan-view component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {
		
		this.activatedRoute = activatedRoute;
		this.router = router;

	}

}

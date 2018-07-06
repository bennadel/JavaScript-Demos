
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "primary-detail-view",
	styleUrls: [ "./primary-detail-view.component.less" ],
	template:
	`
		<h2>
			Primary Detail
		</h2>

		<p>
			<a routerLink="../../">Back</a>
		</p>

		<p>
			This is the Primary Detail view for <strong>ID: {{ primaryID }}</strong>.
		</p>
	`
})
export class PrimaryDetailViewComponent {
	
	public primaryID: number;

	// I initialize the primary detail-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.primaryID = +activatedRoute.snapshot.params.primaryID;

	}

}

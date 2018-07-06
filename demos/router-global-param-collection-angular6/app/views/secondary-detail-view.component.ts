
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "secondary-detail-view",
	styleUrls: [ "./secondary-detail-view.component.less" ],
	template:
	`
		<h2>
			Secondary Detail
		</h2>

		<p>
			<a routerLink="../../">Back</a>
		</p>

		<p>
			This is the Secondary Detail view for <strong>ID: {{ secondaryID }}</strong>.
		</p>
	`
})
export class SecondaryDetailViewComponent {
	
	public secondaryID: number;

	// I initialize the secondary detail-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.secondaryID = +activatedRoute.snapshot.params.secondaryID;

	}

}

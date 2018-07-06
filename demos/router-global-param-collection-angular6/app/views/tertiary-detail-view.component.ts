
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tertiary-detail-view",
	styleUrls: [ "./tertiary-detail-view.component.less" ],
	template:
	`
		<h2>
			Tertiary Detail
		</h2>

		<p>
			<a routerLink="../../">Back</a>
		</p>

		<p>
			This is the Tertiary Detail view for <strong>ID: {{ tertiaryID }}</strong>.
		</p>
	`
})
export class TertiaryDetailViewComponent {
	
	public tertiaryID: number;

	// I initialize the tertiary detail-view component.
	constructor( activatedRoute: ActivatedRoute ) {

		this.tertiaryID = +activatedRoute.snapshot.params.tertiaryID;

	}

}

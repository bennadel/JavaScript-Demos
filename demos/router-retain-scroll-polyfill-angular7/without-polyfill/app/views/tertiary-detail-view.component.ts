
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractDetailViewComponent } from "./abstract-detail-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tertiary-detail-view",
	styleUrls: [ "./tertiary-detail-view.component.less" ],
	template:
	`
		<ng-template [ngIf]="isLoading">
			<p>
				<strong>Loading....</strong>
			</p>
		</ng-template>

		<ng-template [ngIf]="! isLoading">
			<h2>
				Tertiary Detail
			</h2>

			<p>
				<a routerLink="../">Back</a>
			</p>

			<p>
				This is the {{ name }} view.
			</p>
		</ng-template>
	`
})
export class TertiaryDetailViewComponent extends AbstractDetailViewComponent {
	
	constructor() {

		super( "Tertiary Detail" );

	}

}

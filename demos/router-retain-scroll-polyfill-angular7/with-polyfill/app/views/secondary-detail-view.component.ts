
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractDetailViewComponent } from "./abstract-detail-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "secondary-detail-view",
	styleUrls: [ "./secondary-detail-view.component.less" ],
	template:
	`
		<ng-template [ngIf]="isLoading">
			<p class="loading">
				<strong class="loading__message">Loading....</strong>
			</p>
		</ng-template>

		<ng-template [ngIf]="! isLoading">
			<h2>
				Secondary Detail
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
export class SecondaryDetailViewComponent extends AbstractDetailViewComponent {
	
	constructor() {

		super( "Secondary Detail" );

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractListViewComponent } from "./abstract-list-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "section-b-view",
	styleUrls: [ "./section-b-view.component.less" ],
	template:
	`
		<h2>
			Section B
		</h2>

		<ng-template [ngIf]="isLoading">
			<p>
				<strong>Loading....</strong>
			</p>
		</ng-template>

		<ng-template [ngIf]="! isLoading">
			<p *ngFor="let item of items">
				{{ item }}
			</p>
		</ng-template>
	`
})
export class SectionBViewComponent extends AbstractListViewComponent {
	
	constructor() {

		super( "Section B" );

	}

}

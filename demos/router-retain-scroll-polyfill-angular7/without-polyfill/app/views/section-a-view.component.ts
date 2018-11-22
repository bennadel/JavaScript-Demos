
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractListViewComponent } from "./abstract-list-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "section-a-view",
	styleUrls: [ "./section-a-view.component.less" ],
	template:
	`
		<h2>
			Section A
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
export class SectionAViewComponent extends AbstractListViewComponent {
	
	constructor() {

		super( "Section A" );

	}

}

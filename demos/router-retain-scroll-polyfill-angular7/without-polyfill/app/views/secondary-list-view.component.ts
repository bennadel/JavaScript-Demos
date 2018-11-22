
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractListViewComponent } from "./abstract-list-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "secondary-list-view",
	styleUrls: [ "./secondary-list-view.component.less" ],
	template:
	`
		<h2>
			Secondary List
		</h2>

		<ng-template [ngIf]="isLoading">
			<p>
				<strong>Loading....</strong>
			</p>
		</ng-template>

		<ng-template [ngIf]="! isLoading">
			<p>
				<a [routerLink]="[ '/app', { outlets: { secondary: null } } ]">Close</a>
			</p>

			<p *ngFor="let item of items">
				<a routerLink="./detail">{{ item }}</a>
			</p>
		</ng-template>
	`
})
export class SecondaryListViewComponent extends AbstractListViewComponent {
	
	constructor() {

		super( "Secondary List" );

	}

}


// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractListViewComponent } from "./abstract-list-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tertiary-list-view",
	styleUrls: [ "./tertiary-list-view.component.less" ],
	template:
	`
		<h2>
			Tertiary List
		</h2>

		<ng-template [ngIf]="isLoading">
			<p>
				<strong>Loading....</strong>
			</p>
		</ng-template>

		<ng-template [ngIf]="! isLoading">
			<p>
				<a [routerLink]="[ '/app', { outlets: { tertiary: null } } ]">Close</a>
			</p>

			<p *ngFor="let item of items">
				<a routerLink="./detail">{{ item }}</a>
			</p>
		</ng-template>
	`
})
export class TertiaryListViewComponent extends AbstractListViewComponent {
	
	constructor() {

		super( "Tertiary List" );

	}

}

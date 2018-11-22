
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { AbstractListViewComponent } from "./abstract-list-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "section-c-view",
	styleUrls: [ "./section-c-view.component.less" ],
	template:
	`
		<h2>
			Section C
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

			<div class="tabs">
				<a routerLink="./tab-1" class="tabs__tab" routerLinkActive="tabs__tab--on">
					Tab 1
				</a>
				<a routerLink="./tab-2" class="tabs__tab" routerLinkActive="tabs__tab--on">
					Tab 2
				</a>
			</div>
			<div class="tab-content">
				<router-outlet></router-outlet>
			</div>
		</ng-template>
	`
})
export class SectionCViewComponent extends AbstractListViewComponent {
	
	constructor() {

		super( "Section C" );

	}

}

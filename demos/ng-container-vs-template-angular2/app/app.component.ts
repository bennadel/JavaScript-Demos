
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<template>
			<p>
				In template, no attributes.
			</p>
		</template>

		<ng-container>
			<p>
				In ng-container, no attributes.
			</p>
		</ng-container>


		<hr data-x="- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -" />


		<template [ngIf]="true">
			<p>
				ngIf with a template.
			</p>
		</template>

		<ng-container *ngIf="true">
			<p>
				ngIf with an ng-container.
			</p>
		</ng-container>

		
		<hr data-x="- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -" />


		<p>
			Repeater:

			<template ngFor let-x [ngForOf]="[ 'A', 'B', 'C' ]" let-ix="index">
				{{ x }}( <span>{{ ix }}</span> )
			</template>
		</p>

		<p>
			Repeater:

			<ng-container *ngFor="let x of [ 'A', 'B', 'C' ]; let ix = index ;">
				{{ x }}( <span>{{ ix }}</span> )
			</ng-container>
		</p>

		<p>
			Repeater (showcasing why comments):

			<template ngFor let-x [ngForOf]="[ 'A', 'B', 'C' ]" let-ix="index">
				<ng-container>
					{{ x }}( <span>{{ ix }}</span> )
				</ng-container>
			</template>
		</p>


		<hr data-x="- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -" />


		<p [ngSwitch]="true">
			<template [ngSwitchCase]="true">
				Switched in <span>template</span>.
			</template>
			
			<template ngSwitchDefault>
				Switched in <span>template (default)</span>.
			</template>
		</p>

		<p [ngSwitch]="true">
			<ng-container *ngSwitchCase="true">
				Switched in <span>ng-container</span>.
			</ng-container>
			
			<ng-container *ngSwitchDefault>
				Switched in <span>ng-container (default)</span>.
			</ng-container>
		</p>
	`
})
export class AppComponent {
	// ...
}

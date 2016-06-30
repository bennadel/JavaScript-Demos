
// Import the core angular services.
import { Component } from "@angular/core";
import { ContentChild } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { TemplateRef } from "@angular/core";

@Component({
	selector: "html-dropdown",
	inputs: [ "items", "value", "placeholder" ],
	outputs: [ "valueChange" ],

	// Query for the template being provided by the calling context.
	queries: {
		itemTemplate: new ContentChild( TemplateRef )
	},
	host: {
		"[class.is-open]": "isShowingItems"
	},
	template:
	`
		<div (click)="toggleItems()" class="dropdown-root" [ngSwitch]="!! value">
			<div *ngSwitchCase="true" class="dropdown-item-content">
				
				<template
					[ngTemplateOutlet]="itemTemplate"
					[ngOutletContext]="{ item: value, index: -1 }">
				</template>

			</div>
			<div *ngSwitchCase="false" class="placeholder">
				
				{{ placeholder || "Nothing Selected" }}

			</div>
		</div>

		<ul *ngIf="isShowingItems" class="dropdown-items">
			<li 
				*ngFor="let item of items ; let index = index ;" 
				(click)="selectItem( item )"
				class="dropdown-item">

				<div class="dropdown-item-content">
				
					<template 
						[ngTemplateOutlet]="itemTemplate"
						[ngOutletContext]="{ item: item, index: index }">
					</template>

				</div>

			</li>
		</ul>
	`
})
export class HtmlDropdownComponent {

	// I determine if the dropdown items are being shown.
	public isShowingItems: boolean;

	// INPUT: I am the collection of items used to render the dropdown items.
	public items: any[];

	// INPUT: I am the text to show when no item is selected.
	public placeholder: string;

	// INPUT: I am the currently selected value.
	public value: any;

	// OUTPUT: I am the output event stream that emits the item selected by the user.
	public valueChange: EventEmitter<any>;


	// I initialize the component.
	constructor() {

		this.isShowingItems = false;
		this.valueChange = new EventEmitter();

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I hide the dropdown items.
	public hideItems() : void {

		this.isShowingItems = false;

	}


	// I select the given item.
	// --
	// NOTE: Since this is a one-way data flow, the selection is being emitted rather
	// than applied directly to the value.
	public selectItem( item: any ) : void {

		this.hideItems();
		this.valueChange.emit( item );

	}


	// I show the dropdown items.
	public showItems() : void {

		this.isShowingItems = true;

	}


	// I show or hide the dropdown items depending on their current visibility.
	public toggleItems() : void {

		this.isShowingItems
			? this.hideItems()
			: this.showItems()
		;

	}

}

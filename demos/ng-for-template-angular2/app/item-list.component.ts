
// Import the core angular services.
import { Component } from "@angular/core";
import { TemplateRef } from "@angular/core";

@Component({
	selector: "item-list",
	inputs: [ "items", "template" ],

	// In this View, notice that we are passing in a [ngForTemplate] to our ngFor 
	// directive. In doing so, the ngFor directive will use this template for rendering
	// instead of its own TemplateRef.
	// --
	// NOTE: The ngFor directive will still use the same context object when rendering
	// the externally-provided TemplateRef. As such, the external template can still use
	// local view variables like "let-index" and "let-even".
	template:
	`
		<ul>
			<template ngFor [ngForOf]="items" [ngForTemplate]="template"></template>
		</ul>
	`
})
export class ItemListComponent {

	// I hold the collection of items to render.
	// --
	// NOTE: Injected input value.
	public items: any[];

	// I hold the externally provided TemplateRef to render in the ngFor repeater.
	// --
	// NOTE: Injected input value.
	public template: TemplateRef<any>;


	// I initialize the component.
	constructor() {

		// ... nothing to do here.

	}

}

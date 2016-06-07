
// Import the core angular services.
import { Component } from "@angular/core";
import { ContentChild } from "@angular/core";
import { TemplateRef } from "@angular/core";

// Import the application components and services.
import { createTemplateRenderer } from "./template-renderer.directive";

@Component({
	selector: "dynamic-repeater",
	inputs: [ "items" ],

	// Here, we are querying for the <template> tags in the content.
	queries: {
		itemTemplateRef: new ContentChild( "itemRenderer" )
	},

	// We're going to provide a dynamically-generated directive that exposes custom 
	// inputs that we want to pass to our item renderer. In this case, we want to 
	// expose "context.item" and "context.index". This will return a directive with
	// the selector, "template[render]", which are using in our view.
	directives: [ 
		createTemplateRenderer( "item", "index" ) 
	],
	template:
	`
		<header>
			<h2>
				Dynamic Repeater View
			</h2>
		</header>

		<dynamic-repeater-body>
			<dynamic-repeater-item *ngFor="let item of items; let index = index ;">

				<template 
					[render]="itemTemplateRef"
					[context.item]="item"
					[context.index]="index">
				</template>

			</dynamic-repeater-item>
		</dynamic-repeater-body>

		<footer>
			<p>
				You have {{ items?.length }} item(s) being rendered.
			</p>
		</footer>
	`
})
export class DynamicRepeaterComponent {

	// I hold the items to render in our repeater.
	// --
	// NOTE: Injected property.
	public items: any[];

	// I hold the template used to render the item.
	// --
	// NOTE: Injected query.
	public itemTemplateRef: TemplateRef<any>;


	// I initialize the component.
	constructor() {

		this.items = [];
		this.itemTemplateRef = null;

	}

}
